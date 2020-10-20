<template>
  <div>
    <v-data-table
      :headers="tableHeader"
      :items="tableDataset"
      show-expand
      item-key="id"
      :expanded.sync="tableExpanded"
      :single-expand="true"
      :options.sync="tableOptions"
      :server-items-length="tableTotal"
      :loading="tableLoading">
      
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>文章归档</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="showDialog()">添加</v-btn>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-btn color="primary" @click="loadDatasource" fab small><v-icon>mdi-cached</v-icon></v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.time`]="{ item }">
        <v-tooltip right color="#000">
          <template v-slot:activator="{ on, attrs }">
            <span class="col-time" v-bind="attrs" v-on="on">{{ parseTime(item.create_time) }}</span>
          </template>
          <span>创建时间</span>
        </v-tooltip>
         <br>
         <v-tooltip right color="#000">
          <template v-slot:activator="{ on, attrs }">
            <span class="col-time" v-bind="attrs" v-on="on">{{ parseTime(item.modify_time) }}</span>
          </template>
          <span>最后编辑时间</span>
        </v-tooltip>
      </template>
      <template v-slot:[`item.visible`]="{ item }">
          <v-switch :input-value="item.visible" @change="val => setBlogVisible(val, item.id)"></v-switch>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <div class="description">{{item.description}}</div>
          <v-divider></v-divider>
          <div class="sides"><v-chip v-for="(side, index) in item.sides" :key="index" :small="true">{{side}}</v-chip></div>
        </td>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2"  @click="showDialog(item)">
          mdi-pencil
        </v-icon>
      </template>
      <template v-slot:[`item.statis`]="{ item }">
        👁: {{item.view_count}} <br>
        ★: {{item.good_count}}
      </template>
    </v-data-table>
    
    <v-dialog v-model="dialogVisible" persistent max-width="90vw" scrollable>
      <v-card>
        <v-card-title class="headline">文档编辑</v-card-title>
        <v-card-text>

          <v-container v-if="dialogType === DialogType.Update" key="update">
            <v-row>
              <v-col cols="12">
                <v-text-field label="标题" v-model="itemOfUpdate.title" outlined></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="概述" v-model="itemOfUpdate.description" auto-grow outlined rows="1" row-height="15"></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-combobox v-model="itemOfUpdate.sides" label="关键词" multiple chips outlined></v-combobox>
              </v-col>
              <v-col cols="12">
                <markdown-helper :md-content.sync="itemOfUpdate.content"></markdown-helper>
              </v-col>
            </v-row>
          </v-container>
          <!-- <v-container v-else key="create">
            <v-row no-gutters>
              <v-col>
                <v-card ref="editBox" class="pa-5" outlined tile>
                  <v-row>
                    <v-col cols="12" sm="9">
                      <v-text-field v-model="creationState.title" label="标题" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-btn :disabled="!submitCreationAbled" height="56" x-large block @click="submitCreation">上传</v-btn>
                    </v-col>
                  </v-row>
                  <v-textarea label="概述" v-model="creationState.desc" auto-grow outlined rows="3" row-height="15"></v-textarea>
                  <v-combobox v-model="creationState.sides" label="关键词" multiple chips outlined></v-combobox>
                  <markdown-helper :mdContent.sync="creationState.content" mode="edit"></markdown-helper>
                </v-card>
              </v-col>
              <v-col>
                <v-card class="pa-5" outlined tile style="height: 100%">
                  <markdown-helper :mdContent="creationState.content" mode="preview" height="100%"></markdown-helper>
                </v-card>
              </v-col>
            </v-row>
          </v-container> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDialog">放弃编辑</v-btn>
          <!-- <v-btn color="green darken-1" v-show="dialogType === 'update'" text @click="updateItem">保存编辑</v-btn> -->
        </v-card-actions>

      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, toRef, toRefs, watch } from '@vue/composition-api'
import { Store } from 'vuex'
import MarkdownHelper from '@/components/base/markdown/markdown-helper.vue'
enum DialogType { Update, Create } // 博客更新、博客添加
interface IDialogState {
  dialogVisible: boolean // 弹窗可见状态
  dialogType: DialogType // 弹窗显示内容
  closeDialog () : void // 关闭弹窗
  showDialog (item?: any) : void // 显示弹窗
}
interface ITableState {
  tableHeader: Array<any> // 表头配置
  tableLoading: Boolean // 表加载状态
  tableExpanded: Array<any> // 表行下拉项
  tableOptions: any // 表配置（分页...）
  tableDataset: Array<any> // 表数据
  tableTotal: number // 表数据条数
  loadDatasource () : void // 表数据加载
  setBlogVisible (val: any, id: any) : void // 设置可见性
  parseTime (time: any) : void // 时间格式化
}
interface IUpdatetionState {
  itemOfUpdate: { id: any, content: any, description: any, sides: string[], title: any }
  updateItem () : void
}
export default defineComponent({
  name: 'BlogManager',
  components: {
    'markdown-helper': MarkdownHelper
  },
  setup () {
    const $store = (getCurrentInstance() as any).$store as Store<any>
    const { axiosGet, axiosPost } = WXZ.Ajax

    //#region 弹窗
    const dialogState: IDialogState = reactive({
      dialogVisible: false,
      dialogType: DialogType.Update,
      closeDialog () { dialogState.dialogVisible = false },
      showDialog (item) {
        if (item) {
          dialogState.dialogType = DialogType.Update
          // for (const key in updatetionState) {
          //   updatetionState.itemOfUpdate[key] = item[key]
          // }
        } else {
          dialogState.dialogType = DialogType.Create
        }
        dialogState.dialogVisible = true
      },
    })
    //#endregion

    //#region 表格
    const tableState: ITableState =reactive({
      tableHeader: [
        { text: '', value: 'data-table-expand' },
        { text: '标识', sortable: false, value: 'id', width: 56 },
        { text: '标题', sortable: false, value: 'title', width: 300 },
        { text: '时间', sortable: false, value: 'time' },
        { text: '统计', sortable: false, value: 'statis' },
        { text: '是否公开', sortable: false, value: 'visible' },
        { text: '编辑', sortable: false, value: 'actions' },
      ],
      tableLoading: false,
      tableExpanded: [],
      tableOptions: {},
      tableDataset: [],
      tableTotal: 0,
      loadDatasource () {
        tableState.tableLoading = true
        const { page, itemsPerPage } = tableState.tableOptions as any
        const [limit, offset] = [itemsPerPage, (page - 1) * itemsPerPage]
        axiosGet('/blog/list', { limit, offset }).then(data => {
          tableState.tableTotal = data.total
          tableState.tableDataset.reset(...data.items)
        }).catch(err => console.warn(err)).finally(() => tableState.tableLoading = false)
      },
      setBlogVisible (val, id) {
        tableState.tableLoading = true
        const visible = Boolean(val)
        axiosPost('/blog/set-visible', { id, visible }).then(tableState.loadDatasource)
      },
      parseTime (time) {
        return new Date(time).format('YYYY-MM-DD')
      },
    })
    watch(toRef(tableState, 'tableOptions'), tableState.loadDatasource, { deep: true })
    
    //#endregion

    //#region 更新
    const updatetionState: IUpdatetionState= reactive({
      itemOfUpdate: {
        id: '', title: '', description: '', sides: [], content: '[TOC]\n## test'
      },
      updateItem() {
        $store.commit('setLoading', true)
        axiosPost('/blog/update', { ...updatetionState.itemOfUpdate }).finally(() => {
          $store.dispatch('setLoading', false)
          dialogState.closeDialog()
          tableState.loadDatasource()
        })
      }
    })
    //#endregion

    return {
      DialogType,
      ...toRefs(tableState as any),
      ...toRefs(dialogState as any),
      ...toRefs(updatetionState as any),
    }
  }
})
</script>

<style lang="scss" scoped>
.description, .sides {
  padding: 5px;
  font-size: 0.9em;
}
.sides > * {
  margin: 0 5px;
}
.col-time {
  cursor: text;
}
</style>
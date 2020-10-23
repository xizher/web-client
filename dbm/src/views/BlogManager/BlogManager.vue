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
      :loading="tableLoading"
    >
      
      <!-- 表头内容 -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>文章归档</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="showDialog()">添加</v-btn>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-btn color="primary" @click="loadDatasource" fab small><v-icon>mdi-cached</v-icon></v-btn>
        </v-toolbar>
      </template>

      <!-- 表列：时间 -->
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

      <!-- 表列是否公开 -->
      <template v-slot:[`item.visible`]="{ item }">
          <v-switch :input-value="item.visible" @change="val => setBlogVisible(val, item.id)"></v-switch>
      </template>

      <!-- 表元组展开项 -->
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <div class="expanded-container">
            <div class="description"><b>内容概述</b>：{{item.description}}</div>
            <v-divider></v-divider>
            <div class="sides"><b>关键词</b>：<v-chip v-for="(side, index) in item.sides" :key="index" :small="true">{{side}}</v-chip></div>
          </div>
        </td>
      </template>

      <!-- 表列：编辑 -->
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2"  @click="showDialog(item)">
          mdi-pencil
        </v-icon>
      </template>

      <!-- 表列：统计 -->
      <template v-slot:[`item.statis`]="{ item }">
        👁: {{item.view_count}} <br>
        ★: {{item.good_count}}
      </template>

    </v-data-table>
    
    <v-dialog
      v-model="dialogVisible"
      persistent
      max-width="90vw"
      scrollable
    >
      <v-card>
        <v-card-title class="headline">文档编辑</v-card-title>

        <v-card-text>

          <!-- 文档更新· -->
          <v-container v-if="dialogType === DialogType.Update" key="update">
            <v-row>
              <v-col cols="12">
                <v-text-field label="标题" v-model="itemOfUpdate.title" outlined hide-details></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="概述" v-model="itemOfUpdate.description" auto-grow outlined rows="1" row-height="15" hide-details></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-combobox v-model="itemOfUpdate.sides" label="关键词" multiple chips outlined hide-details></v-combobox>
              </v-col>
              <v-col cols="12">
                <markdown-helper :md-content.sync="itemOfUpdate.content"></markdown-helper>
              </v-col>
            </v-row>
          </v-container>

          <!-- 文档新建 -->
          <v-container v-else key="create">
            <v-row no-gutters>
              <v-col>
                <v-card ref="editBox" class="pa-5" outlined tile>
                  <v-row>
                    <v-col cols="12" sm="9">
                      <v-text-field v-model="itemOfCreate.title" label="标题" outlined hide-details></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-btn color="primary" :disabled="!createEnabled" height="56" x-large block @click="createItem">上传</v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-textarea label="概述" v-model="itemOfCreate.desc" auto-grow outlined rows="3" row-height="15" hide-details></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-combobox v-model="itemOfCreate.sides" label="关键词" multiple chips outlined hide-details></v-combobox>
                    </v-col>
                  </v-row>
                  <markdown-helper :mdContent.sync="itemOfCreate.content" mode="edit"></markdown-helper>
                </v-card>
              </v-col>
              <v-col>
                <v-card class="pa-5" outlined tile style="height: 100%">
                  <markdown-helper :mdContent="itemOfCreate.content" mode="preview" height="100%"></markdown-helper>
                </v-card>
              </v-col>
            </v-row>
          </v-container>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDialog">放弃编辑</v-btn>
          <v-btn color="green darken-1" v-show="dialogType === DialogType.Update" text @click="updateItem">保存编辑</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, getCurrentInstance, reactive, ref, toRef, toRefs, watch } from '@vue/composition-api'
import { Store } from 'vuex'
import MarkdownHelper from '@/components/base/markdown/markdown-helper.vue'
import { ITableState, DialogType, IUpdatetionState, ICreationState, IDialogState } from '@/interfaces'
export default defineComponent({
  name: 'BlogManager',
  components: {
    'markdown-helper': MarkdownHelper
  },
  setup () {
    const $store = (getCurrentInstance() as any).$store as Store<any>
    const { axiosGet, axiosPost } = WXZ.Ajax


    //#region 表格
    const tableState: ITableState = reactive({
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
      setBlogVisible (val: any, id: any) {
        tableState.tableLoading = true
        const visible = Boolean(val)
        axiosPost('/blog/set-visible', { id, visible }).then(tableState.loadDatasource)
      },
      parseTime (time: any) {
        return new Date(time).format('yyyy-MM-dd')
      },
    })
    watch(toRef(tableState, 'tableOptions'), tableState.loadDatasource, { deep: true })
    
    //#endregion

    //#region 更新
    const updatetionState: IUpdatetionState= reactive({
      itemOfUpdate: {
        id: '', title: '', description: '', sides: [], content: ''
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

    //#region 添加
    const creationState: ICreationState = reactive({
      itemOfCreate: {
        title: '', desc: '', sides: [], content: '[[TOC]]\n'
      },
      createItem () {
        $store.commit('setLoading', true)
        axiosPost('/blog/add', { ...creationState.itemOfCreate }).finally(() => {
          $store.dispatch('setLoading', false)
          dialogState.closeDialog()
          creationState.resetItem()
          tableState.loadDatasource()
        })
      },
      createEnabled: computed(() => {
        for (const key in creationState.itemOfCreate) {
          if (!creationState.itemOfCreate[key] || creationState.itemOfCreate.sides.length == 0) {
            return false
          }
          return true
        }
      }),
      resetItem () {
        creationState.itemOfCreate.title = ''
        creationState.itemOfCreate.desc = ''
        creationState.itemOfCreate.sides.clear()
        creationState.itemOfCreate.content = '[[TOC]]\n'
      }
    })
    //#endregion

    //#region 弹窗
    const dialogState: IDialogState = reactive({
      dialogVisible: false,
      dialogType: DialogType.Update,
      closeDialog () { dialogState.dialogVisible = false },
      showDialog (item) {
        if (item) {
          dialogState.dialogType = DialogType.Update
          for (const key in updatetionState.itemOfUpdate) {
            updatetionState.itemOfUpdate[key] = item[key]
          }
        } else {
          dialogState.dialogType = DialogType.Create
        }
        dialogState.dialogVisible = true
      },
    })
    //#endregion
    
    return {
      DialogType,
      ...toRefs(tableState as any),
      ...toRefs(dialogState as any),
      ...toRefs(updatetionState as any),
      ...toRefs(creationState as any),
    }
  }
})
</script>

<style lang="scss" scoped>
.expanded-container {
  margin: 10px 15px;
}
.description, .sides {
  padding: 5px;
  font-size: 1.2em;
}
.sides > * {
  margin: 0 5px;
}
.col-time {
  cursor: text;
}
</style>
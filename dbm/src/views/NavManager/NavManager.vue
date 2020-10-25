<template>
  <div>

    <v-data-table
      :headers="tableHeader"
      :items="tableDataset"
      item-key="id"
      :options.sync="tableOptions"
      :server-items-length="tableTotal"
      :loading="tableLoading"
    >
      
      <!-- 表头内容 -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>链接归档</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="showDialog()">添加</v-btn>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-btn color="primary" @click="loadDatasource" fab small><v-icon>mdi-cached</v-icon></v-btn>
        </v-toolbar>
      </template>

      <!-- 表列：名称 -->
      <template v-slot:[`item.name`]="{ item }">
        <v-edit-dialog :return-value.sync="item.name" large persistent @save="updateNav(item)">
          {{ item.name }}
          <template v-slot:input>
            <v-text-field
              v-model="item.name"
              single-line
              hide-details
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <!-- 表列：地址 -->
      <template v-slot:[`item.url`]="{ item }">
        <a @click="showDialog(item.url)">{{ formatUrl(item.url) }}</a>
      </template>

      <!-- 表列：类别 -->
      <template v-slot:[`item.type`]="{ item }">
        <v-edit-dialog :return-value.sync="item.type" large persistent @save="updateNav(item)">
        {{ item.type }}
          <template v-slot:input>
            <v-combobox
              v-model="item.type"
              :items="getTypeUnion"
              hide-details
            ></v-combobox>
          </template>
        </v-edit-dialog>
      </template>

    </v-data-table>

    <v-dialog
      v-model="dialogVisible"
      :width="dialogType === DialogType.Create ? '800' : '90vw'"
      max-width="90vw"
      scrollable
    >
      <v-card>
        <v-card-title class="headline"></v-card-title>
        <v-card-text>
          <v-container v-if="dialogType === DialogType.Create" key="create">
            <v-row>
              <v-col cols="12" sm="9">
                <v-text-field v-model="itemOfCreate.name" label="名称" outlined hide-details></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-btn color="primary" :disabled="!createEnabled" height="56" x-large block @click="createItem">上传</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-combobox v-model="itemOfCreate.type" label="类别" :items="getTypeUnion" outlined hide-details></v-combobox>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="itemOfCreate.url" label="地址" outlined hide-details></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-container v-else>
            <iframe :src="webFrameUrl" width="100%" style="height: 75vh" frameborder="0"></iframe>
            <v-btn color="primary" @click="openUrl">在新标签页中打开</v-btn>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>

<script lang="ts">
import { DialogType, ICreationState, IDialogState, ITableState } from '@/interfaces'
import { defineComponent, getCurrentInstance, reactive, toRefs, watch, toRef, computed } from '@vue/composition-api'
import { Store } from 'vuex'

export default defineComponent({
  name: 'NavManager',
  setup () {
    const $store = (getCurrentInstance() as any).$store as Store<any>
    const { axiosGet, axiosPost } = WXZ.Ajax

    //#region 表格
    const tableState: ITableState = reactive({
      tableHeader: [
        { text: '标识', sortable: false, value: 'id' },
        { text: '名称', sortable: false, value: 'name' },
        { text: '类别', sortable: false, value: 'type' },
        { text: '地址', sortable: false, value: 'url' },
      ],
      tableLoading: false,
      tableOptions: {},
      tableDataset: [],
      tableTotal: 0,
      loadDatasource () {
        tableState.tableLoading = true
        const { page, itemsPerPage } = tableState.tableOptions
        const [limit, offset] = [itemsPerPage, (page - 1) * itemsPerPage]
        axiosGet('/nav/list', { limit, offset }).then(data => {
          tableState.tableDataset.reset(...data.items)
          tableState.tableTotal = data.total
        }).catch(err => console.warn(err)).finally(() => tableState.tableLoading = false)
      },
      updateNav (item: any) {
        $store.commit('setLoading', true)
        axiosPost('/nav/update', { ...item }).finally(() => {
          $store.dispatch('setLoading', false)
          tableState.loadDatasource()
        })
      },
      getTypeUnion: computed(() => {
        return tableState.tableDataset.propToArr('type').union()
      })
    })
    watch(toRef(tableState, 'tableOptions'), tableState.loadDatasource, { deep: true })
    //#endregion

    //#region 添加
    const creationState: ICreationState = reactive({
      itemOfCreate: { name: '', type: '', url: '' },
      createEnabled: computed(() => {
        for (const key in creationState.itemOfCreate) {
          if (!creationState.itemOfCreate[key]) {
            return false
          }
        }
        return true
      }),
      createItem () {
        $store.commit('setLoading', true)
        axiosPost('/nav/add', { ...creationState.itemOfCreate }).finally(() => {
          $store.dispatch('setLoading', false)
          dialogState.dialogVisible = false
          creationState.resetItem()
          tableState.loadDatasource()
        })
      },
      resetItem () {
        for (const key in creationState.itemOfCreate) {
          creationState.itemOfCreate[key] = ''
        }
      },
      formatUrl (url: string) {
        return `${url.substring(0, 20)}......`
      }
    })
    //#endregion

    //#region 显示外部页面
    const webFrameState = reactive({
      webFrameUrl: '',
      openUrl () { window.open(webFrameState.webFrameUrl) }
    })
    //#endregion

    //#region 弹窗
    const dialogState : IDialogState = reactive({
      dialogVisible: false,
      dialogType: DialogType.Create,
      closeDialog () { dialogState.dialogVisible = false },
      showDialog (url) {
        if (url) {
          dialogState.dialogType = DialogType.WebFrame
          webFrameState.webFrameUrl = url
        } else {
          dialogState.dialogType = DialogType.Create
        }
        dialogState.dialogVisible = true
      }
    })
    //#endregion

    return {
      DialogType,
      ...toRefs(tableState as any),
      ...toRefs(dialogState as any),
      ...toRefs(creationState as any),
      ...toRefs(webFrameState as any),
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
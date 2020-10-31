<template>
  <div>

    <v-data-table
      :headers="tableHeader"
      :items="tableDataset"
      item-key="id"
      :single-expand="true"
      :options.sync="tableOptions"
      :server-items-length="tableTotal"
      :loading="loading"
    >
    
      <!-- 表头内容 -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>口令归档</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="showDialog()">添加</v-btn>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-btn color="primary" @click="loadDatasource" fab small><v-icon>mdi-cached</v-icon></v-btn>
        </v-toolbar>
      </template>
    
      <template v-slot:[`item.name`]="{ item }">
        <v-edit-dialog :return-value.sync="item.name" large persistent @save="updatePwd(item)">
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

      <template v-slot:[`item.pwd`]="{ item }">
        <span class="table-row-item-pwd">{{ parsePwd(item.pwd, item.id) }}</span>
      </template>

      <template v-slot:[`item.bz`]="{ item }">
        <v-edit-dialog :return-value.sync="item.bz" large persistent @save="updatePwd(item)">
          {{ item.bz }}
          <template v-slot:input>
            <v-text-field
              v-model="item.bz"
              single-line
              hide-details
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="primary" small
          @mousedown="setDecryptEnable(item.id)"
          @mouseleave="setDecryptDisable"
          @mouseup="setDecryptDisable"
        >解码</v-btn>
        &nbsp;
        <v-btn color="primary" small @dblclick="delItem(item.id)"
        >删除</v-btn>
      </template>

    </v-data-table>

    
    <v-dialog
      v-model="dialogVisible"
      max-width="90vw"
      scrollable
    >
      <v-card>
        <v-card-title class="headline">文档编辑</v-card-title>

        <v-card-text>
          <v-container >
            <v-row>
              <v-col cols="12" sm="9">
                <v-text-field v-model="itemOfCreate.name" label="用户名" outlined hide-details></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-btn color="primary" :disabled="!createEnabled" height="56" x-large block @click="createItem">上传</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea label="口令" v-model="itemOfCreate.pwd" auto-grow outlined rows="3" row-height="15" hide-details></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea label="备注" v-model="itemOfCreate.bz" auto-grow outlined rows="3" row-height="15" hide-details></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>

<script lang="ts">
import { ICreationState, IDialogState, ITableState } from '@/interfaces';
import { computed, defineComponent, getCurrentInstance, reactive, toRef, toRefs, watch, watchEffect } from '@vue/composition-api';
import { Store } from 'vuex';
import { useAxios } from '@/hooks/useAjax'

export default defineComponent({
  name: 'PwdManager',
  setup () {
    const $store = (getCurrentInstance() as any).$store as Store<any>
    const { axiosGet, axiosPost, axiosPut, axiosDelete } = WXZ.Ajax
    const { encrypto, decrypto } = WXZ.Crypto
    const { loading, doAxios } = useAxios()
    

    //#region 表格
    const tableState: ITableState = reactive({
      tableHeader: [
        { text: '标识', sortable: false, value: 'id', width: 56 },
        { text: '用户名', sortable: false, value: 'name' },
        { text: '口令', sortable: false, value: 'pwd', width: 300 },
        { text: '备注', sortable: false, value: 'bz' },
        { text: '', sortable: false, value: 'actions' },
      ],
      tableLoading: false,
      tableOptions: {},
      tableDataset: [],
      tableTotal: 0,
      loadDatasource () {
        const { page, itemsPerPage } = tableState.tableOptions as any
        const [limit, offset] = [itemsPerPage, (page - 1) * itemsPerPage]
        // axiosGet('/pwd', limit == -1 && offset == 0 ? {} : { limit, offset }).then(data => {
        //   tableState.tableTotal = data.total
        //   tableState.tableDataset.reset(...data.items)
        // }).catch(err => console.warn(err)).finally(() => tableState.tableLoading = false)
        doAxios('get', '/pwd', limit == -1 && offset == 0 ? {} : { limit, offset }).then((data: any) => {
          tableState.tableTotal = data.total
          tableState.tableDataset.reset(...data.items)
        }).catch(err => console.warn(err))
      },
      parsePwd (pwd: string, id: number) {
        return (tableState as any).isDecrypt && id == (tableState as any).decryptItemId
          ? decrypto(pwd)
          : '●●●●●●●●●●●●●●●●'
      },
      isDecrypt: false, // 
      decryptItemId: -1, // 
      setDecryptEnable (id: number) { // 
        (tableState as any).decryptItemId = id
        ;(tableState as any).isDecrypt = true
      },
      setDecryptDisable () { // 
        (tableState as any).decryptItemId = -1
        ;(tableState as any).isDecrypt = false
      },
      updatePwd (item: any) {
        $store.commit('setLoading', true)
        axiosPut('/pwd', { ...item }).finally(() => {
          $store.dispatch('setLoading', false)
          tableState.loadDatasource()
        })
      }
    })
    watch(toRef(tableState, 'tableOptions'), tableState.loadDatasource, { deep: true })
    //#endregion

    //#region 新建
    const creationState: ICreationState = reactive({
      itemOfCreate: {
        name: '', pwd: '', bz: ''
      },
      createItem () {
        $store.commit('setLoading', true)
        let { name, pwd, bz } = creationState.itemOfCreate
        pwd = encrypto(pwd)
        axiosPost('/pwd', { name, pwd, bz }).finally(() => {
          $store.dispatch('setLoading', false)
          dialogState.closeDialog()
          creationState.resetItem()
          tableState.loadDatasource()
        })
      },
      createEnabled: computed(() => {
          return creationState.itemOfCreate.name && creationState.itemOfCreate.pwd
            ? true
            : false
      }),
      resetItem () {
        creationState.itemOfCreate.name = ''
        creationState.itemOfCreate.pwd = ''
        creationState.itemOfCreate.bz = ''
      }
    })
    //#endregion

    //#region 弹窗
    const dialogState : IDialogState = reactive({
      dialogVisible: false,
      closeDialog () { dialogState.dialogVisible = false },
      showDialog () { dialogState.dialogVisible = true }
    })
    //#endregion

    //#region 删除
    const delState: any = reactive({
      
      delItem (id: number) {
        console.log(id)
      }
    })
    //#endregion

    return {
      ...toRefs(tableState as any),
      ...toRefs(dialogState as any),
      ...toRefs(creationState as any),
      ...toRefs(delState as any),
      loading,
    }
  }
})
</script>

<style scoped>

</style>
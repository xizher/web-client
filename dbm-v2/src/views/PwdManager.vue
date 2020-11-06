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
          <v-toolbar-title>口令归档</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-spacer></v-spacer>
          <v-btn @click="showDialog('create')">添加</v-btn>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-btn @click="loadDataset" fab small><v-icon>mdi-cached</v-icon></v-btn>
        </v-toolbar>
      </template>

      <!-- 列表：口令 -->
      <template v-slot:[`item.pwd`]="{ item }">
        <span>{{ parsePwd(item.pwd, item.id) }}</span>
      </template>

      <!-- 表列：操作 -->
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn small
          @mousedown="setDecryptEnable(item.id)"
          @mouseleave="setDecryptDisable"
          @mouseup="setDecryptDisable"
        >
          解码
        </v-btn>
        &nbsp;
        <v-btn small @click="copyPwd(item.pwd)">复制</v-btn>
        &nbsp;
        <v-btn small @dblclick="deletePwd(item.id)">删除</v-btn>
      </template>

    </v-data-table>


    <!-- 弹窗内容 -->
    <v-dialog
      v-model="dialogVisible"
      :width="dialogType === 'create' ? '800' : '90vw'"
      :persistent="dialogType === 'create'"
      max-width="90vw"
      scrollable
    >
      <v-card>
        <v-card-title class="headline"></v-card-title>
        <v-card-text>
          <v-container v-if="dialogType === 'create'" key="create">
            <v-form
              ref="form-creation"
              v-model="validateForm"
            >
              <v-text-field :rules="formItems.name.rules" v-model="formItems.name.value" label="用户名" outlined></v-text-field>
              <!-- <v-text-field :rules="formItems.pwd.rules" v-model="formItems.pwd.value" label="口令" type="password" outlined></v-text-field> -->
              <v-text-field is="v-password" :rules="formItems.name.rules" :value.sync="formItems.pwd.value" label="口令" outlined></v-text-field>
              <v-text-field :rules="formItems.bz.rules" v-model="formItems.bz.value" label="备注" outlined></v-text-field>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-btn x-large block @click="closeDialog">放弃</v-btn>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-btn color="success" :disabled="!validateForm" x-large block @click="submitForm">上传</v-btn>
                </v-col>
            </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
import { useTable, useDialog, useForm } from '../hooks/useVuetify'
import { encrypto, decrypto } from '../utils'
import VPasswordInput from '@/components/ext/vuetify.ext/VPasswordInput'
export default {
  name: 'PwdManager',
  components: {
    'v-password': VPasswordInput
  },
  setup () {
    const { tableState, doAxios } = useTable('/pwd')
    const { dialogState } = useDialog()
    const { formState } = useForm('form-creation', 'addPwd', data => {
      data.pwd = encrypto(data.pwd)
      doAxios({ method: 'post', url: '/pwd', data }).finally(() => {
        dialogState.closeDialog()
        formState.resetForm()
        tableState.loadDataset()
      })
    })

    const cryptoState = reactive({
      decryptEnable: false,
      decryptItemId: -1,
      setDecryptEnable (id) {
        cryptoState.decryptItemId = id
        cryptoState.decryptEnable = true
      },
      setDecryptDisable () {
        cryptoState.decryptItemId = -1
        cryptoState.decryptEnable = false
      },
    })

    return {
      ...toRefs(tableState),
      ...toRefs(dialogState),
      ...toRefs(formState),
      ...toRefs(cryptoState),
      parsePwd (pwd, id) {
        return cryptoState.decryptEnable && id === cryptoState.decryptItemId
          ? decrypto(pwd)
          : '●●●●●●●●●●●●●●●●'
      },
      copyPwd (pwd) {
        return window.navigator.clipboard.writeText(decrypto(pwd))
      },
      deletePwd (id) {
        doAxios({ method: 'delete', url: '/pwd', data: { id } }).finally(() => {
          tableState.loadDataset()
        })
      },
    }
  },
}
</script>

<style lang="scss" scoped>

</style>

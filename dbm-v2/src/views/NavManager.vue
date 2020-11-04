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
          <v-btn color="primary" @click="showDialog('create')">添加</v-btn>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-btn color="primary" @click="loadDataset" fab small><v-icon>mdi-cached</v-icon></v-btn>
        </v-toolbar>
      </template>

    </v-data-table>


    <v-dialog
      v-model="dialogVisible"
      :width="dialogType === 'create' ? '800' : '90vw'"
      persistent
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
              <v-text-field :rules="formItems.name.rules" v-model="formItems.name.value" label="名称" outlined></v-text-field>
              <v-combobox :rules="formItems.type.rules" v-model="formItems.type.value" label="类别" :items="tableDataset.propToArr('type').union()" outlined></v-combobox>
              <v-text-field :rules="formItems.url.rules" v-model="formItems.url.value" label="地址" outlined></v-text-field>
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
import { toRefs } from '@vue/composition-api'
import { useTable, useDialog, useForm } from '../hooks/useVuetify'
import { useAxios } from '../hooks/useAjax'
export default {
  name: 'NavManager',
  setup () {
    const { doAxios } = useAxios()
    const { tableState } = useTable('/nav')
    const { dialogState } = useDialog({ closeHandler: closeDialogHander })
    const { formState } = useForm('form-creation', 'addNav', item => {
      tableState.tableLoading = true
      doAxios({ method: 'post', url: '/nav', data: item }).finally(() => {
        dialogState.closeDialog()
        tableState.tableLoading = false
        formState.resetForm()
        tableState.loadDataset()
      })
    })
    function closeDialogHander () {
      formState.resetForm()
    }
    return {
      ...toRefs(tableState),
      ...toRefs(dialogState),
      ...toRefs(formState),
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <div>
    <v-data-table
      class="data-table"
      :headers="tableHeader"
      :items="tableDataset"
      item-key="id"
      sort-by="time"
      :sort-desc="true"
      :options.sync="tableOptions"
      :server-items-length="tableTotal"
      :loading="tableLoading"
    >


      <!-- 表头内容 -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>财务归档</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-spacer></v-spacer>
          <v-btn @click="showDialog('create')">添加</v-btn>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-btn @click="loadDataset" fab small><v-icon>mdi-cached</v-icon></v-btn>
        </v-toolbar>
      </template>

    </v-data-table>

    <v-dialog
      v-model="dialogVisible"
      width="90vw"
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
              <v-text-field :rules="formItems.value.rules" v-model="formItems.value.value" label="收支" outlined></v-text-field>
              <v-combobox :rules="formItems.type.rules" v-model="formItems.type.value" label="类别" :items="typeUnique" outlined></v-combobox>
              <v-text-field :rules="formItems.remark.rules" v-model="formItems.remark.value" label="备注" outlined></v-text-field>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-date-picker width="100%" v-model="formItems.date.value"></v-date-picker>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-time-picker v-model="formItems.time.value" format="24hr"></v-time-picker>
                </v-col>
              </v-row>
              <v-checkbox v-model="formItems.withlonlat.value" :label="`是否加入坐标记录: ${formItems.withlonlat.value ? '✔' : '✘'}`"></v-checkbox>
              <map-locator v-show="formItems.withlonlat.value" :lonlat.sync="formItems.lonlat.value" />
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
import { computed, toRefs } from '@vue/composition-api'
import { useTable, useDialog, useForm } from '../hooks/useVuetify'
export default {
  name: 'MoneyManager',
  components: {
    'map-locator': () => import('@/components/map-ui/map-locator')
  },
  setup () {
    const { tableState } = useTable('/money')
    const { dialogState } = useDialog()
    const { formState } = useForm('form-creation', 'addMoney', data => {
      const { type, remark } = data
      const value = Number(data.value)
      const lonlat = formState.formItems.withlonlat.value ? data.lonlat : ''
      const time = new Date(`${data.date} ${data.time}`).getTime()
      tableState.addDataItem({ value, type, time, lonlat, remark })
      dialogState.closeDialog()
      formState.resetForm()
    })
    return {
      ...toRefs(tableState),
      ...toRefs(dialogState),
      ...toRefs(formState),
      typeUnique: computed(() => tableState.tableDataset.propToArr('type').unique()),
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>

</style>

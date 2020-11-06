<template>
  <div>
    <v-data-table
      class="data-table"
      :headers="tableHeader"
      :items="tableDataset"
      item-key="id"
      :options.sync="tableOptions"
      :server-items-length="tableTotal"
      :loading="tableLoading"
      multi-sort
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

      <!-- 表列：链接名称 -->
      <template v-slot:[`item.name`]="{ item }">
        <v-edit-dialog
          :return-value.sync="item.name"
          large
          @save="updateNav({ id: item.id, name: item.name })"
        >
          【{{ item.name }}】
          <template v-slot:input>
            <v-text-field
              v-model="item.name"
               :rules="formItems.name.rules"
              hide-details
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>


      <!-- 表列：链接类别 -->
      <template v-slot:[`item.type`]="{ item }">
        <v-edit-dialog
          :return-value.sync="item.type"
          large
          @save="updateNav({ id: item.id, type: item.type })">
        <v-chip>{{ item.type }}</v-chip>
          <template v-slot:input>
            <v-combobox
              v-model="item.type"
               :rules="formItems.type.rules"
              :items="typeUnique"
              hide-details
            ></v-combobox>
          </template>
        </v-edit-dialog>
      </template>

      <!-- 表列：链接公开性 -->
      <template v-slot:[`item.visible`]="{ item }">
        <v-switch
          v-model="item.visible"
          hide-details
          @change="val => updateNav({ id: item.id, visible: val })"
        />
      </template>

      <!-- 表列：链接地址 -->
      <template v-slot:[`item.url`]="{ item }">
        <a @click="showDialog('webframe', item.url)">{{ urlFormat(item.url) }}</a>
      </template>

      <!-- 表列：操作 -->
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn @dblclick="deleteNav(item.id)">删除</v-btn>
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
              <v-text-field :rules="formItems.name.rules" v-model="formItems.name.value" label="名称" outlined></v-text-field>
              <v-combobox :rules="formItems.type.rules" v-model="formItems.type.value" label="类别" :items="typeUnique" outlined></v-combobox>
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
          <v-container v-else-if="dialogType === 'webframe'" key="webframe">
            <iframe :src="iframeUrl" width="100%" style="height: 75vh" frameborder="0"></iframe>
            <v-btn color="primary" @click="openUrl">在新标签页中打开</v-btn>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import { computed, ref, toRefs } from '@vue/composition-api'
import { useTable, useDialog, useForm } from '../hooks/useVuetify'
export default {
  name: 'NavManager',
  setup () {
    const { tableState, doAxios } = useTable('/nav')
    const { dialogState } = useDialog({
      showHandler: showDialogHandle,
      closeHandler: closeDialogHandler
    })
    const { formState } = useForm('form-creation', 'addNav', item => {
      doAxios({ method: 'post', url: '/nav', data: item }).finally(() => {
        dialogState.closeDialog()
        formState.resetForm()
        tableState.loadDataset()
      })
    })
    const iframeUrl = ref('')
    function closeDialogHandler () {
      formState.resetForm()
    }
    function showDialogHandle (url) {
      iframeUrl.value = url
    }
    return {
      ...toRefs(tableState),
      ...toRefs(dialogState),
      ...toRefs(formState),
      updateNav (data) {
        doAxios({ method: 'put', url: '/nav', data }).finally(() => {
          tableState.loadDataset()
        })
      },
      deleteNav (id) {
        doAxios({ method: 'delete', url: '/nav', data: { id } }).finally(() => {
          tableState.loadDataset()
        })
      },
      typeUnique: computed(() => tableState.tableDataset.propToArr('type').unique()),
      urlFormat (url) {
        return `${url.substring(0, 20)}......`
      },
      iframeUrl,
      openUrl () {
        window.open(iframeUrl.value)
      },
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.data-table >>> .v-input--selection-controls {
  margin-top: 0;
  padding-top: 0;
}
/* .data-table >>> table {
  height: 100vh;
} */
</style>

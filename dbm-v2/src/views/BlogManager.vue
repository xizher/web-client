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
          <v-toolbar-title>文章归档</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn @click="showDialog('create')">添加</v-btn>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-btn @click="loadDataset" fab small><v-icon>mdi-cached</v-icon></v-btn>
        </v-toolbar>
      </template>

    </v-data-table>


    <!-- 弹窗内容 -->
    <v-dialog
      v-model="dialogVisible"
      :width="'90vw'"
      :persistent="dialogType === 'create'"
      max-width="90vw"
      scrollable
    >
      <v-card>
        <v-card-title class="headline"></v-card-title>
        <v-card-text>
          <v-container v-if="dialogType === 'create'" key="create">
            <v-row no-gutters>
              <v-col>
                <v-form
                  ref="form-creation"
                  v-model="formCreationState.validateForm"
                >
                  <v-text-field v-model="formCreationState.formItems.title.value" :rules="formCreationState.formItems.title.rules" label="标题" outlined />
                  <v-textarea label="概述" v-model="formCreationState.formItems.desc.value" :rules="formCreationState.formItems.desc.rules" auto-grow outlined rows="3" row-height="15" />
                  <v-combobox v-model="formCreationState.formItems.sides.value" :rules="formCreationState.formItems.sides.rules" label="关键词" multiple chips outlined />
                  <md-helper :mdContent.sync="formCreationState.formItems.content.value" mode="edit" />
                </v-form>
              </v-col>
              <v-col>
                <md-helper :mdContent="formCreationState.formItems.content.value" mode="preview" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { toRefs } from '@vue/composition-api'
import { useDialog, useForm, useTable } from '../hooks/useVuetify'
import mdHelper from '@/components/ext/v-md-editor.ext/md-helper'
export default {
  name: 'BlogManager',
  components: {
    'md-helper': mdHelper
  },
  setup () {
    const { tableState, doAxios } = useTable('/blog/list')
    const { dialogState } = useDialog()
    const { formState: formCreationState } = useForm('form-create', 'addBlog', data => {
      // todo
    })

    return {
      ...toRefs(tableState),
      ...toRefs(dialogState),
      formCreationState,
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

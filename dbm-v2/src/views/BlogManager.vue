<template>
  <div>
    <v-data-table
      class="data-table"
      :headers="tableHeader"
      :items="tableDataset"
      show-expand
      sort-by="createtime"
      :sort-desc="true"
      item-key="id"
      :expanded.sync="tableExpanded"
      :options.sync="tableOptions"
      :server-items-length="tableTotal"
      :loading="tableLoading"
    >

      <!-- 表头内容 -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>文章归档</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-spacer></v-spacer>
          <v-btn @click="showDialog('create')">添加</v-btn>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-btn @click="loadDataset" fab small><v-icon>mdi-cached</v-icon></v-btn>
        </v-toolbar>
      </template>

      <!-- 表列：时间 -->
      <template v-slot:[`item.time`]="{ item }">
        <v-tooltip right color="#000">
          <template v-slot:activator="{ on, attrs }">
            <span class="col-time" v-bind="attrs" v-on="on">{{ item.cTimeFormat }}</span>
          </template>
          <span>创建时间</span>
        </v-tooltip>
         <br>
         <v-tooltip right color="#000">
          <template v-slot:activator="{ on, attrs }">
            <span class="col-time" v-bind="attrs" v-on="on">{{ item.mTimeFormat }}</span>
          </template>
          <span>最后编辑时间</span>
        </v-tooltip>
      </template>

      <!-- 表列是否公开 -->
      <template v-slot:[`item.visible`]="{ item }">
          <v-switch
            hide-details
            :input-value="item.visible"
            @change="val => updateDataItem({ id: item.id, visible: val })"
          />
      </template>

      <!-- 表元组展开项 -->
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <div class="expanded-container">
            <div class="description"><b>内容概述</b>：{{item.detial}}</div>
            <v-divider></v-divider>
            <div class="sides"><b>关键词</b>：<v-chip v-for="(side, index) in item.sides" :key="index" :small="true">{{side}}</v-chip></div>
          </div>
        </td>
      </template>

      <!-- 表列：统计 -->
      <template v-slot:[`item.statis`]="{ item }">
        👁: {{item.viewcount}} <br>
        ★: {{item.goodcount}}
      </template>

      <!-- 表列：编辑 -->
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="showDialog('update', item)">mdi-pencil</v-icon>
        <v-icon small class="mr-2" @dblclick="delDataItem(item.id)">mdi-delete</v-icon>
      </template>

    </v-data-table>


    <!-- 弹窗内容 -->
    <v-dialog
      v-model="dialogVisible"
      :width="'90vw'"
      persistent
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
                  <v-textarea label="概述" v-model="formCreationState.formItems.detial.value" :rules="formCreationState.formItems.detial.rules" auto-grow outlined rows="3" row-height="15" />
                  <v-combobox v-model="formCreationState.formItems.sides.value" :rules="formCreationState.formItems.sides.rules" label="关键词" multiple chips outlined />
                  <md-helper :mdContent.sync="formCreationState.formItems.content.value" mode="edit" />
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-btn x-large block @click="closeDialog">放弃</v-btn>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-btn color="success" :disabled="!formCreationState.validateForm" x-large block @click="formCreationState.submitForm">上传</v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
              <v-col>
                <md-helper class="preview-box" :mdContent="formCreationState.formItems.content.value" mode="preview" height="946px" />
              </v-col>
            </v-row>
          </v-container>
          <v-container v-else-if="dialogType === 'update'" key="update">
            <v-form
              ref="form-updation"
              v-model="formUpdationState.validateForm"
            >
              <v-text-field v-model="formUpdationState.formItems.title.value" :rules="formUpdationState.formItems.title.rules" label="标题" outlined />
              <v-textarea label="概述" v-model="formUpdationState.formItems.detial.value" :rules="formUpdationState.formItems.detial.rules" auto-grow outlined rows="3" row-height="15" />
              <v-combobox v-model="formUpdationState.formItems.sides.value" :rules="formUpdationState.formItems.sides.rules" label="关键词" multiple chips outlined />
              <md-helper :mdContent.sync="formUpdationState.formItems.content.value" />
              <v-row>
                <v-col cols="12" sm="6">
                  <v-btn x-large block @click="closeDialog">放弃</v-btn>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-btn color="success" :disabled="!formUpdationState.validateForm" x-large block @click="formUpdationState.submitForm">上传</v-btn>
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
import { useDialog, useForm, useTable } from '../hooks/useVuetify'
import mdHelper from '@/components/ext/v-md-editor.ext/md-helper'
export default {
  name: 'BlogManager',
  components: {
    'md-helper': mdHelper
  },
  setup () {
    const { tableState, doAxios } = useTable('/blog', {
      urlGet: '/list'
    })
    const { dialogState } = useDialog({
      showHandler: showDialogHandler,
      closeHandler: closeDialogHandler
    })
    const { formState: formCreationState } = useForm('form-creation', 'addBlog', data => {
      tableState.addDataItem(data).then(() => {
        dialogState.closeDialog()
        formCreationState.resetForm()
      })
    })
    const { formState: formUpdationState } = useForm('form-updation', 'updateBlog', data => {
      tableState.updateDataItem(data).then(() => {
        dialogState.closeDialog()
        formUpdationState.resetForm()
      })
    })
    function showDialogHandler (data) {
      if (dialogState.dialogType === 'update') {
        formUpdationState.formItems.id.value = data.id
        formUpdationState.formItems.title.value = data.title
        formUpdationState.formItems.detial.value = data.detial
        formUpdationState.formItems.sides.value = data.sides
        doAxios({ method: 'get', url: `/blog/${data.id}` }).then(({ content }) => {
          formUpdationState.formItems.content.value = content
        })
      }
    }
    function closeDialogHandler () {
      formUpdationState.resetForm()
    }
    return {
      ...toRefs(tableState),
      ...toRefs(dialogState),
      formCreationState,
      formUpdationState,
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.col-time {
  cursor: text;
}
.data-table >>> .v-input--selection-controls {
  margin-top: 0;
  padding-top: 0;
}
.expanded-container {
  margin: 10px 15px;
}
.description, .sides {
  padding: 5px;
  font-size: 1.1em;
}
.sides > * {
  margin: 0 5px;
}
.preview-box {
  margin: 5px;
  margin-left: 15px;
  box-shadow: 1px 1px 5px 2px #00000075;
}
</style>

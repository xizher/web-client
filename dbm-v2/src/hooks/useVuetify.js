import { getCurrentInstance, reactive, ref, toRef, watch } from '@vue/composition-api'
import { useAxios } from '../hooks/useAjax'
import appConf from '../config/app.conf'
import { isUrl } from '../utils'

export function useTheme (theme) {
  const { $vuetify } = getCurrentInstance()
  const isThemeDark = ref(theme === 'dark')
  $vuetify.theme.dark = isThemeDark.value
  watch(isThemeDark, val => $vuetify.theme.dark = val)
  return {
    isThemeDark
  }
}

export function useTable (tableUrl) {
  const { loading, doAxios } = useAxios()
  const tableConf = appConf.tableConf[tableUrl]
  const { urlGet, urlAdd, urlUpdate, urlDel } = tableConf.ajax
  const tableState = reactive({
    tableHeader: tableConf.header,
    tableLoading: loading,
    tableExpanded: [],
    tableOptions: {},
    tableDataset: [],
    tableTotal: 0,
    loadDataset () {
      const { page, itemsPerPage, sortBy, sortDesc } = tableState.tableOptions
      let [limit, offset] = [itemsPerPage, (page - 1) * itemsPerPage]
      if (itemsPerPage === -1) {
        limit = tableState.tableTotal
        offset = 0
      }
      const order = []
      sortBy.forEach((field, index) => {
        order.push({
          field,
          type: sortDesc[index] ? 'DESC' : 'ASC'
        })
      })
      doAxios({
        method: urlGet.method, url: `${tableUrl}${urlGet.path}`, data: { limit, offset, order }
      }).then(data => {
        tableState.tableTotal = data.total
        tableState.tableDataset.reset(...data.items)
      }).catch(err => {
        console.warn(err)
      })
    },
    async addDataItem (data) {
      await doAxios({
        method: urlAdd.method, url: `${tableUrl}${urlAdd.path}`, data
      })
      tableState.loadDataset()
    },
    async updateDataItem (data) {
      await doAxios({
        method: urlUpdate.method, url: `${tableUrl}${urlUpdate.path}`, data
      })
      tableState.loadDataset()
    },
    async delDataItem (id) {
      await doAxios({
        method: urlDel.method, url: `${tableUrl}${urlDel.path}`, data: { id }
      })
      tableState.loadDataset()
    }
  })
  watch(toRef(tableState, 'tableOptions'), tableState.loadDataset, { deep: true })
  return {
    tableState, doAxios
  }
}

export function useDialog({ showHandler, closeHandler } = {}) {
  const dialogState = reactive({
    dialogVisible: false,
    dialogType: '',
    showDialog (type, options) {
      dialogState.dialogType = type || ''
      if (showHandler?.(options) !== false) {
        dialogState.dialogVisible = true
      }
    },
    closeDialog () {
      if (closeHandler?.() !== false) {
        dialogState.dialogVisible = false
      }
    }
  })
  return {
    dialogState
  }
}

export function useForm(refName, formName, submitHandler) {
  const { $refs } = getCurrentInstance()
  const formConf = JSON.parse(JSON.stringify(appConf.formConf[formName])) // deep copy
  Object.keys(formConf).forEach(key => {
    formConf[key].rules = parseRules(formConf[key].rules)
  })
  const formState = reactive({
    formItems: formConf,
    validateForm: true,
    resetForm () {
      $refs[refName].reset()
    },
    submitForm () {
      const items = {}
      for (const key in formState.formItems) {
        items[key] = formState.formItems[key].value
      }
      submitHandler?.(items)
    }
  })

  return {
    formState
  }
}

function parseRules (rulesStr) {
  const rules = []
  rulesStr.split(',').forEach(item => {
    switch (item) {
    case 'required':
      rules.push(val => !!val || '必需')
      break
    case 'required-array':
      rules.push(val => val.length > 0 || '必需')
      break
    case 'url':
      rules.push(val => isUrl(val) || '地址格式不合法')
      break
    case 'email':

      break
    // no default
    }
  })
  return rules
}

import { getCurrentInstance, reactive, ref, toRef, watch } from '@vue/composition-api'
import { useAxios } from '../hooks/useAjax'
import appConf from '../config/app.conf'

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
  const tableState = reactive({
    tableHeader: appConf.tableConf[tableUrl],
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
        method: 'get', url: tableUrl, data: { limit, offset, order }
      }).then(data => {
        tableState.tableTotal = data.total
        tableState.tableDataset.reset(...data.items)
      }).catch(err => {
        console.warn(err)
      })
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
  const formState = reactive({
    formItems: appConf.formConf[formName],
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

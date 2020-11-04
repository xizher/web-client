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
      const { page, itemsPerPage } = tableState.tableOptions
      let [limit, offset] = [itemsPerPage, (page - 1) * itemsPerPage]
      if (itemsPerPage === -1) {
        limit = tableState.tableTotal
        offset = 0
        console.log(limit, offset)
      }
      doAxios({
        method: 'get', url: tableUrl, data: { limit, offset }
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
    tableState,
  }
}

export function useDialog({ showHandler, closeHandler } = {}) {
  const dialogState = reactive({
    dialogVisible: false,
    dialogType: '',
    showDialog (type) {
      dialogState.dialogType = type || ''
      if (showHandler?.() !== false) {
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

  // const formState = reactive({
  //   formItems: formConfig,
  //   sunmitEnabled: computed(() => {
  //     for (const key in formState.formItems) {
  //       const { required, value } = formState.formItems[key]
  //       if (required) {
  //         switch (typeof value) {
  //         case 'string':
  //           if (!value) {
  //             return false
  //           }
  //           break
  //         case 'object':
  //           if (Array.isArray(value) && value.length === 0 ) {
  //             return false
  //           }
  //           // no default
  //         }
  //       }
  //     }
  //     return true
  //   }),
  //   resetForm () {
  //     for (const key in formState.formItems) {
  //       const { value, defaultValue } = formState.formItems[key]
  //       if (Array.isArray(value)) {
  //         formState.formItems[key].value.clear()
  //       } else {
  //         formState.formItems[key].value = defaultValue
  //       }
  //     }
  //   },
  //   sumbitForm () {
  //     const items = {}
  //     for (const key in formState.formItems) {
  //       items[key] = formState.formItems[key].value
  //     }
  //     submitHandler?.(items)
  //   },
  // })

  // return {
  //   formState
  // }
}

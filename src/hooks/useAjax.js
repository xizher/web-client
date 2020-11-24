import { getCurrentInstance, ref } from '@vue/composition-api'

export function useAxios () {
  const { $store } = getCurrentInstance()
  const { serverApi } = $store.state
  const loading = ref(false)
  const doAxios = ({method, url, data, byServerApi = true} = {}) => {
    return new Promise((resolve, reject) => {
      loading.value = true
      let path = byServerApi
        ? `${serverApi}${url}`
        : url
      path = method === 'delete'
        ? `${path}?id=${data.id}`
        : path
      axios[method](path, method === 'get' ? { params: data } : data)
        .then(({ data: result }) => {
          loading.value = false
          if (byServerApi) {
            result.code === '0x200' ? resolve(result.data) : reject(result)
          } else {
            resolve(result)
          }
        })
        .catch(err => {
          loading.value = false
          console.log(err)
          reject(err)
        })
    })
  }
  return {
    loading, doAxios
  }
}

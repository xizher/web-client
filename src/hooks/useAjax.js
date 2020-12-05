import { ref } from 'vue'
import axios from 'axios'
import { useConfig } from '../hooks/useAppConf'

export function useAxios () {
  const loading = ref(false)
  function doAxios ({ method = 'get', url, data, byServerApi = true } = {}) {
    return new Promise((resolve, reject) => {
      method = method.toLocaleLowerCase()
      loading.value = true
      const { ajaxConf } = useConfig()
      let path = byServerApi ? `${ajaxConf.SERVER_API}${url}` : url
      path = (method === 'delete') ? `${path}?id=${data.id}` : path
      axios[method](path, method === 'get' ? { params: data } : data).then(({ data: result }) => {
        loading.value = false
        if (byServerApi) {
          result.err ? reject(result.info) : resolve(result.data)
        } else {
          resolve(result)
        }
      }).catch(err => {
        loading.value = false
        console.warn(err)
        reject(err)
      })
    })
  }
  return { loading, doAxios }
}

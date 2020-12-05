import { ref } from 'vue'
import axios from 'axios'
// import { SERVER_API } from '@/config/api.conf'
const SERVER_API = 'xxx'

export function useAxios () {
  const loading = ref(false)
  function doAxios ({ method = 'get', url, data, byServerApi = true } = {}) {
    return new Promise((resolve, reject) => {
      method = method.toLocaleLowerCase()
      loading.value = true
      let path = byServerApi ? `${SERVER_API}${url}` : url
      path = (method === 'delete') ? `${path}?id=${data.id}` : path
      axios[method](path, method === 'get' ? { params: data } : data).then(({ data: result }) => {
        loading.value = false
        if (byServerApi) {
          result.code === '0x200' ? resolve(result.data) : reject(result.msg)
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

import { ref } from '@vue/composition-api'
import { SERVER_API } from '@/config/api.conf'

export function useAxios () {
  const loading = ref(false)
  const doAxios = ({method, url, data, byServerApi = true} = {}) => {
    return new Promise((resolve, reject) => {
      loading.value = true
      let path = byServerApi
        ? `${SERVER_API}${url}`
        : url
      path = method === 'delete'
        ? `${path}?id=${data.id}`
        : path
      axios[method](path, method === 'get' ? { params: data } : data)
        .then(({ data: result }) => {
          loading.value = false
          if (byServerApi) {
            result.code === 0 ? resolve(result.data) : reject(result.msg)
          } else {
            resolve(result)
          }
        })
        .catch(err => {
          loading.value = false
          reject(err)
        })
    })
  }
  return {
    loading, doAxios
  }
}

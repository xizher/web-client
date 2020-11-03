import { ref } from '@vue/composition-api'
import { SERVER_API } from '../config/api.conf'
import Qs from 'qs'

declare const axios: any
export type AjaxMethod = 'get' | 'post' | 'put' | 'delete'

export function useAxios () {
  const loading = ref(false)
  const doAxios = (method: AjaxMethod, url: string, params: any, { byServerApi = true } = {}) : Promise<any> => {
    return new Promise((resolve, reject) => {
      loading.value = true
      const path = byServerApi ? `${SERVER_API}${url}` : url
      axios[method](method === 'delete' ? `${path}?id=${params.id}` : path, method === 'get' ? { params } : params)
        .then(({ data: result }: any) => {     
          if (byServerApi) {
            result.code == 0 ? resolve(result.data) : reject(result.msg)
          } else {
            resolve(result)
          }
        })
        .catch((err: any) => reject(err))
        .finally(() => loading.value = false)
    })
  }
  return {
    loading, doAxios
  }
}
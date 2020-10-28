import { reactive } from '@vue/composition-api'
import { SERVER_API } from '../config/api.conf.js'

declare const axios: any

export function useAxios () {
  const state = reactive({
    loading: false,
    axiosGet (url: string, params: any, { byServerApi = true } = {}) {
      return new Promise((resolve, reject) => {
        const path = byServerApi ? `${SERVER_API}`
      })
    }
  })
}
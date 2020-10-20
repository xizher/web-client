import namespace from '../namespace'
import { SERVER_API } from '../../config/api.conf'

namespace.reg('WXZ.Ajax')

WXZ.Ajax = class {
  
  static async axiosGet (url, params, { localhost = true } = {}) {
    const result = (await axios.get(localhost ? `${SERVER_API}${url}` : url, { params })).data;
    if (localhost) {
      if (result.code == 0) {
        return Promise.resolve(result.data)
      } else {
        return Promise.reject(result.msg)
      }
    } else {
      return Promise.resolve(result)
    }
  }

  static async axiosPost (url, params, { localhost = true } = {}) {
    const result = (await axios.post(localhost ?  `${SERVER_API}${url}` : url, params)).data;
    if (localhost) {
      if (result.code == 0) {
        return Promise.resolve(result.data)
      } else {
        return Promise.reject(result.msg)
      }
    } else {
      return Promise.resolve(result)
    }
  }

}

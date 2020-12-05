import { notification } from 'ant-design-vue'

export function showMsg (msg, desc, {
  duration = 4.5,
  type = 'info'
} = {}) {
  notification[type]({
    message: msg,
    description: desc,
    duration: type === 'error' ? 0 : duration,
  })
}

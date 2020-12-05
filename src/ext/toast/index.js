import vue from 'vue'
import Toast from './toast.vue'

const ToastConstructor = vue.extend(Toast)

export function showToast({
  msg = '',
  type = 'normal',
  layout = 'right-bottom'
} = {}) {
  const toast = new ToastConstructor({
    data () {
      return {
        visible: true,
        msg,
        type,
        layout,
      }
    }
  })
  const element = toast.$mount().$el
  document.body.appendChild(element)
  // setTimeout(() => toast.visible = false, duration * 1000)
}

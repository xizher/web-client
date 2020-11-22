import { computed, onMounted, onUnmounted, ref } from '@vue/composition-api'

export function useNow (formatStr) {
  const date = ref(new Date)
  const dateFormat = computed(() => date.value.format(formatStr))
  let handler = 0
  onMounted(() => {
    handler = setInterval(() => date.value = new Date())
  })
  onUnmounted(() => {
    clearInterval(handler)
  })
  return {
    date, dateFormat
  }
}

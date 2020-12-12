import { defineComponent } from 'vue'
import { getWebMap } from '@/hooks/useMap'

export default defineComponent({
  name: 'App',
  setup() {

    const webMap = getWebMap()

    console.log(webMap)

    return () => (
      <>
        <div>Hello World { webMap.t.value } </div>
      </>
    )
  }
})

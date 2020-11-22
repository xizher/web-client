<template>
  <div class="blog-container">
    <div class="progress" v-if="loading" key="loading">
      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
    </div>
    <div v-else key="viewer">
      <h2>{{ title }}</h2>
      <VueMarkdownEditor v-model="content" :include-level="[2, 3, 4]" mode="preview" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { useAxios } from '../hooks/useAjax'
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
VueMarkdownEditor.use(vuepressTheme)
export default {
  name: 'BlogViewer',
  components: {
    VueMarkdownEditor
  },
  setup() {
    const { params: { id } } = useRoute()
    const { loading, doAxios } = useAxios()
    const blogObj = reactive({
      content: '',
      title: ''
    })
    doAxios({ method: 'get', url: '/blog/' + id }).then(res => {
      Object.assign(blogObj, res)
    })
    return {
      ...toRefs(blogObj),
      loading
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-container {
  margin: 24px auto;
  max-width: 80vw;
  width: 800px;
}
</style>

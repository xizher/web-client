<template>
  <v-md-editor
    :value="mdContent"
    @change="handleChange"
    :height="height"
    :mode="mode"
    left-toolbar=""
    right-toolbar="fullscreen"
  />
</template>

<script>
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor'
import '@kangc/v-md-editor/lib/style/codemirror-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import Codemirror from 'codemirror'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/addon/display/placeholder'
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/lib/codemirror.css'
VMdEditor.Codemirror = Codemirror
VMdEditor.use(githubTheme)
export default {
  name: 'MdHelper',
  components: {
    'v-md-editor': VMdEditor,
  },
  props: {
    mdContent: { type: String, default: '' },
    mode: { type: String, default: 'editable' },
    height: { type: String, default: '600px' }
  },
  methods: {
    handleChange(val) {
      this.$emit('update:mdContent', val)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

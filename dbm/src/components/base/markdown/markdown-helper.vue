<template>
  <v-md-editor :value="mdContent" @change="handleChange" :height="height" :mode="mode"></v-md-editor>
</template>

<script>
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
// codemirror 编辑器的相关资源
import Codemirror from 'codemirror';
// mode
import 'codemirror/mode/markdown/markdown';
// placeholder
import 'codemirror/addon/display/placeholder';
// active-line
import 'codemirror/addon/selection/active-line';
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
// style
import 'codemirror/lib/codemirror.css';

VMdEditor.Codemirror = Codemirror;
VMdEditor.use(githubTheme);
export default {
  name: 'MarkdownHelper',
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

<style scoped>

</style>
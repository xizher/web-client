<template>
  <v-md-editor :value="mdContent" @change="handleChange" :height="height" :mode="mode"></v-md-editor>
</template>

<script>
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
VMdEditor.use(vuepressTheme);
export default {
  name: 'MarkdownHelper',
  components: {
    VMdEditor,
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
<template>
  <header class="mdc-top-app-bar mdc-top-app-bar--fixed">
    <div class="mdc-top-app-bar__row">
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
        <span class="mdc-top-app-bar__title">{{ title }}</span>
      </section>
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
        <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" @click="linkTo('/')">more</button>
        <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" @click="linkTo('/blog-catalog')">bookmark</button>
        <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" @click="linkTo('/about')">share</button>
      </section>
    </div>
  </header>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent ({
  name: 'TopAppBar',
  props: {
    title: { type: String, default: 'Ngheizit' },
  },
  setup (props, { emit }) {
    const router = useRouter()

    onMounted(() => {
      mdc.topAppBar.MDCTopAppBar.attachTo(document.querySelector('.mdc-top-app-bar'))
    })

    return {
      linkTo (path) {
        router.push(path)
      }
    }
  },
})
</script>

<style lang="scss" scoped>

</style>
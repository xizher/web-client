import { defineComponent, onMounted } from 'vue'
declare const mdc: any

export default defineComponent({
  name: 'TopAppBar',
  props: {
    title: { type: String, default: 'Title' },
    menuVisible: Boolean,
  },
  setup (props, { emit }) {

    onMounted(() => {
      mdc.topAppBar.MDCTopAppBar.attachTo(document.querySelector('.mdc-top-app-bar'))
    })

    const handleClick_menu = () => {
      emit('update:menuVisible', !props.menuVisible)
    }

    return () =>
      <>
        <header class="mdc-top-app-bar mdc-top-app-bar--fixed">
          <div class="mdc-top-app-bar__row">
            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
              <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" aria-label="Open navigation menu" onClick={ handleClick_menu }>menu</button>
              <span class="mdc-top-app-bar__title">{ props.title }</span>
            </section>
            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
              <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Favorite">favorite</button>
              <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Search">search</button>
              <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Options">more_vert</button>
            </section>
          </div>
        </header>
      </>
  },
})
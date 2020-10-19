import { defineComponent, onMounted } from 'vue'
declare const mdc: any

export default defineComponent({
  name: 'NavigationDrawers',
  props: {
    dismissible: Boolean,
  },
  setup (props) {

    onMounted(() => {
      // mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'))
      // const listEl = document.querySelector('.mdc-drawer .mdc-list') as Element;
      // const mainContentEl = document.querySelector('.main-content') as any;

      // listEl.addEventListener('click', (event) => {
      //   mainContentEl.querySelector('input, button').focus();
      // });

      // document.body.addEventListener('MDCDrawer:closed', () => {
      //   mainContentEl.querySelector('input, button').focus();
      // });
      
    })

    return () => <>
      <aside
        class={{
          "mdc-drawer": true,
          "mdc-top-app-bar--fixed-adjust": true,
          // "mdc-drawer--open": true,
          // "mdc-drawer--opening": true,
          // "mdc-drawer--closing": true,
          "mdc-drawer--dismissible": props.dismissible,
        }}
      >
        <div class="mdc-drawer__content">
          <nav class="mdc-list">
            <a class="mdc-list-item mdc-list-item--activated" href="#" aria-current="page">
              <span class="mdc-list-item__ripple"></span>
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">inbox</i>
              <span class="mdc-list-item__text">Inbox</span>
            </a>
            <a class="mdc-list-item" href="#">
              <span class="mdc-list-item__ripple"></span>
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">send</i>
              <span class="mdc-list-item__text">Outgoing</span>
            </a>
            <a class="mdc-list-item" href="#">
              <span class="mdc-list-item__ripple"></span>
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">drafts</i>
              <span class="mdc-list-item__text">Drafts</span>
            </a>
          </nav>
        </div>
      </aside>
    </>
  },
})
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand">{{ title }}</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
          <li class="nav-item" v-for="(item, index) in navItems" :key="index">
            <router-link :to="item.to" class="nav-link">{{ item.name }}</router-link>
          </li>
        </ul>
        <div class="d-flex">
          <input class="form-control mr-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success">Search</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BsNavbar',
  props: {
    title: { type: String, default: '' },
    navItems: { type: Array, default: () => [] }
  },
  setup () {

    return {

    }
  }
})
</script>

<style lang="scss" scoped>
.nav-link {
  cursor: pointer;
}
.navbar-brand {
  cursor: default;
}
</style>

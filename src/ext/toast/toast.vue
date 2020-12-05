<template>
  <transition name="fade">
    <div
      class="wxz-toast"
      :class="layout"
      :style="{
        'borderColor': borderColor
      }"
      v-if="visible"
    >
      <span>
        <span class="msg">{{ type !== 'normal' ? `${type[0].toUpperCase()}${type.slice(1)}: ` : '' }}</span>
        {{ msg }}</span>
      <span class="btn-close" @click="visible = false">✘</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'WxzToast',
  data () {
    return {
      visible: true,
      msg: '',
      type: 'normal',
      layout: 'center'
    }
  },
  computed: {
    borderColor () {
      let color = ''
      switch (this.type) {
      case 'success':
        color = '#43A047'
        break
      case 'error':
        color = '#B03634'
        break
      case 'warning':
        color = '#FFCA28'
        break
      default:
        color = '#A7ABB7'
        break
      }
      return color
    }
  }
}
</script>

<style lang="scss" scoped>
.wxz-toast {
  position: fixed;
  background-color: white;
  min-height: 64px;
  display: flex;
  align-items: center;
  width: 320px;
  max-width: 90vw;
  border-left: 8px solid;
  border-radius: 6px;
  cursor: default;
  box-shadow: 2px 2px 5px #888888;
  &.center {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  &.center-top {
    left: 50%;
    top: 8%;
    transform: translateX(-50%)
  }
  &.center-bottom {
    left: 50%;
    bottom: 8%;
    transform: translateX(-50%)
  }
  &.right-bottom {
    right: 20px;
    bottom: 50px;
  }
  > * {
    padding: 8px;
  }
}
.btn-close {
  cursor: pointer;
  margin-left: auto;
}
.msg {
  font-family: 'Courier New', Courier, monospace;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

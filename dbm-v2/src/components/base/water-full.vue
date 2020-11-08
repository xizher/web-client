<template>
  <div class="waterfall">
    <slot></slot>
  </div>
</template>

<script>
import { onMounted } from '@vue/composition-api'
export default {
  name: 'WaterFall',
  setup() {

    onMounted(() => {
      waterfall('.waterfall')
    })

    return {

    }
  }
}
</script>

<style lang="scss">
.waterfall {

  padding: 0;
  width: 100%;
  height: auto;
  margin: 0 auto;
  visibility: visible;

  > * {
    // background-color: orange;
    // text-align: center;
    display: inline-block;
    // color: #FFF;
    // height: 15%;
    width: calc(33.3% - 10px);
    margin: 5px;
    // padding: 10px;
    -webkit-animation: anim .8s ease-in-out;
    animation: anim .8s ease-in-out;
  }
  @media (max-width: 920px) {
    > * {
      font-size: 30px;
      width: 47%;
      padding: 0px;
      padding-top: 20px;
    }
  }

}


@keyframes anim {
  0% {
    display: none;
    opacity: 0;
  }
  1% {
    display: block;
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>

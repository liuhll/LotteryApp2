<template>
    <x-header 
    :left-options="{showBack: showBack}" 
    style="width:100%;position:absolute;left:0;top:0;z-index:100;
    background-color:#E10601">计划</x-header>
</template>

<script>
import { XHeader } from 'vux'

export default {
  name: 'LtHeader',
  props: {
    showBack: {
      type: Boolean
    }
  },
  components: {
      XHeader
  }
}
</script>

<style lang="less">
.vux-header {
  height: 40px;
  line-height: 40px;
   
}
</style>

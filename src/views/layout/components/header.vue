<template>
  <div>
      <x-header :left-options="{showBack: false}" style="background-color:red;">计划</x-header>
  </div>
</template>

<script>
import { XHeader } from 'vux'

export default {
  name: 'LtHeader',
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

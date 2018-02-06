<template>
  <div class="app-wrapper">
    <lt-header></lt-header>
    <app-main></app-main>
    <lt-tabbar></lt-tabbar>
  </div>
</template>
<script>
import { ViewBox } from 'vux'
import LtHeader from './components/header'
import AppMain from './app-main'
import LtTabbar from './components/tabbar'

export default {
  name: 'layout',
  components: {
    LtHeader,
    LtTabbar,
    AppMain,
    ViewBox
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';

html, body,.app-wrapper {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
</style>


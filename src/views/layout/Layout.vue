<template>
  <div class="app-wrapper">
    <lt-header :showBack="showBack" :more="more"></lt-header>
    <app-main class="app-main"></app-main>
    <lt-tabbar v-show="isShowTabBar()"></lt-tabbar>
  </div>
</template>
<script>
import { ViewBox } from 'vux'
import LtHeader from './components/header'
import AppMain from './app-main'
import LtTabbar from './components/tabbar'
import { fail } from 'assert';

export default {
  name: 'layout',
  components: {
    LtHeader,
    LtTabbar,
    AppMain,
    ViewBox
  },
  computed: {
    showBack() {
      if (this.$route.meta.showBack === true) {
        return true;
      }
      return false;
    },
    more() {
      if (this.$route.meta.more) {
        return this.$route.meta.more;
      }
      return {};
    }
  },
  methods: {
    isShowTabBar() {
      if (this.$route.meta.showtabbar) {
        return true;
      }
      return false;
    }
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
.app-main {
  position: absolute;
  top: 40px;
  margin-bottom: 100px;
}
</style>


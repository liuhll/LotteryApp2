<template>
  <div class="app-wrapper">
    <lt-header :showBack="showBack" :more="more"></lt-header>
    <app-main class="app-main"  v-on:changeTab="changeTab"></app-main>
    <!-- <lt-tabbar v-show="isShowTabBar()" :num="num"></lt-tabbar> -->
    <tabbar v-show="isShowTabBar()" style="position:absolute">
      <tabbar-item :selected="index==0"  link="/plan">
        <img slot="icon" src="../../assets/images/plan.svg">
        <img slot="icon-active" src="../../assets/images/plan-active.svg">      
        <span slot="label">计划</span>
      </tabbar-item>
      <tabbar-item :selected="index==1" link="/pointmall">
        <img slot="icon" src="../../assets/images/integralmall.svg">
        <img slot="icon-active" src="../../assets/images/integralmall-active.svg">   
        <span slot="label">积分商城</span>
      </tabbar-item>
      <tabbar-item :selected="index==2" link="/me">
        <img slot="icon" src="../../assets/images/me.svg">
        <img slot="icon-active" src="../../assets/images/me-active.svg">   
        <span slot="label">我</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
import { ViewBox,Tabbar,TabbarItem } from 'vux'
import LtHeader from './components/header'
import AppMain from './app-main'

export default {
  name: 'layout',
  components: {
    LtHeader,
    AppMain,
    ViewBox,
    Tabbar,
    TabbarItem
  },
   ready () {
    document.querySelector('body').style.height = '100%'
    document.querySelector('html').style.height = '100%'
    document.querySelector('#app').style.height = '100%'
  },
  data() {
    return {
      index: 0
    }
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
    },
    changeTab(num) {
      this.index = num
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';
@import url('../../assets/styles/lottery-theme.less');

.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i,
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
  color:  @lottery-theme-color;
}
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


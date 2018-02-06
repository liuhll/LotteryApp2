<template>
 <tabbar style="position:absolute">
      <tabbar-item selected link="/plan">
        <img slot="icon" src="../../../assets/images/plan.svg">
        <img slot="icon-active" src="../../../assets/images/plan-active.svg">      
        <span slot="label">计划</span>
      </tabbar-item>
      <tabbar-item link="/pointmall">
        <img slot="icon" src="../../../assets/images/integralmall.svg">
        <img slot="icon-active" src="../../../assets/images/integralmall-active.svg">   
        <span slot="label">积分商城</span>
      </tabbar-item>
      <tabbar-item link="/me">
        <img slot="icon" src="../../../assets/images/me.svg">
        <img slot="icon-active" src="../../../assets/images/me-active.svg">   
        <span slot="label">我</span>
      </tabbar-item>
    </tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
  name: 'LtTabbar',
  ready () {
    document.querySelector('body').style.height = '100%'
    document.querySelector('html').style.height = '100%'
    document.querySelector('#app').style.height = '100%'
  },
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>

<style lang="less">
@import url('../../../assets/styles/lottery-theme.less');
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i,
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
  color:  @lottery-theme-color;
}
</style>

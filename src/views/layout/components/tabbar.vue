<template>
 <tabbar>
      <tabbar-item selected link="/plan">      
        <span slot="label">计划</span>
      </tabbar-item>
      <tabbar-item link="/pointmall">
        <span slot="label">积分商城</span>
      </tabbar-item>
      <tabbar-item link="/me">
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

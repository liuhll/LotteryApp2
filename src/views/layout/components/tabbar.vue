<template>
  <div>      
    <tabbar>
      <tabbar-item>
        <span slot="label" selected :link="{path:'/plan'}">计划</span>
      </tabbar-item>
      <tabbar-item show-dot>
        <span slot="label" :link="{path:'/pointmall'}">积分商城</span>
      </tabbar-item>
      <tabbar-item >
        <span slot="label">我</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
  name: 'LtTabbar',
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>

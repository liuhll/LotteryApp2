<template>
   <div class="data-analyse-container">
    <grid :cols='5'>
      <grid-item label="号码走势图">
       <img slot="icon">
      </grid-item>
      <grid-item label="大小走势图">
       <img slot="icon">
      </grid-item>
      <grid-item label="奇偶走势图">
       <img slot="icon">
      </grid-item>
      <grid-item label="数据统计">
        <img slot="icon">
      </grid-item>
      <grid-item label="遗漏值">
        <img slot="icon">
      </grid-item>
      <grid-item label="冷热号码">
        <img slot="icon">
      </grid-item>
    </grid>
  </div>
</template>

<script>
import { Grid, GridItem } from 'vux'

export default {
  components: {
    Grid,
    GridItem
  }
}
</script>


<style lang="less">
.app-main {
  margin-bottom:10px;
  width: 100%;
}
.weui-grid {
  padding: 4px 4px !important;
}
.weui-grid__icon {
  width: 16px!important;
  height: 16px!important;
}
.weui-grid__label {
  font-size: 12px!important;
  color: #333333!important;
}
</style>
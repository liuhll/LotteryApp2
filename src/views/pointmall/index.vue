<template>
   <div class="point-mall-container">
    <grid :cols='4'>  
      <grid-item label="我的积分">
        <img slot="icon" src="../../assets/images/pointmall/mypoints.svg">
      </grid-item>   
      <grid-item label="积分记录">
       <img slot="icon" src="../../assets/images/pointmall/pointrecord.svg">
      </grid-item>
      <grid-item label="积分购买">
       <img slot="icon" src="../../assets/images/pointmall/points.svg">
      </grid-item>
      <grid-item label="签到">
       <img slot="icon" src="../../assets/images/pointmall/signed.svg">
      </grid-item>
      <grid-item label="分享App">
       <img slot="icon" src="../../assets/images/pointmall/share.svg">
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
  },
  mounted() {
    this.$emit("changeTab", 1);
  },
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
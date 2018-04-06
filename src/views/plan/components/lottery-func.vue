<template>
  <div class="lt-func-wrapper">
    <grid :cols='5'>
      <grid-item label="选择计划" link="/chiceplan">
       <img slot="icon" src="../../../assets/images/lotteryfunc/plan.svg">
      </grid-item>
      <grid-item label="切换公式"  @click.native="switchFormula()">
        <img slot="icon" src="../../../assets/images/lotteryfunc/function.svg">
      </grid-item>
      <grid-item label="基础指标" link="/basicnorm">
        <img slot="icon" src="../../../assets/images/lotteryfunc/norm.svg">
      </grid-item>
      <grid-item label="数据分析" link="/dataanalyse">
        <img slot="icon" src="../../../assets/images/lotteryfunc/analyse.svg">
      </grid-item>
      <grid-item label="历史开奖" link="/history">
        <img slot="icon" src="../../../assets/images/lotteryfunc/lotteryhistroy.svg">
      </grid-item>
      <grid-item label="购买授权">
        <img slot="icon" src="../../../assets/images/lotteryfunc/authorize.svg">
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
  methods: {
    switchFormula() {
      const _this = this;
       this.$vux.confirm.show({
        title: '是否确定切换公式?',
        content: '当前彩票数据引擎会根据您设定的计划指标选择最优公式重新计算追号数据',
        onConfirm() {            
          _this.$emit('switchFormula');
         },
         onCancel() {
          
         }
       })
    }
  }
}
</script>


<style lang="less">
.lt-func-wrapper {
    height: 96px;
    width: 100%;
    background-color: #F9F8F0;
    position: fixed;
    top: 125px;
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

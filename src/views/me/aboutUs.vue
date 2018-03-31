<template>
  <group title="关于彩乐盟工作室">       
      <cell-box>
         彩乐盟工作室成立于2017年年初,成立以来专注于数据分析引擎的开发与研究,致力于为国内彩民提供最优质的服务。经过长期研发,现已研发出计划最丰富、可自定义指标、自由切换公式
         拥有高效算法的数据分析引擎。该数据引擎基于历史开奖数据和概率学，以历史开奖的数据为基准的冷热码、遗漏值、期望值、平均值、偏差值等等因子，计算出下一期开奖时概率最高的数据，
         通过长时间测试与实践证明,通过该数据数据引擎确实有效的提高了开奖命中率。
      </cell-box>
       <cell-box>
           我们现已根据该数据引擎研发出彩乐盟快彩分析软件，该软件能够有效的提高中奖命中率，减少垃圾注。
       </cell-box>
       <cell-box>您可以访问我们的<a href="http://www.clmeng.com">官网</a>（http://www.clmeng.com）了解更多资讯。</cell-box>
  </group>
</template>
<script>
import { Group, CellBox } from 'vux'
export default {
  components: {
    Group,
    CellBox
  },
}
</script>

<style lang="less">
.app-main {
  margin-bottom:10px;
  width: 100%;
  font-size: 14px;
}
.weui-cells__title {
    font-size: 18px!important;
    color: #444!important;
}

</style>

<style lang="less" scoped>
.weui-cell {
    font-size: 14px;
    display: inline-block!important;
}
</style>


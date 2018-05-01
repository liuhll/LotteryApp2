<template>
    <div class="tracking-number-wrapper">
      <scroller lock-x @on-scroll="onScroll"  height="88%" ref="scrollerEvent">
      <div class="box2">
        <predict-data-item v-for="(item,index) in predictDatas" :trackingData="item"  v-on:onSwitchPlanFormula="onSwitchPlanFormula"  :key="index">         
        </predict-data-item>
      </div>
      </scroller>
    </div>
</template>
<script>
import { Scroller } from "vux";
import PredictDataItem from "@/components/predict-data-item";

export default {
  components: {
    Scroller,
    PredictDataItem
  },
  props: {
    predictDatas: {
      type: Array
    }
  },
  methods: {
    onScroll() {},
    onSwitchPlanFormula(normId) {
       const _this = this
       this.$vux.confirm.show({
            title: "切换公式",
            content:'是否确认切换该计划公式？确认后数据引擎会根据您设置的指标搜索公式并计算追号数据',
            onConfirm() {
              _this.$emit('onSwitchPlanFormula', normId)
            },
            onCancel() {
             
            }
          });
        
    }
  }
};
</script>
<style lang="less" scoped>
.tracking-number-wrapper {
  height: 65%;
  width: 100%;
  position: fixed;
  top: 224px;
  overflow: hidden;
}
</style>

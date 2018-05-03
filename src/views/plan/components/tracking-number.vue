<template>
    <div class="tracking-number-wrapper">
      <scroller lock-x @on-scroll="onScroll"  height="88%" ref="scrollerEvent">
      <div class="box2">
        <predict-data-item v-for="(item,index) in predictDatas" :trackingData="item"  v-on:onSwitchPlanFormula="onSwitchPlanFormula"  :key="index">         
        </predict-data-item>
      </div>
            <divider>友情提示: 彩市有风险，投资需理性</divider>
      </scroller>

    </div>
</template>
<script>
import { Scroller,Divider } from "vux";
import PredictDataItem from "@/components/predict-data-item";

export default {
  components: {
    Scroller,
    PredictDataItem,
    Divider
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

.vux-divider {
    font-size: 12px !important;
    padding-top: 10px;

}
</style>

<template>
  <div class="plan-wrapper">
      <lottery-run v-on:lotterydata="predictdatas"></lottery-run>
      <lottery-func v-on:switchFormula="switchFormula"></lottery-func>
      <tracking-number :predictDatas="predictDatas"  v-on:onSwitchPlanFormula="onSwitchPlanFormula" ></tracking-number>
  </div>
</template>
<script>
import LotteryFunc from "./components/lottery-func";
import LotteryRun from "./components/lottery-run";
import TrackingNumber from "./components/tracking-number";

export default {
  name: "LtPlan",
  components: {
    LotteryFunc,
    LotteryRun,
    TrackingNumber
  },
  data() {
    return {
      predictDatas: []
    };
  },
  created() {
    const _this = this;
    _this.$store.dispatch("GetUserInfo").then(result => {
      _this.$route.meta.more.headerTitle =
        result.result.lotteryInfo.name + "计划分析";
    });
  },
  methods: {
    predictdatas(isNew) {
      this.$vux.loading.show("计算中...");
      this.$store
        .dispatch("GetPredictDatas")
        .then(result => {
          this.predictDatas = result;
          this.$vux.loading.hide();
        })
        .catch(error => {
          this.$vux.alert.show(error.message);
        });
    },
    switchFormula() {
      this.$vux.loading.show("搜索公式中...");
      this.$store
        .dispatch("UpdatePredictDatas")
        .then(result => {
          this.predictDatas = result;
          this.$vux.loading.hide();
        })
        .catch(error => {
          let _this = this;
          _this.$vux.loading.hide();
          _this.$vux.confirm.show({
            title: "购买授权",
            content: error.message,
            onConfirm() {
              _this.$router.push({ path: "/purchase" });
            },
            onCancel() {}
          });
        });
    },
    onSwitchPlanFormula(normId) {
      const _this = this;
      _this.$vux.loading.show("计算中...");
      _this.$store
        .dispatch("UpdatePredictData", { normId: normId })
        .then(result => {
          _this.predictdatas(false);
          _this.$vux.loading.hide();
          // _this.$vux.alert.show({
          //   title: '切换公式',
          //   content: result
          // })
        })
        .catch(error => {
          let _this = this;
          _this.$vux.loading.hide();
          _this.$vux.confirm.show({
            title: "购买授权",
            content: error.message,
            onConfirm() {
              _this.$router.push({ path: "/purchase" });
            },
            onCancel() {}
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.plan-wrapper {
  position: relative;
  top: 0;
  left: 0;
}
</style>

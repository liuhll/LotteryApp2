<template>
  <div class="plan-wrapper">
      <lottery-run v-on:lotterydata="predictdatas"></lottery-run>
      <lottery-func v-on:switchFormula="switchFormula"></lottery-func>
      <tracking-number :predictDatas="predictDatas"></tracking-number>
  </div>
</template>
<script>
import LotteryFunc from './components/lottery-func';
import LotteryRun from './components/lottery-run';
import TrackingNumber from './components/tracking-number';

export default {
  name: 'LtPlan',
  components: {
    LotteryFunc,
    LotteryRun,
    TrackingNumber
  },
  data() {
    return {
      predictDatas: []
    }
  },
  methods: {
    predictdatas(isNew) {
      if(!isNew) {
        this.$vux.loading.show('计算中...');
      }
      this.$store.dispatch('GetPredictDatas').then(result => {
          this.predictDatas = result;
          this.$vux.loading.hide();
        }).catch(error => {
          this.$vux.loading.hide();
          this.$vux.alert.show(error.message);
        })
    },
    switchFormula() {
       this.$vux.loading.show('切换公式,重新计算中...');
       this.$store.dispatch('UpdatePredictDatas').then(result => {
          this.predictDatas = result;
          this.$vux.loading.hide();
        }).catch(error => {
          this.$vux.loading.hide();
          this.$vux.alert.show(error.message);
        })
    }
  }
}
</script>

<style lang="less" scoped>
.plan-wrapper {
  position: relative;
  top: 0;
  left: 0;
}
</style>

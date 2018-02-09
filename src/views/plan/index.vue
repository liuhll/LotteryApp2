<template>
  <div class="plan-wrapper">
      <lottery-run></lottery-run>
      <lottery-func></lottery-func>
      <tracking-number></tracking-number>
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
      finalLotteryData: {}
    }
  },
  created() {
    this.getFinalLotteryData();
  },
  methods: {
    getFinalLotteryData() {     
      this.$store.dispatch("GetFinallotterydata").then(result => {
        debugger;
        return this.finalLotteryData = result;
      });
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

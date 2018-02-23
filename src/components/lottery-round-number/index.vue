<template>
  <div class="lottery-round-number-wrapper">
    <span :class="getNumClassIndex(lotteryNumber)">{{lotteryNumber}}</span>  
  </div>
</template>

<script>

const numberClassList = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

export default {
  name: 'LotteryRoundNumber',
  props: {
      lotteryNumber: {
          type: String,
          required: true
      }
  },
  methods: {
    getNumClassIndex(num) {
       let index = Number(num);
       return numberClassList[index - 1];
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/styles/lottery-number.less';

.lottery-round-number-wrapper {
  .lottery-number(24px,5px 0 5px 0,0 2px,#fff)
}
</style>

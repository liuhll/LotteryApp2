<template>
  <div class="lottery-item-wrapper">
    <div class="item-extra">
      <div class="item-period">
        <span>{{lotteryData.period}}</span>
      </div>
      <div class="item-date">
        <span class="date-text">{{lotteryDate}}</span>
        <span class="time-text">{{lotteryTime}}</span>
      </div>
      <div class="clear"></div>
    </div>
        <div class="lottery-number-area">
          <lottery-round-number v-for="(item,index) in LotteryNumbers" 
          :lotteryNumber="item" 
          :numberCount="numberCount" 
          v-bind:key>
          </lottery-round-number> 
          <div class="clear"></div>
        </div> 
  </div>
</template>

<script>
import LotteryRoundNumber from '@/components/lottery-round-number'
export default {
  props: {
      lotteryData: {
          type: Object
      }
  },
  components: {
    LotteryRoundNumber
  },
  computed: {
    lotteryDate() {
      const lotteryDate = this.lotteryData.lotteryTime.split('T');
      return lotteryDate[0];
    },
    lotteryTime() {
      const lotteryDate = this.lotteryData.lotteryTime.split('T');
      return lotteryDate[1];
    },
    LotteryNumbers() {
      return this.lotteryData.data.split(',');
    },
    numberCount() {
      const numberCount = this.lotteryData.data.split(',').length;
      return numberCount;
    }
  }
}
</script>

<style lang="less" scoped>
.lottery-item-wrapper {
  padding :5px 10px;
  text-align :left;
  border-bottom: 1px solid #f0f0f0;
}
.lottery-item-wrapper .item-extra {
  height :25px;
  line-height :25px;
  font-size :13px;
  font-weight :500px;
}
.lottery-item-wrapper .item-extra .item-period {
  float :left;
  padding-left :2px;
}
.lottery-item-wrapper .item-extra .item-date {
  float :right; 
}
.lottery-item-wrapper .item-extra .item-date span {
  display :inline-block;
}
.lottery-item-wrapper .item-extra .item-date .date-text {
  padding-right :3px;
}
.lottery-item-wrapper .item-extra .item-date .time-text {
  padding-right :20px
}

.lottery-item-wrapper .lottery-number-area {
  height :30px;
  line-height :30px;
}

.clear {
  clear: both;
}

</style>

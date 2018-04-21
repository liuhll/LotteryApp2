<template>
  <div class="lt-run-wrapper">
    <div class="lottery-cell">第{{finalLotteryData.period}}期开奖结果</div>
    <div class="lottery-number-area">
        <lottery-round-number v-for="(item,index) in LotteryNumbers" 
        :lotteryNumber="item" 
        :numberCount="numberCount" 
        v-bind:key>
        </lottery-round-number> 
        <div class="clear"></div>
    </div> 
    <div class="lottery-next-period-wrapper">
       <span class="lottery-cell">距离第{{finalLotteryData.nextPeriod}}开奖剩余:</span>
       <!-- <span class="lottery-next-time" :remianSeconds="remianSeconds">{{remianTime}}</span> -->
       <clocker v-if="!isRunning" :time="nextLotteryTime" v-on:on-finish="onLotteryData">
          <span class="time">%_H1%_H2</span>
          <span class="time">:</span>
          <span class="time">%_M1%_M2</span>
          <span class="time">:</span>
          <span class="time">%_S1%_S2</span>        
       </clocker>
       <span v-if="isRunning" class="lottery-next-time">开奖中,请稍等...</span>
    </div>
  </div>
</template>

<script>
import { convertToTime } from "@/utils/time";
import LotteryRoundNumber from "@/components/lottery-round-number";
import { setTimeout } from 'timers';
import { Clocker } from "vux";
import { formatDate } from "@/utils/time";

export default {
  data() {
    return {
      finalLotteryData: {},
      nextLotteryTime: null,
      isRunning: false,
      isShowHour: true
    };
  },
  components: {
    LotteryRoundNumber,
    Clocker
  },
  created() {
    this.getFinalLotteryData(false);
    // document.addEventListener('visibilitychange',this.onVisibilityChange)
  },
  methods: {
    getFinalLotteryData(isNew) {
      // const self = this;
      this.$vux.loading.show('开奖中...');
      if (this && !this._isDestroyed) {
        this.$store.dispatch("GetFinallotterydata").then(result => {
          this.finalLotteryData = result;
          if (result.isLotteryData) {
             this.$vux.loading.show('计算中...');
            // self.remianSeconds = result.remainSeconds
            this.nextLotteryTime = this.formatDate(result.nextLotteryTime);
            this.timeDiff(result.nextLotteryTime);
            this.$emit("lotterydata", true);
            this.isRunning = false;
            this.$vux.loading.hide();
          } else {
            this.isRunning = true;
            this.isShowHour = false;
            setTimeout(this.getFinalLotteryData, 2000, isNew);
          }
        });
      }
    },
    onLotteryData() {
      this.getFinalLotteryData(true);
      this.isRunning = true;
    },
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
    timeDiff(nextLotteryTime) {
      let diffMintue = parseInt(
        (new Date(nextLotteryTime) - new Date()) / 1000 / 60
      );
      if (diffMintue >= 60) {
        this.isShowHour = true;
      } else {
        this.isShowHour = false;
      }
    }
  },
  computed: {
    remianTime() {
      if (this.finalLotteryData.isLotteryData) {
        return convertToTime(this.remianSeconds);
      } else {
        return "开奖中...";
      }
    },
    LotteryNumbers() {
      if (this.finalLotteryData.data) {
        const lotteryDatas = this.finalLotteryData.data.split(",");
        return lotteryDatas;
      }
      return [];
    },
    numberCount() {
      return this.LotteryNumbers.length;
    }
  }
};
</script>


<style lang="less" scoped>
.lt-run-wrapper {
  height: 80px;
  width: 100%;
  padding: 0 5px;
  position: fixed;
  background-color: #f4f4f4;
}

.lottery-number-area {
  width: 100%;
  padding: 2px 0 0 8px;
}

.lottery-cell {
  padding: 2px 0 1px 8px;
  line-height: 22px;
  font-weight: 500;
  font-size: 12px;
  color: #ff5500;
}

.lottery-next-time {
  display: inline-block;
  background-color: #ea0000;
  margin-left: 10px;
  width: 120px;
  height: 20px;
  line-height: 20px;
  vertical-align: middle;
  border-radius: 20px;
  text-align: center;
  font-size: 10px;
  color: #fff;
}

.time {
  background-color: #ea0000;
  color: #fff;
  text-align: center;
  display: inline-block;
  padding: 0 2px;
  border-radius: 3px;
}

.clear {
  clear: both;
}
</style>

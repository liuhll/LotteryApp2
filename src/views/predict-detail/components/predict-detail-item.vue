<template>
   <div class="plan-detail-content-wrapper">
    <div class="lottery-area">
      <div class="lottery-current-text">
        <span>第{{predictDetailData.finalLotteryData.period}}期开奖</span>
        <span class="btn-change-norm">更改指标</span>
        <div class="clear"></div>
      </div>
  	    <div class="lottery-number-area">
          <lottery-round-number v-for="(item,index) in lotteryNumbers" 
          :lotteryNumber="item" 
          :numberCount="numberCount" 
          v-bind:key>
          </lottery-round-number> 
          <div class="clear"></div>
      </div>
  	  <div class="lottery-predict-wrapper">
        <div class="lottery-predict-info">
         <span class="lottery-predict-periods">{{currentPredictPreiod}}</span>
         <span class="lottery-predict-text">预</span>
         <span class="lottery-predict-number">{{currentPredictData}}</span>
  	    </div>
      <div class="lottery-time-wrapper">
        <span class="lottery-small-period">{{currentSmallPeriod}}</span>
        <span class="lottery-next-period">{{nextPeriod}}期</span>
        <!-- <span class="lottery-next-time" :remainSeconds="remainSeconds">{{remianTime}}</span> -->
        <clocker v-if="!isRunning" :time="nextLotteryTime" >
          <span v-if="!isRunning&&isShowHour" class="time">%_H1%_H2</span>
          <span v-if="!isRunning&&isShowHour" class="time">:</span>
          <span class="time">%_M1%_M2</span>
          <span class="time">:</span>
          <span class="time">%_S1%_S2</span>        
       </clocker>
       <span v-if="isRunning" class="lottery-next-time">开奖中,请稍等...</span>
      </div>
      <div class="clear"></div>
    </div>   
  </div>
  <div class="content-statistic-area" ref="statisticArea">
      <div class="statistic-wrapper">
          <span class="statistic-title">当前成绩</span>
          <span class="statistic-value">{{ predictData.statisticData.currentScore | precent  }}</span>
      </div>
      <div class="statistic-wrapper">
          <span class="statistic-title">最大连对</span>
          <span class="statistic-value">{{ predictData.statisticData.maxSerieRight }}</span>
      </div>
      <div class="statistic-wrapper">
          <span class="statistic-title">最大连错</span>
          <span class="statistic-value">{{ predictData.statisticData.maxSerieError }}</span>
      </div>
      <div class="statistic-wrapper">
          <span class="statistic-title">当前连对/错</span>
          <span class="statistic-value">{{ predictData.statisticData.currentSerie }}</span>
      </div>
      <div class="statistic-wrapper" v-for="(item,index) in predictData.statisticData.minorCycleStatistic">
          <span class="statistic-title">第{{index}}期中</span>
          <span class="statistic-value">{{ item  }}</span>
          <span class="statistic-title">次</span>
      </div>
      <div class="clear"></div>
  </div>
   <scroller lock-x :height="detailHeight">
     <div class="box">
        <cell-box v-for="(item,index) in predictData.historyPredictDatas" class="predict-history-item">
            <div class="item-row first-row">
              <span class="predict-periods">{{item.startPeriod | smallPeriod}}-{{item.endPeriod | smallPeriod}}期</span>
              <span class="predict-text">{{item.predictType | predictType}}</span>
              <span class="predict-type">预</span>
              <span class="predict-numbers">{{item.predictedData | displayData}}</span>
            </div>  
            <div class="item-row second-row">
              <div class="second-row-left">
                 <span class="predict-score">成绩 {{item.currentScore | precent}}</span>
              </div>
              <div class="second-row-right">
                <span class="predict-small-period">{{item.minorCycle}}</span>
                <span class="predict-period">{{item.currentPredictPeriod | smallPeriod}}期</span>
                <span class="predict-open">开</span>
                <span class="lottery-numbers">{{item.lotteryData | displayData}}</span>
                <span class="predicted-result" :class="predictedResult(item.predictedResult)">{{item.predictedResult | predictedResult}}</span>
              </div>
              <div class="clear"></div>
            </div>             
        </cell-box>
     </div>
   </scroller>

</div>
</template>

<script>
import { convertToTime } from "@/utils/time";
import LotteryRoundNumber from "@/components/lottery-round-number";
import { Scroller, LoadMore, CellBox, Clocker } from "vux";
import { formatDate } from "@/utils/time";
export default {
  props: {
    predictDetailData: {
      type: Object,
      required: true
    }
  },
  components: {
    LotteryRoundNumber,
    Scroller,
    LoadMore,
    CellBox,
    Clocker
  },
  data() {
    return {
      remainSeconds: 0,
      predictData: {},
      nextLotteryTime: null,
      isRunning: false,
      isShowHour: true
    };
  },
  created() {
    this.remainSeconds = this.predictDetailData.finalLotteryData.remainSeconds;
    this.predictData = this.predictDetailData;
    this.nextLotteryTime = this.formatDate(
      this.predictDetailData.finalLotteryData.nextLotteryTime
    );
    this.getPredictDetailData();
    // document.addEventListener('visibilitychange',this.onVisibilityChange)
  },
  computed: {
    lotteryNumbers() {
      return this.predictData.finalLotteryData.data.split(",");
    },
    numberCount() {
      return this.predictData.finalLotteryData.data.split(",").length;
    },
    currentPredictPreiod() {
      const currentPredictData = this.predictData.currentPredictData;
      const startPeriod = currentPredictData.startPeriod
        .toString()
        .substr(currentPredictData.startPeriod.toString().length - 3, 3);
      const endPeriod = currentPredictData.endPeriod
        .toString()
        .substr(currentPredictData.endPeriod.toString().length - 3, 3);
      return `${startPeriod}期-${endPeriod}期`;
    },
    currentPredictData() {
      return this.predictData.currentPredictData.predictedData.replace(
        /,/g,
        " "
      );
    },
    currentSmallPeriod() {
      return this.predictData.currentPredictData.minorCycle;
    },
    nextPeriod() {
      const nextPeriod = this.predictData.finalLotteryData.nextPeriod.toString();
      return nextPeriod.substr(nextPeriod.length - 3, 3);
    },
    remianTime() {
      if (this.remainSeconds > 0) {
        return convertToTime(this.remainSeconds);
      } else {
        return "开奖中...";
      }
    },
    detailHeight() {
      const h =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      let count =
        Object.keys(this.predictData.statisticData.minorCycleStatistic).length %
        4;
      count = Math.ceil(count) + 1;
      const fixedH = 225 + 30 * count;
      let height = h - fixedH;
      return height + "px";
    }
  },
  methods: {
    getPredictDetailData() {
      const self = this;
      if (self && !self._isDestroyed) {
        self.$store
          .dispatch("GetPredictDetailData", self.predictData.normId)
          .then(result => {
            if (result.finalLotteryData.isLotteryData) {
              self.predictData = result;
              self.nextLotteryTime = self.formatDate(
                result.finalLotteryData.nextLotteryTime
              ); //result.finalLotteryData.remainSeconds;
            } else {
              setTimeout(self.getPredictDetailData, 2000);
            }
          });
      }
    },
    predictedResult(predictedResult) {
      if (predictedResult === 0) {
        return "right";
      }
      return "error";
    },
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  filters: {
    precent(value) {
      const precentVal = value * 100;
      return precentVal + "%";
    },
    smallPeriod(value) {
      let periodStr = value.toString();
      return periodStr.substr(periodStr.length - 3, 3);
    },
    predictType(value) {
      if (value === 1) {
        return "定";
      }
      return "杀";
    },
    displayData(value) {
      return value.replace(/,/g, " ");
    },
    predictedResult(value) {
      if (value === 0) {
        return "对";
      }
      return "错";
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../../src/assets/styles/circle.less";
.plan-detail-content-wrapper {
  text-align: left;
  width: 100%;
  font-size: 12px;
  color: #7e8c8d;
}
.plan-detail-content-wrapper .lottery-area {
  padding: 12px 10px 10px 8px;
  background: #fbfbfb;
  width: 100%;
}
.lottery-current-text {
  font-size: 12px;
  margin-bottom: 10px;
  color: #5b5b5b;
}
.lottery-current-text span {
  line-height: 16px;
}
.btn-change-norm {
  display: inline-block;
  background-color: #ea0000;
  width: 80px;
  height: 20px;
  line-height: 20px;
  vertical-align: middle;
  border-radius: 20px;
  text-align: center;
  font-size: 10px;
  color: #fff;
  float: right;
  margin-right: 20px;
}
.lottery-predict-wrapper {
  margin-top: 10px;
}
.lottery-predict-info {
  float: left;
}
.lottery-predict-periods {
  color: #5b5b5b;
  height: 24px;
  line-height: 24px;
}
.lottery-predict-text {
  color: #ea0000;
  margin: 0 8px;
}
.lottery-predict-number {
  color: #ea0000;
}
.lottery-time-wrapper {
  float: right;
  margin-right: 20px;
}
.lottery-time-wrapper span {
  height: 24px;
  line-height: 24px;
  display: inline-block;
}
.lottery-small-period {
  width: 16px;
  height: 16px !important;
  line-height: 16px !important;
  text-align: center;
  color: #4a4aff;
  border: 1px solid #4a4aff;
  border-radius: 50%;
}
.lottery-next-period {
  margin: 0 10px;
  color: #5b5b5b;
}
.lottery-next-time {
  display: inline-block;
  background-color: #ea0000;
  width: 80px;
  height: 20px;
  line-height: 20px;
  vertical-align: middle;
  border-radius: 20px;
  text-align: center;
  font-size: 10px;
  color: #fff;
}
.content-statistic-area {
  padding: 3px 5px;
  padding-right: 10px;
  background: #ffecec;
}
.statistic-wrapper {
  float: left;
  padding: 4px 5px 4px 5px;
  height: 18px;
  line-height: 18px;
}
.statistic-title {
  color: #7e8c8d;
}
.statistic-value {
  color: #ce0000;
}
.predict-history-item {
  padding: 10px 5px;
  display: block !important;
}
.item-row {
  padding: 3px 0;
  height: 18px;
  line-height: 18px;
}
.item-row span {
  display: inline-block;
  padding: 0 2px;
}
.item-row .predict-text {
  color: #4a4aff;
}
.item-row .predict-type {
  .circle(10px,#ef1410,#ef1410,3px);
}
.item-row .predict-numbers {
  color: #00e3e3;
}
.item-row .predict-small-period {
  .circle(10px,#ef1410,#ef1410,3px);
}
.item-row .predict-open {
  color: #4a4aff;
}
.predict-score {
}
.second-row-left {
  float: left;
}
.second-row-right {
  float: right;
}

.right {
  color: #37af83;
}
.error {
  color: #ea0000;
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

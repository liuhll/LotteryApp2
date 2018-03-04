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
       <span class="lottery-next-time" :remianSeconds="remianSeconds">{{remianTime}}</span>
    </div>
  </div>
</template>

<script>
import { convertToTime } from '@/utils/time';
import LotteryRoundNumber from '@/components/lottery-round-number'
import { setTimeout } from 'timers';

export default {
  data() {
      return {
        finalLotteryData: {},
        remianSeconds: 0,
        countdownTimeOut: null
      }
  },
  components: {
    LotteryRoundNumber
  },
  created() {
    this.getFinalLotteryData();
    this.$emit('lotterydata', true);
    document.addEventListener('visibilitychange',this.onVisibilityChange)
  },
  methods: {
    getFinalLotteryData(needClearCountdownTimeOut) {  
      const self = this;
      if (self && !self._isDestroyed) {
        self.$store.dispatch('GetFinallotterydata').then(result => {
        self.finalLotteryData = result;    
        if(result.isLotteryData) {           
            self.remianSeconds = result.remainSeconds;       
            if (needClearCountdownTimeOut && self.countdownTimeOut) {
               self.$emit('lotterydata', true); 
               clearTimeout(self.countdownTimeOut);
               return;
            }
            self.nextLotteryCountdown();
            self.$emit('lotterydata', false);
        } else {
           setTimeout(self.getFinalLotteryData, 3000,needClearCountdownTimeOut);
           if (needClearCountdownTimeOut && self.countdownTimeOut) {
              clearTimeout(self.countdownTimeOut);
              return;
           }
        }        
      });
      }
     
    },
    nextLotteryCountdown() {
        const self = this;
        if (self && !self._isDestroyed) {
            if (self.remianSeconds > 0) {
                self.remianSeconds = self.remianSeconds - 1;
                self.countdownTimeOut = setTimeout(self.nextLotteryCountdown, 1000);
            } else {
                self.getFinalLotteryData()
            }
            
        }
    },
    onVisibilityChange() {
        this.getFinalLotteryData(true);
    }
  },
  computed: {
    remianTime() {
        if (this.finalLotteryData.isLotteryData) {
            return convertToTime(this.remianSeconds);
        } else {
            return '开奖中...';
        }
        
    },
    LotteryNumbers() {    
        if (this.finalLotteryData.data) {        
          const lotteryDatas = this.finalLotteryData.data.split(',');
          return lotteryDatas;
        } 
        return [];
    },
    numberCount() {
       return this.LotteryNumbers.length;
    }
  }
  
}
</script>


<style lang="less" scoped>
.lt-run-wrapper {
    height: 80px;
    width: 100%;
    padding: 0 5px;
    position: fixed;
    background-color: #f4f4f4
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
    color: #ff5500
}

.lottery-next-time {
  display :inline-block;
  background-color :#EA0000;
  margin-left :10px;
  width :80px;
  height :20px;
  line-height :20px;
  vertical-align: middle;
  border-radius: 20px;
  text-align :center;
  font-size :10px;
  color :#fff;

}

.clear {
    clear: both;
}
</style>

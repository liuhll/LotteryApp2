<template>
  <div class="lt-run-wrapper">
    <div class="lottery-cell">第{{finalLotteryData.period}}期开奖结果</div>
    <div class="lottery-number-area">
        <div> {{finalLotteryData.data}}</div>
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
        remianSeconds: 0
      }
  },
  components: {
    LotteryRoundNumber
  },
  created() {
    this.getFinalLotteryData();
    
  },
  methods: {
    getFinalLotteryData() {
      let self = this;
      if (self && !self._isDestroyed) {
        self.$store.dispatch("GetFinallotterydata").then(result => {
        self.finalLotteryData = result;    
        if(result.isLotteryData) {           
            self.remianSeconds = result.remainSeconds;
            self.nextLotteryCountdown();
        } else {
            setTimeout(self.getFinalLotteryData,3000);
        }        
      });
      }
     
    },
    nextLotteryCountdown() {
        let self = this;
        if (self && !self._isDestroyed) {
            if (self.remianSeconds > 0) {
                self.remianSeconds = self.remianSeconds - 1;
                setTimeout(self.nextLotteryCountdown,1000);
            } else {
                self.getFinalLotteryData()
            }
            
        }
    }
  },
  computed: {
    remianTime() {
        if (this.finalLotteryData.isLotteryData) {
            return convertToTime(this.remianSeconds)
        } else {
            return "开奖中,请稍等..."
        }
        
    }
  }
  
}
</script>


<style lang="less" scoped>
.lt-run-wrapper {
    height: 70px;
    width: 100%;
    position: fixed;
}
</style>

<template>
<cell-box class="track-plan-wrapper">
   <div class="trank-row">
      <div class="plan-name trank-first-left">
          <img src="../../assets/images/plan-track.svg" width="14" height="14" alt="计划追号"/>
          <span>{{trackingData.planName}}</span>
      </div>
      <div class="track-list-wrapper trank-first-right">
          <div class="track-list">
            <span v-for="(item,index) in trackingData.historyPredictResults"
            :key="index"
            :class="currentPredictResult(item)"></span>
            <div class="track-percent">{{currentScore}}</div>
          </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="trank-row">
        <div class="track-plan trank-second-left">
           <span class="tranck-period">{{tranckPeriod}}</span>
           <span class="tranck-minor-period">{{trackingData.minorCycle}}</span>
           <span class="prediction-type">{{predictType}}</span>
           <span class="tranck-number">{{predictData}}</span>
        </div>
        <div class="track-plan-option trank-second-right">
          <span @click="planNorm()">指标</span>
          <span @click="switchFormula()">切换</span>
          <span @click="planDetail()">详情</span>
        </div>
        <div class="clear"></div>
    </div> 
</cell-box>
</template>

<script>
import { Group, CellBox } from 'vux';
import { readSync } from 'fs';

export default {
  props: {
    trackingData: {
        type: Object,
        required: true
    }  
  },
  components: {
      Group,
      CellBox
  },
  methods: {
    currentPredictResult(item) {
        if (item === 0) {
            return 'right';
        }
        return 'error';
    },
    planDetail() {
      this.$router.push({ name: 'predictdetail', params: { normId: this.trackingData.normId }});
    },
    planNorm() {
         this.$router.push({ name: 'plannorm', params: { planId: this.trackingData.planId }});
    },
    switchFormula() {        
        const _this = this
        _this.$emit('onSwitchPlanFormula', _this.trackingData.normId)
    }
  },
  computed: {
    tranckPeriod() {
        const startPeriod = this.trackingData.startPeriod.toString();
        const endPeriod = this.trackingData.endPeriod.toString();
        const periodNameStr = startPeriod.substr(startPeriod.length - 3,3) + '期-' + endPeriod.substr(endPeriod.length - 3,3) + '期';        
        return periodNameStr;
    },
    predictType() {
       if (this.trackingData.predictType == 1) {
           return '定'
       }
       return '杀'
    },
    currentScore() {
        const score = this.trackingData.currentScore * 100;
        return `${score}%`
    },
    predictData() {
        return this.trackingData.predictData.replace(/,/g,' ');
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/styles/lottery-number.less';

.track-plan-wrapper {
    height: auto!important;
    text-align: left;
    padding: 4px;
    display: block !important;
}
.trank-row {
    height: auto!important;
    line-height: auto!important;
    width: 100%;
}
.trank-row .plan-name {
    padding : 2px 0 2px 5px;

}
.trank-row .plan-name img {
    vertical-align :middle
}
.trank-row .plan-name span {
    margin-left :3px;
    font-size: 13px;
    font-weight :444;
    line-height :13px;
    vertical-align :middle;
}
.trank-row .track-list-wrapper span {
   display :inline-block;
   height :6px;
   width: 6px;
   margin: 0 1px;
   line-height: 25px;
   vertical-align: middle;
   
}

.right {
    background: #37AF83;
}
.error {
    background: #EA0000;
}

.trank-row .trank-first-left {
    float: left;
}

.trank-row .trank-first-right {
    float: right;
}
.trank-row .trank-first-right .track-percent {
    display :inline-block;
    margin-left :3px;
    margin-right :3px;
    line-height :25px;
}

.trank-row .trank-second-left {
    float: left;
    padding-top: 3px;
}
.trank-row .trank-second-left .tranck-period {
    padding: 3px;
    font-size: 13px;
    line-height: 25px;
}
.trank-row .trank-second-left .tranck-minor-period {
    width :9px;
    height :9px;
    line-height :9px;
    display :inline-block;
    border :1px solid #007ACC;
    border-radius :50%;
    padding :3px;
    color : #007ACC;
    text-align: center;
    font-size: 8px;
    vertical-align :middle;
    
}

.trank-row .trank-second-left .prediction-type {
    width :9px;
    height :9px;
    line-height :9px;
    display :inline-block;
    border :1px solid #E10601;
    border-radius :30%;
    padding :3px;
    color : #E10601;
    text-align: center;
    font-size: 8px;
    vertical-align :middle;
}

.trank-row .trank-second-left .tranck-number {
  margin-left: 4px;
  font-size :14px;
  color :#00e3e3;
  line-height :25px;
}

.trank-row .trank-second-right {
    float: right;
    margin-right: 5px;
}

.trank-row .trank-second-right span {
    width :38px;
    height :20px;
    display :inline-block;
    line-height :20px;
    vertical-align: middle;
    border-radius :20px;
    background-color :#EA0000;
    text-align :center;
    margin-left :2px;
    font-size :10px;
    color :#fff;
}
.trank-row .trank-second-right span:active {
    background-color :#AE0000;
    color :#ffff37;
}
    
.clear {
    clear: both;
}


</style>

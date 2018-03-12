<template>
  <div class="norm-container">
    <group title="计划配置">
      <x-input title="定码个数" v-model="forecastCount"></x-input>
      <x-input title="计划周期" v-model="planCycle"></x-input>
      <selector v-model="lookupPeriodCount" title="可查看期数" :options="periodsList" @on-change="onChange"></selector>
    </group>
    <group title="指标配置">
      <x-input title="偏差周期" v-model="unitHistoryCount"></x-input>
      <div class="norm-wrapper weui-cell">
        <span class="norm-text">期望连对</span>
        <vue-slider class="norm-slider" ref="slider1" v-model="rightSilder.value" :min="0" :max="10" width="60%"></vue-slider>
      </div>
      <div class="norm-wrapper weui-cell">
        <span class="norm-text">期望连错</span>
        <vue-slider class="norm-slider" ref="slide2" v-model="errorSilder.value" :min="0" :max="10" width="60%"></vue-slider>
      </div>
       <div class="norm-wrapper weui-cell">
        <span class="norm-text">期望成绩</span>
        <vue-slider class="norm-slider" ref="slider3" v-model="expectScoreSilder.value" :min="0" :max="100" width="60%"></vue-slider>
      </div>
    </group>
   <group title="说明">
      <cell-box primary="content">
        <div class="memo-text">- 基础指标用于切换/选择计划时，为该计划设置默认的指标因子,如果你需要为某个具体的计划调整指标,请通过"计划详情"--"调整指标"来更改该计划的指标;</div>
        <div class="memo-text">- 彩票计算引擎会通过用户定义的指标因子计算出最优的公式用于计划追号</div> 
      </cell-box>
   </group>
    <box gap="10px 10px">
      <x-button type="primary" action-type="button"  @click.native="saveBasicNorm()">保存</x-button>
    </box>
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell, CellBox, Selector, Box } from 'vux'
import VueSlider from 'vue-slider-component';
import { debug } from 'util';
export default {
  components: {
    XInput,
    XButton,
    Group,
    Cell,
    CellBox,
    Box,
    Selector,
    VueSlider
  },
  data() {
    return {
      planCycle: 0,
      forecastCount: 0,
      unitHistoryCount: 0,
      rightSilder: {
        valueRange: [
          0,10
        ],
        value: [

        ]
      },
      errorSilder: {
        valueRange: [
          0,10
        ],
        value: [

        ]
      },
      expectScoreSilder: {
        valueRange: [
          0,100
        ],
        value: [

        ]
      },
      lookupPeriodCount: 0,
      periodsList: [
        10,
        20,
        30,
        40,
        50
      ]
    }
  },
  created() {
    this.getUserDefaultNorm();
  },
  methods: {
    onChange() {
      
    },
    getUserDefaultNorm() {
      this.$store.dispatch('GetUserNromDefaultConfig').then(result => {
        this.rightSilder.value.push(result.minRightSeries); //result.minRightSeries
        this.rightSilder.value.push(result.maxRightSeries); //result.maxRightSeries
        this.errorSilder.value.push(result.minErrortSeries);
        this.errorSilder.value.push(result.maxErrortSeries);
        this.expectScoreSilder.value.push(result.expectMinScore);
        this.expectScoreSilder.value.push(result.expectMaxScore);
        this.planCycle = result.planCycle;
        this.forecastCount = result.forecastCount;
        this.unitHistoryCount = result.unitHistoryCount;
        this.lookupPeriodCount = result.lookupPeriodCount;
      });
    },
    saveBasicNorm() {
      let basicNorm = {
        forecastCount: this.forecastCount,
        planCycle: this.planCycle,
        unitHistoryCount: this.unitHistoryCount,
        minRightSeries: this.rightSilder.value[0],
        maxRightSeries: this.rightSilder.value[1],
        minErrortSeries: this.errorSilder.value[0],
        maxErrortSeries: this.errorSilder.value[1],
        lookupPeriodCount: this.lookupPeriodCount,
        expectMinScore: this.expectScoreSilder.value[0],
        expectMaxScore: this.expectScoreSilder.value[1]
      };
      this.$store.dispatch("UpdateUserNromDefaultConfig", basicNorm).then(result => { 
         debugger
      }).catch(error => {
        
      });
    }
  }
}
</script>

<style lang="less">
.app-main {
  margin-bottom:10px;
  width: 100%!important;
}
.norm-container {
  position: relative;
  width: 100%!important;
}
.weui-cell {
  padding: 5px 8px!important;
}
.norm-wrapper {
  display: block !important;
  padding: 6px 8px!important;
  
}
.weui-label {
  font-size: 14px;
  color: #000;
}
.norm-text {
  display: inline-block;
  width: 35%;
  text-align: left;
  font-size: 14px;
  color: #000;
}
.norm-slider {
  display: inline-block;
}
.vux-cell-box {
  display: block!important;
}
.vue-slider-tooltip {
  font-size: 8px!important;
} 
.memo-text {
  font-size: 8px;
  margin: 5px;
  color: #888;

}
</style>

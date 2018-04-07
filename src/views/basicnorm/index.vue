<template>
  <div class="norm-container">
    <group title="计划配置">
      <selector title="定码个数" v-model="forecastCount" :options="forecastCounts"></selector>
      <selector title="计划周期" v-model="planCycle" :options="planCycles"></selector>
      <selector v-model="lookupPeriodCount" title="完成周期" :options="periodsList" @on-change="onChange"></selector>
    </group>
    <group title="指标配置">
      <x-input title="基础数据" required type="number" ref="historyCount" :is-type="historyCountValid" v-model="historyCount" @on-change="onChange"></x-input>
      <x-input title="偏差数据" required type="number" ref="unitHistoryCount" :is-type="unitHistoryCountValid" v-model="unitHistoryCount" @on-change="onChange"></x-input>
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
        <div class="memo-text">- 基础指标不作用于某个具体的指标,仅在切换计划时，为某个具体计划的设置默认指标值;</div>
        <div class="memo-text">- 如果你需要为某个具体的计划调整指标,请通过"计划详情"--"调整指标"来更改该计划的指标;</div>
      </cell-box>
   </group>
    <box gap="10px 10px">
      <x-button type="primary" action-type="button"  class="basicnorm-btn" :disabled="!canSave" @click.native="saveBasicNorm()">保存</x-button>
    </box>
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell, CellBox, Selector, Box } from "vux";
import VueSlider from "vue-slider-component";
import { debug } from "util";
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
      historyCount: 0,
      canSave: false,
      forecastCounts: [],
      planCycles: [],
      rightSilder: {
        valueRange: [0, 10],
        value: []
      },
      errorSilder: {
        valueRange: [0, 10],
        value: []
      },
      expectScoreSilder: {
        valueRange: [0, 100],
        value: []
      },
      lookupPeriodCount: 0,
      periodsList: [10, 20, 30, 40, 50],
      historyCountValid: function(val) {
        let valid = true;
        let msg = "";
        if (val < 50) {
          val = false;
          msg = "基础数据周期不得小于50";
        }
        if (val > 5000) {
          val = false;
          msg = "基础数据周期不得大于5000";
        }
        return {
          valid: valid,
          msg: msg
        };
      },
      unitHistoryCountValid: function(val) {
        let valid = true;
        let msg = "";
        if (val < 50) {
          val = false;
          msg = "偏差数据周期不得小于50";
        }
        if (val > 500) {
          val = false;
          msg = "偏差数据周期不得大于500";
        }
        return {
          valid: valid,
          msg: msg
        };
      }
    };
  },
  created() {
    this.getNormPlanConfig();
    this.getUserDefaultNorm();
  },
  methods: {
    onChange() {
      const historyCountValid = this.$refs.historyCount.valid;
      const unitHistoryCountValid = this.$refs.unitHistoryCount.valid;
      if (!historyCountValid || !unitHistoryCountValid) {
        this.canSave = false;
        return;
      }
      this.canSave = true;
    },
    getNormPlanConfig() {
      this.$store.dispatch("GetNormPlanConfig").then(result => {
        this.forecastCounts = result.forecastCounts;
        this.planCycles = result.planCycles;
      })
    },
    getUserDefaultNorm() {
      this.$store.dispatch("GetUserNromDefaultConfig").then(result => {
        this.rightSilder.value.push(result.minRightSeries); //result.minRightSeries
        this.rightSilder.value.push(result.maxRightSeries); //result.maxRightSeries
        this.errorSilder.value.push(result.minErrortSeries);
        this.errorSilder.value.push(result.maxErrortSeries);
        this.expectScoreSilder.value.push(result.expectMinScore);
        this.expectScoreSilder.value.push(result.expectMaxScore);
        this.planCycle = result.planCycle;
        this.forecastCount = result.forecastCount;
        this.historyCount = result.historyCount;
        this.unitHistoryCount = result.unitHistoryCount;
        this.lookupPeriodCount = result.lookupPeriodCount;
        this.canSave = true;
      });
    },
    saveBasicNorm() {
      let basicNorm = {
        forecastCount: this.forecastCount,
        planCycle: this.planCycle,
        unitHistoryCount: this.unitHistoryCount,
        historyCount: this.historyCount,
        minRightSeries: this.rightSilder.value[0],
        maxRightSeries: this.rightSilder.value[1],
        minErrortSeries: this.errorSilder.value[0],
        maxErrortSeries: this.errorSilder.value[1],
        lookupPeriodCount: this.lookupPeriodCount,
        expectMinScore: this.expectScoreSilder.value[0],
        expectMaxScore: this.expectScoreSilder.value[1]
      };
      this.$vux.loading.show("修改中...");
      this.$store
        .dispatch("UpdateUserNromDefaultConfig", basicNorm)
        .then(result => {
          const _this = this;
          this.$vux.loading.hide();
          this.$vux.confirm.show({
            title: "修改默认指标",
            content: result,
            onCancel() {},
            onConfirm() {
              _this.$router.push({ path: "plan" });
            }
          });
        })
        .catch(error => {
          const _this = this;
          this.$vux.loading.hide();
          this.$vux.confirm.show({
            title: "修改基础指标",
            content: error.message + ",是否需要购买授权？",
            onConfirm() {
              //_this.$router.push({ path: 'plan' })
            },
            onCancel() {
              _this.$router.push({ path: "plan" });
            }
          });
        });
    }
  }
};
</script>

<style lang="less">
.app-main {
  margin-bottom: 10px;
  width: 100% !important;
}
.norm-container {
  position: relative;
  width: 100% !important;
}
.weui-cell {
  padding: 5px 8px !important;
}
.norm-wrapper {
  display: block !important;
  padding: 6px 8px !important;
}
.weui-label {
  font-size: 14px;
  color: #000;
}
.weui-select {
  height: 22px !important;
  line-height: 22px !important;
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
  display: block !important;
}
.vue-slider-tooltip {
  font-size: 8px !important;
}
.memo-text {
  font-size: 11px;
  margin: 5px;
  color: #888;
}
.basicnorm-btn {
  background-color: rgb(225, 6, 1) !important;
}
</style>

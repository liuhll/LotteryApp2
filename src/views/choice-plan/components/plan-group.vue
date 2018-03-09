<template>
  <div class="plan-group-wrapper">
     <div class="group-title">{{planGroup.groupName}}</div>
     <div class="plan-item-list">
       <checker
       type="checkbox"
       v-model="selectPlans"
       default-item-class="plan-item"
       selected-item-class="plan-item-selected"
       >
        <checker-item
        v-for="(item,index) in planInfos"
        :key="index"
        :value="item"
        @on-item-click="planItemClick"
        >
        {{item.planName}}
        </checker-item>
       </checker>
     </div>
  </div>
</template>

<script>
import * as  _ from 'lodash'
import { Checker, CheckerItem } from 'vux'
import { fail } from 'assert';
export default {
  props: {
      planGroup: {
        type: Object
      }
  },
  components: {
      Checker,
      CheckerItem
  },
  computed: {
    planInfos() {
      return this.planGroup.planInfos;
    },
    selectPlans: {
      get: function() {
        let selectPlans = [];
        this.planGroup.planInfos.forEach(plan => {
          if (plan.isSelected) {
            selectPlans.push(plan);
          }
        });
        return selectPlans;
      },
      set: function(val) {

      }
    }
  },
  methods: {
    planItemClick(item) {
      if(item.isSelected) {
        item.isSelected = false;
        const removeItem = this.$store.state.lotterydata.selectPlans.find(n => n.id === item.id);
        removeItem.isSelected = false;
        var index = this.$store.state.lotterydata.selectPlans.indexOf(removeItem);
        if (index > -1) {
          this.$store.state.lotterydata.selectPlans.splice(index,1);
        }

      }else {
        this.$store.state.lotterydata.selectPlans.push(item)
        item.isSelected = true;
      }
      this.$emit('adjustHeight')
    }
  }
}
</script>

<style lang="less" scoped>
.group-title {
  font: 500;
  font-size: 14px;
  color: #ff4a00;
  height: 16px;
  line-height: 16px;
  padding: 5px 10px;
}
</style>

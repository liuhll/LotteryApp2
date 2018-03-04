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
      }else {
         item.isSelected = true;
      }
     
    }
  }
}
</script>

<template>
  <div class="userplan-container">
      <div class="user-plan-row">
          <div>已选计划</div>
          <div class="delete-all-plan"></div>
      </div>
      <checker 
      type="checkbox"
      v-model="userPlans"
      default-item-class="plan-item"
      selected-item-class="plan-item-selected"
      @on-change="userPlanChange"
      >
        <checker-item 
        v-for="(item,index) in userPlans" 
        :key="index"
        :value="item"
        @on-item-click="userPlanItemClick"              
        >
        {{item.planName}}
        </checker-item>
      </checker>
  </div>
</template>

<script>
import { Checker, CheckerItem } from 'vux'
export default {
  props: {
      userPlans: {
          type: Array,
          default: []
      }
  },
  components: {
      Checker,
      CheckerItem
  },
  methods: {
      userPlanChange(value) {
      },
      userPlanItemClick(itemValue,itemDisabled) {
        itemValue.isSelected = false;
        this.$emit('onRemoveSelectPlan',itemValue);
      }
  }

}
</script>

<style lang="less" scoped>

</style>
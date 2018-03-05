<template>
  <div class="choice-plan-container">
      <user-plans ref="userplans" v-on:onRemoveSelectPlan="removeSelectPlan"></user-plans>
      <all-plans :allPlans="allPlans"></all-plans>
  </div>
</template>

<script>
import UserPlans from './components/user-plans'
import AllPlans from './components/all-plans'
export default {
  components: {
      UserPlans,
      AllPlans
  },
  data() {
      return {
          allPlans: []
      }
  },
  created() {
      this.$store.dispatch('GetUserPlans').then(result => {
        this.allPlans = result.allPlanInfos;
      });
  },
  methods: {
    removeSelectPlan(planItem) {
      for(let groupIndex in this.allPlans) {
          let planInfos = this.allPlans[groupIndex].planInfos;
          for(let planIndex in planInfos) {
            let plan = planInfos[planIndex];
            if (plan.id == planItem.id) {
              this.allPlans[groupIndex].planInfos[planIndex].isSelected =  planItem.isSelected;
              break;
          }
        }
      }      
    }
  }
}
</script>

<style lang="less">
.app-main {
  margin-bottom:10px;
  width: 100%;
}
.plan-item {
  height: 22px;
  line-height: 22px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin: 2px 3px 0;
  padding: 2px 3px;
  font-size: 12px;
}
.plan-item-selected {
  background: #ffffff url(../../assets/images/checker/active.png) no-repeat right bottom;
  border-color: #ff4a00;
}
</style>

<template>
  <div class="allplan-container ">
    <div class="select-plan-text">所有计划</div>
    <scroller lock-x :height="height">
      <div class="box">
        <plan-group v-for="(item,index) in allPlans"
        :key="index"
        :planGroup="item"
        v-on:adjustHeight="adjustHeight"
        >
        </plan-group>
      </div>
    </scroller>
  </div>
</template>

<script>
import { Scroller } from 'vux'
import PlanGroup from './plan-group'
export default {
  components: {
    Scroller,
    PlanGroup
  },
  props: {
    allPlans: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      height: '500px'
    }
  },
  methods: {
    adjustHeight() {
      const h =window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      const userPlanHeight = this.$parent.$refs.userplans.$el.clientHeight;
      let h1 = h - userPlanHeight - 95;
      this.height = h1 + 'px'
    }
  },
  mounted() {
     this.adjustHeight();
  }
}
</script>

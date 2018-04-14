<template>
    <div class="tracking-number-wrapper">
      <scroller lock-x @on-scroll="onScroll"  height="88%" ref="scrollerEvent">
      <div class="box2">
        <predict-data-item v-for="(item,index) in predictDatas" :trackingData="item" :key="index">         
        </predict-data-item>
      </div>
      </scroller>
    </div>
</template>
<script>
import { Scroller } from 'vux';
import PredictDataItem from '@/components/predict-data-item';

export default {
  components: {
    Scroller,
    PredictDataItem
  },
  props: {
    predictDatas: {
      type: Array
    }
  },
  methods: {
    onScroll() {

    }  
  }  
}
</script>
<style lang="less" scoped>
.tracking-number-wrapper {
    height: 65%;
    width: 100%;
    position: fixed;
    top: 224px;    
    overflow: hidden;
}
</style>

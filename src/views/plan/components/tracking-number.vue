<template>
    <div class="tracking-number-wrapper">
      <scroller lock-x @on-scroll="onScroll"  height="100%" ref="scrollerEvent">
      <div class="box2">
        <div v-for="(item,index) in predictDatas">
          <span>{{item.predictData}}</span>
        </div>
      </div>
      </scroller>
    </div>
</template>
<script>
import { Scroller } from 'vux';

export default {
  components: {
    Scroller
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

<template>
    <div class="tracking-number-wrapper">
      <scroller lock-x @on-scroll="onScroll"  height="100%" ref="scrollerEvent">
      <div class="box2">
        <p v-for="i in 80">placeholder {{i}}</p>
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
    top: 180px;    
    background-color: red;
    overflow: hidden;

}
</style>

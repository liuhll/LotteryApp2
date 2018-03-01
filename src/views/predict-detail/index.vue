<template>
  <div>
    <tab :line-width=2 active-color='#fc378c' v-model="index">
        <tab-item class="vux-center" 
        :selected="selectedNormId === item.normId" v-for="(item, index) in predictDetailDatas" 
        @click="selectedNormId = item.normId"
        :key="index">
          {{item.planName}}
        </tab-item>
    </tab> 
    <swiper v-model="index" style="height:100%" :show-dots="false">
        <swiper-item v-for="(item, index) in predictDetailDatas" :key="index">
          <div class="tab-swiper vux-center">{{item.planName}} Container</div>
        </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
export default {
  components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem
  },
  data() {
      return {
          predictDetailDatas: [],
          selectedNormId: '',
          index: 0
      }
  },
  created() {
     this.getPredictDetailDatas();
  },
  methods: {
      getPredictDetailDatas() {
        this.$vux.loading.show('加载中...');
        this.$store.dispatch('GetPredictDetailDatas').then(result => {
        this.predictDetailDatas = result;
        this.selectedNormId = this.$route.params.normId;
        this.$vux.loading.hide();
      });   
      }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/center.less';

.app-main {
  margin-bottom:10px;
  width: 100%;
}
.tab-swiper {
  background-color: #fff;
  height: 100px;
}
</style>

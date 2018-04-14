<template>
  <div>
    <tab :line-width=3 
      :custom-bar-width="customBarWidth(index)"
      active-color='#fc378c'
      :animate="false"
      v-model="index">
        <tab-item 
        ref="tabItem"
        class="vux-center" 
        :selected="selectedNormId === item.normId" v-for="(item, index) in predictDetailDatas" 
        @click="selectedNormId = item.normId"
        :key="index">
          {{item.planName}}
        </tab-item>
    </tab> 
    <swiper v-model="index" :show-dots="false" :height="height">
        <swiper-item v-for="(item, index) in predictDetailDatas" :key="index" class="tab-swiper-container">
          <div class="tab-swiper vux-center">
            <predict-detail-item :predictDetailData="item"></predict-detail-item>
          </div>          
        </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
import PredictDetailItem from './components/predict-detail-item'

export default {
  components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      PredictDetailItem     
  },
  data() {
      return {
          predictDetailDatas: [],
          selectedNormId: '',
          index: 0,
          height: '600px'
      }
  },
  created() {
     this.getPredictDetailDatas();
     const h =window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
     this.height = (h - 95) + 'px';
  },
  methods: {
      getPredictDetailDatas() {
        this.$vux.loading.show('加载中...');
        this.$store.dispatch('GetPredictDetailDatas').then(result => {
        this.predictDetailDatas = result;
        this.selectedNormId = this.$route.params.normId;
        this.$vux.loading.hide();
      });   
      },
      customBarWidth(index) {
        if (this.$refs.tabItem) {
          let width = this.$refs.tabItem[0].$el.offsetWidth
          return width + 'px'
        }
        return "0";
      }
  }
}
</script>

<style  lang="less">
.app-main {
  margin-bottom:10px;
  width: 100%;
}
</style>

<style  lang="less" scoped>
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/center.less';

.tab-swiper-container {
  width: 100%;
  height: 100%;
}

.tab-swiper {
  background-color: #fff;
}
.lottery-number-area {
  padding: 2px 0 0 8px;
  background-color: #f4f4f4
}
</style>

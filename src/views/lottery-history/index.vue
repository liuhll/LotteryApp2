<template>
  <div class="lottery-history-wrapper">
    <history-option></history-option>
    <div class="lottery-history-container">
      <scroller lock-x height="600px"
       @on-scroll="onScroll"
       @on-scroll-bottom="onScrollBottom"
       ref="scroller">
        <div class="box">
          <lottery-history-item v-for="(item,index) in lotteryData" 
          :lotteryData="item" 
          :key="index"
          :scroll-bottom-offst="200">
          </lottery-history-item>
          <load-more tip="loading"></load-more>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
import { Scroller, LoadMore } from 'vux'
import HistoryOption from './components/history-option';
import LotteryHistoryItem from './components/lottery-history-item'
import { debug } from 'util';
export default {
  components: {
    Scroller,
    LoadMore,
    HistoryOption,
    LotteryHistoryItem
  },
  data () {
    return {
      lotteryHistory: {},
      lotteryData: [],
      scrollTop: 0,
      onFetching: false,
      currentPage: 1
    }
  },
  created() {
   
  },
  mounted () {
    this.getLotteryHistory(this.currentPage ,null);
    this.$nextTick(() => {
      this.$refs.scroller.reset({top: 0})
    })
  },
  methods: {
     onScroll (pos) {
      this.scrollTop = pos.top
    },
    onScrollBottom () {
       if (this.onFetching) {
        // do nothing
      } else { 
        this.onFetching = true;
          setTimeout(() => {
            if(this.lotteryHistory.hasNextPage) {
              this.currentPage +=1;
              this.$store.dispatch('GetHistory', this.currentPage, null).then(result => {
              this.lotteryHistory = result;
              this.lotteryData.push.apply(this.lotteryData,result.data);
            });
            this.$nextTick(() => {
             this.$refs.scroller.reset()
            })
           }            
       
          this.onFetching = false
          }, 2000);
          
      }
    },
    getLotteryHistory(pageIndex,lotteryTime) {
      this.$store.dispatch('GetHistory', pageIndex, lotteryTime).then(result => {
        this.lotteryHistory = result;
        this.lotteryData.push.apply(this.lotteryData,result.data);
      });
    }
  }
}
</script>

<style lang="less" scoped>
.app-main {
  margin-bottom:10px;
}
.lottery-history-wrapper {
  position:relative;
  top: 28px;
}

.lottery-number-area {
    width: 100%; 
    padding: 2px 0 0 8px;
    background-color: #f4f4f4
}
</style>

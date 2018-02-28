<template>
  <div class="lottery-history-wrapper">
    <history-option v-on:change-lotterydate="changeLotteryDate"></history-option>
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
      currentPage: 1,
      lotteryTime: null
    }
  },
  created() {
   
  },
  mounted () {
    this.getLotteryHistory(this.currentPage ,this.lotteryTime);
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
              const historyParams = { pageIndex: this.currentPage, historyParams:this.lotteryTime}
              this.$store.dispatch('GetHistory', historyParams).then(result => {
              this.lotteryHistory = result;
              this.lotteryData.push.apply(this.lotteryData,result.data);
            });
            this.$nextTick(() => {
              if (this.$refs.scroller)
              {
                this.$refs.scroller.reset();
              }
            })
           }            
       
          this.onFetching = false
          }, 2000);
          
      }
    },
    getLotteryHistory(pageIndex,lotteryTime) {
        const historyParams = { pageIndex: this.currentPage ,lotteryTime: lotteryTime}
        this.$store.dispatch('GetHistory', historyParams).then(result => {
        this.lotteryHistory = result;
        this.lotteryData.push.apply(this.lotteryData,result.data);
      });
    },
    changeLotteryDate(lotteryTime) {
      this.currentPage = 1; 
      this.lotteryTime = lotteryTime; 
      this.lotteryData = [];
     
      this.getLotteryHistory(this.currentPage,this.lotteryTime);
      this.$nextTick(() => {
        this.$refs.scroller.reset({top: 0})
      })
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

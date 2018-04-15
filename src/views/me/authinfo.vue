<template>
    <group title="我的授权信息">     
      <cell title="授权彩种">
         {{userAuth.lotteryName}}
      </cell>  
      <cell title="软件版本">
          {{userAuth.notes}}
      </cell>
      <cell v-if="userAuth.salesOrderNo" title="订单号">
         {{userAuth.salesOrderNo}}
      </cell>
      <cell v-if="userAuth.authTime" title="购买日期">
         {{userAuth.authTime | formatDate}}
      </cell>
      <cell  v-if="userAuth.invalidDate"  title="有效期">
          {{userAuth.invalidDate | formatDate}}
      </cell>
  </group>
</template>

<script>
import { Group, Cell } from 'vux'
import {formatDate} from '@/utils/time'
export default {
  components: {
    Group,
    Cell
  },
  data() {
      return {
          userAuth: {}
      }
  },
  created() {
       this.$vux.loading.show("加载中...")
       this.$store.dispatch("GetUserAuth").then(result => {
          this.userAuth = result
          this.$vux.loading.hide()
     
      });
  },
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date,'yyyy-MM-dd hh:mm')
      
    }
  }
}
</script>

<style lang="less">
.app-main {
  margin-bottom: 10px;
  width: 100%;
  font-size: 14px;
}

.weui-cell {
  padding: 8px 12px !important;
  font-size: 14px;
}

</style>

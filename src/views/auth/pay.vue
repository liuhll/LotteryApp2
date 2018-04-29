<template>
  <div>
      <ali-pay v-if="payinfo.isType==1" :payinfo="payinfo" :orderNo="orderNo"></ali-pay>
      <wechat-pay v-if="payinfo.isType==2" :payinfo="payinfo" :orderNo="orderNo"></wechat-pay>
  </div>
</template>


<script>
import WechatPay from './components/wechat-pay'
import AliPay from './components/alipay'
export default {
  components: {
      WechatPay,
      AliPay
  },
  data() {
      return {
          payinfo: {},
          orderNo: ''
      }
  },
  created() {
      this.payinfo = this.$route.params.payinfo,
      this.orderNo = this.$route.params.orderNo
  }
}
</script>
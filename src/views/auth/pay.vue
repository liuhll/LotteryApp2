<template>
  <div>
      <img :src="payinfo.qrCode"/>
  </div>
</template>

<script>
export default {
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

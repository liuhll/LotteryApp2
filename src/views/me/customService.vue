<template>
  <group title="在线客服">       
      <cell-box>
        QQ: 1029765111
      </cell-box>
      <cell-box>
        QQ群: 1029765111
      </cell-box>
       <cell-box>
        微信: clmeng-service
       </cell-box>
       <cell-box class="memo"><strong>备注:</strong> 请您在添加客服时，备注上您的订单号，否则我们不会通过您的申请。</cell-box>
  </group>
</template>
<script>
import { Group, CellBox } from 'vux'
export default {
  components: {
    Group,
    CellBox
  },
}
</script>

<style lang="less">
.app-main {
  margin-bottom:10px;
  width: 100%;
  font-size: 14px;
}
.weui-cells__title {
    font-size: 18px!important;
    color: #444!important;
}

</style>

<style lang="less" scoped>
.memo {
    font-size: 14px;
    display: inline-block;
}
</style>


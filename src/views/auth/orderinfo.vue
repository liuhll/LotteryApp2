<template>
  <group>
    <cell title="售价" :value="orderPriceDesc"></cell>
    <cell-form-preview :list="list"></cell-form-preview>
    <cell title="支付方式">
      <checker  radio-required default-item-class="pay-item"  v-model="isType" selected-item-class="pay-item-selected">
          <checker-item value="1">支付宝</checker-item>
          <checker-item value="2">微信</checker-item>
      </checker>
    </cell>
    <div style="padding:15px;">
      <x-button type="primary" class="pay-btn" :disabled="!canPay" @click.native="pay()">在线支付</x-button>
    </div>
  </group>
</template>

<script>
import {
  CellFormPreview,
  Group,
  Cell,
  XButton,
  Checker,
  CheckerItem
} from "vux";
import { error } from 'util';

export default {
  components: {
    CellFormPreview,
    Group,
    Cell,
    XButton,
    Checker,
    CheckerItem
  },
  data() {
    return {
      list: [],
      orderPriceDesc: "",
      orderPrice: 0,
      orderNo: "",
      isType: ""
    };
  },
  created() {
    let _this = this;
    _this.orderNo = this.$store.getters.orderNo;
     _this.$store
        .dispatch("GetOrder",_this.orderNo)
        .then(result => {
          _this.list = result.orderInfo
          _this.orderPriceDesc = "¥ " + result.orderPrice;
          _this.orderPrice = result.orderPrice;
        })
    
  },
  computed: {
    canPay() {
      return this.isType == 1 || this.isType == 2;
    }
  },
  methods: {
    pay() {
      const _this = this;
      const goodsNameInfo = _this.orderItem("GoodName");
      const salesOrderNo = _this.orderItem("SalesOrderNo");
      _this.$store
        .dispatch("Pay", {
          orderId: salesOrderNo.value,
          isType: _this.isType,
          goodsName: goodsNameInfo.value,
          price: _this.orderPrice
        })
        .then(result => {
          _this.$router.push({
            name: "pay",
            params: { payinfo: result, orderNo: salesOrderNo.value }
        });           
        }).catch(error => {
          _this.$vux.alert.show({
            title: '支付异常',
            content: error.message
          })
        });
    },
    orderItem(key) {
      let oitem = null;
      this.list.forEach(item => {
        if (item.key == key) {
          oitem = item;
        }
      });
      return oitem;
    }
  }
};
</script>

<style lang="less" scoped>
.app-main {
  margin-bottom: 10px;
  width: 100%;
  font-size: 14px;
}
.pay-btn {
  background-color: rgb(225, 6, 1) !important;
}
.pay-item {
  border: 1px solid #ececec;
  padding: 5px 15px;
  border-radius: 5px;
}
.pay-item-selected {
  border: 1px solid rgb(225, 6, 1);
  border-radius: 5px;
}
</style>

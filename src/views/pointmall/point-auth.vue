<template>
<div>
  <checklist title="授权列表" :options="goodsList"  :max="1"  @on-change="change"></checklist>
  <div style="padding:15px;">
    <x-button type="primary" class="next-step-btn" :disabled="!selectGoodsInfo" @click.native="order()">下单</x-button>
  </div>
</div>
  
</template>

<script>
import { Checklist, XButton } from "vux";
export default {
  components: {
    Checklist,
    XButton
  },
  data() {
    return {
      goodsList: [],
      selectGoodsInfo: null,
      selectGoodsName: ""
    };
  },
  created() {
    if (this.$route.params.list) {
      this.goodsList = this.$route.params.list;
    } else {
      const _this = this;
      _this.$store.dispatch("GetGoodsList", { sellType: 1 }).then(result => {
        if (result.length === 0 || result == null) {
          _this.$vux.alert.show({
            title: "积分兑换",
            content:
              "当前没有合适的积分版本可以兑换，更多积分活动，即将来临,敬请期待"
          });
          return;
        } else {
          result.forEach(item => {
            let desc = "";
            if (item.discount !== 1) {
              desc =
                "原价:" +
                toDecimal2(item.originalPrice) +
                "  折扣:" +
                item.discount +
                "  现价:" +
                item.sellPrice;
            } else {
              desc = "售价:" + item.sellPrice + "点积分";
            }
            _this.goodsList.push({
              key: item.goodsId,
              value: item.goodsName,
              inlineDesc: desc,
              discount: item.discount,
              count: item.count,
              unitPrice: item.unitPrice
            });
          });
        }
      });
    }
  },
  methods: {
    change(val, label) {
      let selectGoods = this.goodsInfo(val);
      if (!selectGoods) {
        return;
      }
      this.selectGoodsInfo = {
        goodId: selectGoods.key,
        unitPrice: selectGoods.unitPrice,
        discount: selectGoods.discount,
        count: selectGoods.count,
        sellType: 1
      };
      this.selectGoodsName = selectGoods.value;
    },
    goodsInfo(key) {
      let goodsItem = null;
      this.goodsList.forEach(item => {
        if (item.key == key) {
          goodsItem = item;
        }
      });
      return goodsItem;
    },
    order() {
      this.$vux.loading.show("下单中...");
      this.$store.dispatch("Order", this.selectGoodsInfo).then(result => {
        this.$vux.loading.hide();
        this.$router.push({
          name: "orderinfo",
          params: { orderNo: result.orderNo, sellType: 1 }
        });
      });
    }
  }
};
</script>

<style lang="less">
.app-main {
  margin-bottom: 10px;
  width: 100%;
  font-size: 14px;
}
.next-step-btn {
  background-color: rgb(225, 6, 1) !important;
}
</style>
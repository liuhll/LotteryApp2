<template>
   <div class="point-mall-container">
    <grid :cols='4'>
      <grid-item label="我的积分" @on-item-click="getMyPointInfo">
        <img slot="icon" src="../../assets/images/pointmall/mypoints.svg">
      </grid-item>    
      <grid-item :label="siged.label"  @on-item-click="onSiged">
       <img v-if="siged.enable" slot="icon" src="../../assets/images/pointmall/unsigned.svg">
       <img v-if="!siged.enable" slot="icon" src="../../assets/images/pointmall/signed.svg">
      </grid-item>        
      <grid-item label="积分记录"  @on-item-click="getMyPointRecords">
       <img slot="icon" src="../../assets/images/pointmall/pointrecord.svg">
      </grid-item>
      <grid-item label="积分兑换" @on-item-click="pointPurchase">
       <img slot="icon" src="../../assets/images/pointmall/points.svg">
      </grid-item>  
      <grid-item label="活动与公告" @on-item-click="onActivity">
       <img slot="icon" src="../../assets/images/pointmall/activity.svg">
      </grid-item>   
      <grid-item label="分享App" @on-item-click="onShare">
       <img slot="icon" src="../../assets/images/pointmall/share.svg">
      </grid-item>     
    </grid>
    <divider>{{topic.text}}</divider>
    <activity v-if="topic.index===0"></activity>
    <points-info v-if="topic.index===1" :signedInfo="signedInfo"></points-info>
    <points-record v-if="topic.index===2" :pointsRecords="pointsRecords"></points-record>
    <actionsheet v-model="shareApp.show" 
      :menus="shareApp.menus" 
      :close-on-clicking-mask="false" 
      show-cancel 
      @on-click-menu="onClickMenu">
      </actionsheet>
  </div>
</template>
<script>
import { Grid, GridItem, Divider, Actionsheet } from "vux";
import Activity from "./components/activity";
import PointsInfo from "./components/points-info";
import PointsRecord from "./components/points-record";
import { toDecimal2 } from "@/utils/numberUtil";
import { wechatConfig } from "@/api/operation";

export default {
  components: {
    Grid,
    GridItem,
    Divider,
    Activity,
    PointsInfo,
    PointsRecord,
    Actionsheet
  },
  data() {
    return {
      topic: {
        text: "积分信息",
        index: 1
      },
      siged: {
        label: "",
        enable: true
      },
      signedInfo: {},
      pointsRecords: [],
      shareApp: {
        show: false,
        menus: {
          menu1: "分享给微信好友",
          menu2: "分享到朋友圈",
          menu3: "分享给QQ好友",
          menu4: "分享到QQ空间"
        }
      }
    };
  },
  mounted() {},
  created() {
    this.$vux.loading.show("加载中...");
    this.getSignedInfo();
    this.getPointsRecord();
    wechatConfig().then(response => {
      this.$wechat.config(response.result);
    });
    this.$vux.loading.hide();
  },
  methods: {
    getSignedInfo() {
      this.$store.dispatch("GetSignedInfo").then(result => {
        this.signedInfo = result;
        if (!result.todayIsSiged) {
          this.siged.label = "签到";
          this.siged.enable = true;
        } else {
          this.siged.label = "已签到";
          this.siged.enable = false;
        }
      });
    },
    getPointsRecord() {
      this.$store.dispatch("GetSignedList").then(result => {
        this.pointsRecords = result;
      });
    },
    onActivity() {
      this.topic.text = "活动与公告";
      this.topic.index = 0;
    },
    onSiged() {
      if (this.siged.enable) {
        this.$vux.loading.show("签到中...");
        this.$store
          .dispatch("Signed")
          .then(result => {
            this.$vux.loading.hide();
            this.signedInfo = result;
            if (!result.todayIsSiged) {
              this.siged.label = "签到";
              this.siged.enable = true;
            } else {
              this.siged.label = "已签到";
              this.siged.enable = false;
              this.$vux.alert.show("签到成功!");
            }
            this.$vux.loading.hide();
          })
          .catch(err => {
            this.$vux.alert.show(error.message);
          });
      } else {
        this.$vux.alert.show("您今天已经签到,请明天再来!");
      }
    },
    getMyPointInfo() {
      this.topic.text = "积分信息";
      this.topic.index = 1;
    },
    getMyPointRecords() {
      this.topic.text = "积分记录";
      this.topic.index = 2;
    },
    onShare() {
      this.shareApp.show = true;
    },
    pointPurchase() {
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
          let goodsList = [];
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
            goodsList.push({
              key: item.goodsId,
              value: item.goodsName,
              inlineDesc: desc,
              discount: item.discount,
              count: item.count,
              unitPrice: item.unitPrice
            });
          });
          _this.$router.push({
            name: "point-auth",
            params: { list: goodsList }
          });
        }
      });
    },
    onClickMenu(key) {
      const _this = this;
      if (key === "menu1" || key === "menu2") {
        Wechat.isInstalled(
          function(installed) {
            if (installed) {
              _this.onShareWechat(key);
            } else {
              _this.$vux.alert.show("分享失败,您没有安装微信,请先安装微信");
            }
          },
          function(reason) {
            _this.$vux.alert.show(reason);
          }
        );
      }
      if (key === "menu3" || key === "menu4") {
        var args = {};
        args.client = QQSDK.ClientType.QQ; //QQSDK.ClientType.QQ,QQSDK.ClientType.TIM;
        QQSDK.checkClientInstalled(
          function() {
            _this.onShareQq(key);
          },
          function() {
            // if installed QQ Client version is not supported sso,also will get this error
            _this.$vux.alert.show("分享失败,您没有安装QQ,请先安装QQ客户端");
          },
          args
        );
      }
    },
    onShareQq(key) {
      var args = {};
      args.client = QQSDK.ClientType.QQ; //QQSDK.ClientType.QQ,QQSDK.ClientType.TIM;
      args.url = "http://www.clmeng.com";
      args.title = "彩乐盟快彩分析App";
      args.description =
        "多样的彩种,丰富的内置计划，高效的数据引擎，可自定义公式指标，最优秀的快彩分析App";
      args.image = "www/img/thumbnail.png";
      if (key === "menu3") {
        args.scene = QQSDK.Scene.QQ; //QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
        QQSDK.shareNews(
          function() {
            _this.$vux.alert.show("分享成功");
          },
          function(failReason) {
            _this.$vux.alert.show("分享失败");
          },
          args
        );
      } else {
        args.scene = QQSDK.Scene.QQZone; //QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
        QQSDK.shareText(
          function() {
            _this.$vux.alert.show("分享成功");
          },
          function(failReason) {
            _this.$vux.alert.show("分享失败");
          },
          args
        );
      }
    },
    onShareWechat(key) {
      let wechatScene = Wechat.Scene.SESSION;
      if (key === "menu2") {
        wechatScene = Wechat.Scene.TIMELINE;
      }
      Wechat.share(
        {
          message: {
            title: "彩乐盟快彩分析",
            description:
              "多样的彩种,丰富的内置计划，高效的数据引擎，可自定义公式指标，最优秀的快彩分析App",
            thumb: "www/img/thumbnail.png",
            mediaTagName: "TEST-TAG-001",
            media: {
              type: Wechat.Type.WEBPAGE,
              webpageUrl: "http://www.clmeng.com"
            }
          },
          scene: wechatScene // share to wechat friend
        },
        function() {
          _this.$vux.alert.show("成功");
        },
        function(reason) {
          _this.$vux.alert.show("分享失败,原因:" + reason);
        }
      );

      // if (key === "menu1") {

      // }
      // if (key === "menu2") {
      //   Wechat.share(
      //     {
      //       message: {
      //         title: "彩乐盟快彩分析",
      //         description:
      //           "丰富的内置计划，高效的数据引擎，可自定义公式指标，最优秀的快彩分析App",
      //         thumb: "www/img/thumbnail.png",
      //         mediaTagName: "TEST-TAG-001",
      //         media: {
      //           type: Wechat.Type.WEBPAGE,
      //           webpageUrl: "http://www.clmeng.com"
      //         }
      //       },
      //       scene: Wechat.Scene.TIMELINE // share to  Circle of Friends
      //     },
      //     function() {
      //       _this.$vux.alert.show("成功");
      //     },
      //     function(reason) {
      //       _this.$vux.alert.show("分享失败,原因:" + reason);
      //     }
      //   );
      // }
    }
  }
};
</script>

<style lang="less">
.app-main {
  margin-bottom: 10px;
  width: 100%;
}
.weui-grid {
  padding: 4px 4px !important;
}
.weui-grid__icon {
  width: 16px !important;
  height: 16px !important;
}
.weui-grid__label {
  font-size: 12px !important;
  color: #333333 !important;
}
</style>

<style lang="less" scoped>
.vux-divider {
  margin-top: 10px;
  padding: 5px 0 !important;
}
</style>

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
      <grid-item label="积分兑换">
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
      @on-click-mask="console.log('on click mask')">
      </actionsheet>
  </div>
</template>
<script>
import { Grid, GridItem, Divider, Actionsheet } from "vux";
import Activity from "./components/activity";
import PointsInfo from "./components/points-info"
import PointsRecord from "./components/points-record"

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
      signedInfo: {

      },
      pointsRecords: [],
      shareApp: {
        show: false,
        menus: {
          menu1: '分享给好友',
          menu2: '分享到朋友圈'
        } 
      }
    };
  },
  mounted() {
    this.$emit("changeTab", 1);
  },
  created() {
    this.$route.params.headerTitle = '积分商城'
    this.$vux.loading.show("加载中...");
    this.getSignedInfo();
    this.getPointsRecord()
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
      this.topic.text = "活动与公告"
      this.topic.index = 0
    },
    onSiged() {
      if (this.siged.enable) {
        this.$vux.loading.show("签到中...");
        this.$store.dispatch("Signed").then(result => {
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
        }).catch(err => {
           this.$vux.alert.show(error.message);
        });
      } else {
        this.$vux.alert.show("您今天已经签到,请明天再来!");
      }
    },
    getMyPointInfo() {
      this.topic.text = "积分信息"
      this.topic.index = 1
    },
    getMyPointRecords() {
      this.topic.text = "积分记录"
      this.topic.index = 2
    },
    onShare() {
      this.shareApp.show = true
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

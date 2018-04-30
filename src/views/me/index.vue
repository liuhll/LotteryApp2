<template>
  <div class="me-container">
    <group>
      <cell-box>
        <div slot="default" class="me-info">
          <div class="avatar-wrapper">
            <img src="../../assets/images/avatar/male-avtar.svg" height="50" width="50" alt="头像"/>
          </div>
          <div class="nick-wrapper">
            <div class="nick-row">
              <span>手机号:</span>
              <span v-if="userInfo.phone&&userInfo.phone.isBind">{{userInfo.phone.account}}</span>
              <span v-else class="bind-link"><a href="javascript:void(0)" @click="bindProfile(3)">未绑定</a></span>
            </div>
            <div class="nick-row">
              <span>电子邮件:</span>
              <span v-if="userInfo.email&&userInfo.email.isBind">{{userInfo.email.account}}</span>
              <span v-else class="bind-link"><a href="javascript:void(0)" @click="bindProfile(2)">未绑定</a></span>
            </div>
          </div>
          <div class="clear"></div>
        </div>
      </cell-box>
      <cell is-link link="purchase" value-align="left">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/me/purchase.svg">
        购买授权
      </cell>
      <cell is-link link="authinfo" value-align="left">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/me/myauth.svg">
        我的授权
      </cell>
      <cell is-link link="customservice" value-align="left">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/me/customservice.svg">
        在线客服
      </cell>
      <cell is-link :link="{ path:'resetpwd', params: this.userInfo}" value-align="left">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/me/pwd.svg">
        密码管理
      </cell>
      <cell is-link link="opinion" value-align="left">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/me/opinion.svg">
        意见反馈
      </cell>
      <cell is-link link="aboutus" value-align="left">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/me/aboutus.svg">
        关于我们
      </cell>
      <cell is-link link="onlinehelp" value-align="left">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/me/online-help.svg">
        在线帮助
      </cell>
      <cell is-link link="version" value-align="left">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/me/update.svg">
        检查更新
      </cell>
      <cell-box>
        <div slot="default" class="logout-wrapper">
          <x-button type="primary" action-type="button" class="logout-btn"  @click.native="logout()">退出登录</x-button>
        </div>
      </cell-box>
    </group>
  </div>
</template>

<script>
import { Grid, GridItem, Group, CellBox, XButton, Cell } from "vux";
import { throws } from "assert";

export default {
  components: {
    Grid,
    GridItem,
    Group,
    CellBox,
    XButton,
    Cell
  },
  data() {
    return {
      userInfo: {}
    };
  },
  created() {
    const _this = this;
    _this.$store.dispatch("MeInfo").then(result => {
      _this.userInfo = result;
    });
  },
  mounted() {
    this.$emit("changeTab", 2);
  },
  methods: {
    logout() {
      this.$store.dispatch("Logout").then(result => {
        this.$vux.alert.show(result);
        setTimeout(() => {
          this.$router.push({ path: "/login" });
        }, 1500);
      });
    },
    bindProfile(profileType) {
      this.$router.push({
        name: "bindprofile",
        params: { profileType: profileType }
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
.me-info {
  display: flex; /*Flex布局*/
  display: -webkit-flex; /* Safari */
  align-items: center; /*指定垂直居中*/
}
.avatar-wrapper {
  float: left;
}

.nick-wrapper {
  float: left;
  margin-left: 10px;
}
.nick-row {
  line-height: 14px;
  padding: 10px 12px;
}
.nick-row span:nth-child(2) {
  color: #888;
}
.weui-cell {
  padding: 8px 12px !important;
  font-size: 14px;
}
.clear {
  clear: both;
}

.logout-wrapper {
  width: 100%;
}
.logout-btn {
  background-color: rgb(225, 6, 1) !important;
}
.bind-link a {
  margin-left: 9px;
  color: #757575;
  font-weight: 600;
  text-decoration: underline;
}

.vux-cell-primary {
  color: #333 !important;
}

.bind-link a:active {
  color: #ea0000;
}
</style>

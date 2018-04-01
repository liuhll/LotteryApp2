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
      <cell-box>
        购买授权
      </cell-box>
      <cell-box>
        我的授权
      </cell-box>
      <cell-box is-link link="customservice">
        在线客服
      </cell-box>
      <cell-box is-link :link="{ path:'resetpwd', params: this.userInfo}">
        密码管理
      </cell-box>
      <cell-box is-link link="opinion">
        意见反馈
      </cell-box>
      <cell-box is-link link="aboutus">
        关于我们
      </cell-box>
      <cell-box is-link link="onlinehelp">
        在线帮助
      </cell-box>
      <cell-box is-link link="version">
        检查更新
      </cell-box>
      <cell-box>
        <div slot="default" class="logout-wrapper">
          <x-button type="primary" action-type="button" class="logout-btn"  @click.native="logout()">退出登录</x-button>
        </div>
      </cell-box>
    </group>
  </div>
</template>

<script>
import { Grid, GridItem, Group, CellBox, XButton } from 'vux'
import { throws } from 'assert';

export default {
  components: {
    Grid,
    GridItem,
    Group,
    CellBox,
    XButton
  },
  data() {
    return {
      userInfo: {},
    }
  },
  created() {
    const _this = this;
    _this.$store.dispatch('MeInfo').then(result => {
      _this.userInfo = result;
    })
  },
  methods: {
    logout() {
      this.$store.dispatch('Logout').then(result => {
        this.$vux.alert.show(result);
        setTimeout(()=> {
          this.$router.push({ path: '/login' })
        },1500);
        
      });
    },
    bindProfile(profileType) {
      this.$router.push({ name: 'bindprofile', params: { profileType: profileType } })
    }
  }
}
</script>

<style lang="less">
.app-main {
  margin-bottom:10px;
  width: 100%;
  font-size: 14px;
}
.me-info {
  display:flex;/*Flex布局*/
  display: -webkit-flex; /* Safari */
  align-items:center;/*指定垂直居中*/
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
.nick-row span:nth-child(2){
  color: #888;
}
.weui-cell {
  padding: 8px 12px!important;
  font-size: 14px;
}
.clear {
  clear: both;
}

.logout-wrapper {
  width: 100%;
}
.logout-btn {
  background-color:rgb(225, 6, 1) !important
}
.bind-link a {
  margin-left: 9px;
  color: #757575;
  font-weight: 600;
  text-decoration:underline
}

.bind-link a:active {
  color: #EA0000;
}

</style>

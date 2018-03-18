<template>
  <div class="me-container">
    <grid>
      <cell-box>
        <div slot="default" class="me-info">
          <div class="avatar-wrapper">
            <img src="../../assets/images/avatar/male-avtar.svg" height="50" width="50" alt="头像"/>
          </div>
          <div class="nick-wrapper">
            <div class="nick-row">
              <span>账号:</span>
              <span>张三</span>
            </div>
            <div class="nick-row">
              <span>手机号:</span>
              <span>13128729129</span>
            </div>
            <div class="nick-row">
              <span>电子邮件:</span>
              <span>1029765111@qq.com</span>
            </div>
          </div>
          <div class="clear"></div>
        </div>
      </cell-box>
      <cell-box>
        购买授权
      </cell-box>
      <cell-box>
        在线客服
      </cell-box>
      <cell-box>
        我的授权
      </cell-box>
      <cell-box>
        密码管理
      </cell-box>
      <cell-box>
        意见反馈
      </cell-box>
      <cell-box>
        关于我们
      </cell-box>
      <cell-box>
        检查更新
      </cell-box>
    </grid>
  </div>
</template>

<script>
import { Grid, GridItem, CellBox } from 'vux'

export default {
  components: {
    Grid,
    GridItem,
    CellBox
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
  padding: 5px 10px;
}
.nick-row span:nth-child(2){
  color: #888;
}

.clear {
  clear: both;
}
</style>

<template>
   <div class="activity-wrapper">
       <ul>
          <li>注册就送100点积分</li>
          <li>每日签到送积分10点积分</li>
          <li>连续签到5天额外送50点积分</li>
          <li>分享APP,好友注册即送20点积分(每天上限100点积分,同一IP只赠送一次)</li>
       </ul>
   </div>
</template>

<script>
import { Cell, Group } from 'vux'
export default {
  components: {
    Group,
    Cell  
  }
}
</script>

<style lang="less">
.activity-wrapper {
    margin-top: 5px;
}
.activity-wrapper ul {
    padding: 0 25px;
}
.activity-wrapper ul li {
    line-height: 16px;
    font-size: 14px;
    color: #333;
    padding: 5px 0px;
    list-style: decimal;
}
</style>

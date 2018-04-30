<template>
   <div class="activity-wrapper">
       <ul>
          <li>注册即送<span>100</span>点积分</li>
          <li>每日签到送积分<span>10</span>点积分</li>
          <li>连续签到<span>5</span>天额外送<span>100</span>点积分</li>
          <li>分享APP,好友注册即送<span>20</span>点积分(每天上限<span>100</span>点积分,同一IP注册只赠送一次)</li>
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

<style lang="less" scoped>
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

.activity-wrapper ul li span {
  color: #00e3e3
}
</style>

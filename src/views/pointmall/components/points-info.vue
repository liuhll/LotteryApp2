<template>
  <div class="point-wrapper">
      <ul>
          <li>积分余额: <span>{{signedInfo.points}}</span></li>
          <li>连续签到<span>{{signedInfo.durationDays}}</span>天</li>
          <li>最后一次签到日期: <span><span>{{signedInfo.lastSignedTime | formatDate}}</span></span></li>
       </ul>
  </div>
</template>

<script>
import {formatDate} from '@/utils/time'

export default {
  props: {
    signedInfo: {
      type: Object
    }
  },
  filters: {
    formatDate(time) {
      if (time != null) {
        let date = new Date(time)
        return formatDate(date,'yyyy-MM-dd hh:mm')
      }
      return '没有签到记录'
      
    }
  }
}
</script>

<style lang="less" scoped>
.point-wrapper {
    margin-top: 5px;
}
.point-wrapper ul {
    padding: 0 15px;
}
.point-wrapper ul li {
    line-height: 16px;
    font-size: 14px;
    color: #333;
    padding: 5px 0px;
    list-style: none;
}
.point-wrapper ul li span {
  color: #00e3e3
}

</style>
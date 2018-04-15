<template>
  <div class="point-record-wrapper">
      <div class="point-row">
          <img class="icon" v-if="pointRecord.operationType===0"  src="../../../assets/images/pointmall/increase.svg">
          <img class="icon" v-if="pointRecord.operationType===1" src="../../../assets/images/pointmall/decrease.svg">
          <span>{{pointRecord.signedTime | formatDate}}</span>        
          <span>{{pointRecord.pointTypeDesc}}</span>
      </div>
      <div class="point-row">
          <img class="icon" src="../../../assets/images/pointmall/note.svg">
          <span>{{pointRecord.notes}}</span>
      </div>
  </div>
</template>

<script>
import {formatDate} from '@/utils/time'
export default {
  props: {
      pointRecord: {
          type: Object
      }
  },
   filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date,'yyyy-MM-dd hh:mm')
      
    }
  }
}
</script>

<style scoped>

.point-record-wrapper {
    padding: 5px 0 10px 10px;
    font-size: 13px;
    color: #666;
    border-bottom: 1px solid #eee  
}
.point-row {
  padding: 2px 0;

}
.icon{
  width:18px;
  height:18px;
  display:inline-block;
  vertical-align:middle;
}

</style>

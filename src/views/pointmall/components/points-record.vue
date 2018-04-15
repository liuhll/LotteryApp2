<template>
   <scroller lock-x lock-x :height="detailHeight" ref="scrollerEvent">
      <div class="box2">
        <point-record-item v-for="(record,index) in pointsRecords" :pointRecord="record"></point-record-item>
      </div>
    </scroller>
</template>

<script>
import { Scroller, LoadMore } from 'vux'
import PointRecordItem from './point-record-item'
export default {
    props: {
       pointsRecords: {
           type: Array,
           default: []
       }
    },
    components: {
      Scroller,
      LoadMore,
      PointRecordItem
    },
    computed: {
      detailHeight() {
        const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        let height = h - 240;
        return height + 'px';
       }
    }
    
}
</script>

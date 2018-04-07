<template>
    <x-header 
    :left-options="{showBack: showBack}" 
   
    style="width:100%;position:fixed;left:0;top:0;z-index:100;
    background-color:#E10601">计划
     <div v-if="more.show" slot="right" @click="clickMore(more.event)">
      <a v-if="more.type==='text'">
        {{more.context}}
      </a>
      <span v-if="more.type==='img'">
        <img :src="more.imgUrl" height="20" width="20"/>
        <span v-if="more.context">{{more.context}}</span>
      </span>
     </div>
     
    </x-header>
</template>

<script>
import { XHeader } from 'vux'

export default {
  name: 'LtHeader',
  props: {
    showBack: {
      type: Boolean
    },
    more: {
      type: Object
    }
  },
  components: {
      XHeader
  },
  methods: {
    clickMore(event) {
      const f = eval('this.' + event.func);
      f(event.args);
    },
    submitPlans(args) {
      const selectedPlans = this.$store.state.lotterydata.selectPlans;
      if(!selectedPlans || selectedPlans.length <=0) {
        this.$vux.alert.show('您还没有选择计划')
        return
      }
      if(selectedPlans && selectedPlans.length > 10) {
        this.$vux.alert.show('所选计划不允许超过10个')
        return
      }
      this.$vux.loading.show('提交中...');
      let planIds =[];
      let sort = 1;
      selectedPlans.forEach(plan => {
         planIds.push({ 
          planId: plan.id,
          sort: sort
          })
          sort +=1;
      });
      this.$store.dispatch('UpdateUserPlans', planIds).then( result => {
        const _this = this;
        this.$vux.loading.hide()
        this.$vux.confirm.show({
          title: '计划',
          content: result + '返回计划页面',
          onCancel() {

          },
          onConfirm() {
            _this.$router.push({ path: 'plan' })
          }
        })              
      }).catch(error => {
        const _this = this;
        this.$vux.loading.hide()
        this.$vux.confirm.show({
         title: '修改计划',
         content: error.message + ',是否需要购买授权？',
         onConfirm() {            
           //_this.$router.push({ path: 'plan' })
         },
         onCancel() {
           _this.$router.push({ path: 'plan' })
         }
        })
        
      });
    }
  },
  computed: {
  }
}
</script>

<style lang="less">
.vux-header {
  height: 40px;
  line-height: 40px;
   
}
</style>

<template>
    <group label-width="5.0em" label-margin-right="2em" label-align="right">
      <selector placeholder="请选择意见类型" title="意见类型" v-model="opinion.opinionType" required :options="opinionList" :on-change="onChange()"></selector>
      <x-input
        title="联系方式" 
        v-model="opinion.contactWay" 
        placeholder="请输入您的联系方式"
        required
        ref="contactWay"
        :is-type="validateContactWay"
        @input="onChange()"
        ></x-input>
      <x-textarea placeholder="请输入反馈内容" title="反馈内容" @input="onChange()" v-model="opinion.content" :rows="4" required  autosize :max="200"></x-textarea>    
      <cell-box>
        <x-button 
         type="primary" 
         action-type="button" 
         class="opinion-btn"
         :disabled="!canUsable"  
         @click.native="confirm()">确认</x-button>
      </cell-box>        
    </group>
</template>

<script>
import { GroupTitle, Group, Cell, XInput, XButton, CellBox, Selector, XTextarea } from 'vux'
import { validateEmail, isNullOrEmpty,validatePhone } from '@/utils/validate'
import { setTimeout } from 'timers';

export default {
  components: {
    Group,
    GroupTitle,
    Cell,
    XInput,
    XButton,
    CellBox,
    Selector,
    XTextarea
  },  
  data() {
      return {
          opinionList: [
              {key:1,value:'应用故障'},
              {key:2,value:'改进意见'},
              {key:2,value:'商务合作'}
          ],
          opinion: {
              opinionType: null,
              content: '',
              contactWay: ''
          },
          canUsable: false,
          validateContactWay: function(val) {
              return {
                valid: validateEmail(val) || validatePhone(val),
                msg: '您的联系方式不正确'
            }
          }
      }
  },
  created() {
        const _this = this;
        _this.$store.dispatch('MeInfo').then(result => {        
        _this.userInfo = result;       
    })
  },
  methods: {
      onChange() {
          if (this.opinion.opinionType == null) {
              this.canUsable = false;
              return;
          }
          const contactWayRef = this.$refs.contactWay.valid
          if (!contactWayRef) {
              this.canUsable = false;
              return;
          }
          if (isNullOrEmpty(this.opinion.content)) {
              this.canUsable = false;
              return;
          }
          this.canUsable = true
      },
      confirm() {
        this.$vux.loading.show('意见反馈中...');
        let account;
        if (this.userInfo.phone.isBind) {
            account = this.userInfo.phone.account;
        } else {
            account = this.userInfo.email.account;
        }
        this.$store.dispatch('GetAppInfo',this.opinion).then(data => {
            this.$vux.loading.hide();
            this.$vux.alert.show(data);
            this.countdownTimeOut = setTimeout(this.resetTdentifyCodeText,1000);
            setTimeout(()=> {
              this.$router.back(-1)
            },1500);                   
        }).catch(error => {
          this.$vux.loading.hide();
          this.$vux.alert.show(error.message); 
        })
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
.opinion-btn {
    background-color:rgb(225, 6, 1)!important
}
.weui-cell {
  padding: 7px 12px!important;
  font-size: 14px;
}
.weui-select {
    height: 30px!important;
    line-height: 30px!important;
}
.vux-cell-box {
    margin-top: 5px;
}
</style>
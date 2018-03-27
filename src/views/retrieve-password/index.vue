<template>
   <group label-width="5.0em" label-margin-right="2em" label-align="right">
        <x-input title="用户名" 
          v-model="account" 
          placeholder="请输入手机号码|Email"
          :is-type="validateAccount"
          ref="account"
          @input="onChange()">
          </x-input>
        <x-input title="验证码" 
          v-model="identifyCode " 
          placeholder="请输入验证码"  
          class="weui-vcode"
          @input="onChange()">
            <x-button slot="right" 
            type="primary" mini 
            :disabled="!identifyingCodeUseable"
            @click.native="getidentifyCode()">{{identifyCodeText}}</x-button>
        </x-input>
        <cell-box>
          <x-button type="primary" action-type="button" class="register-btn" :disabled="!canUsable" @click.native="nextStep()">下一步</x-button>
        </cell-box>
        
      </group>
</template>

<script>
import {  GroupTitle, Group, Cell, XInput, XButton, CellBox } from 'vux'
import { isvalidUsername, isNullOrEmpty } from '@/utils/validate'
import { POINT_CONVERSION_HYBRID } from 'constants';
export default {
  components: {
    Group,
    GroupTitle,
    Cell,
    XInput,
    XButton,
    CellBox
  },
  data() {
      return {
        account: '',
        identifyCode: '',
        canUsable: false,
        identifyingCodeUseable: false,
        identifyCodeText: '获取验证码',
        countDownCount: 60,
        countdownTimeOut: null,
        validateAccount: function(val) {
          return {
                valid: isvalidUsername(val),
                msg: '账号不合法'
            }
        }
      }
  },
  methods: {
      nextStep() {
        this.$vux.loading.show('验证验证码中...');
          this.$store.dispatch('VerifyIdentifycode', { account: this.account,identifyCode: this.identifyCode, isValidAccountExist: true }).then(data => {
            this.$vux.loading.hide();
            this.$vux.alert.show(data);
            let _this = this;
            setTimeout(function() {
              _this.$router.push({ name:'confirePwd', params: { account: _this.account } });
            }, 1500)
            
          }).catch(error => {
            this.$vux.loading.hide();
            this.$vux.alert.show(error.message); 
          })
        
      },
      onChange() {
        if (isNullOrEmpty(this.account)) {
            this.canUsable = false;
            return;
       }
       const usernameValid = this.$refs.account.valid
       if (usernameValid && this.countDownCount >=60){
          this.identifyingCodeUseable = true;
       } else {
          this.identifyingCodeUseable = false;
       }
       if (isNullOrEmpty(this.identifyCode)) {
            this.canUsable = false;
            return;
       }
       if (usernameValid) {
            this.canUsable = true;
       } else {
           this.canUsable = false;
        }
      },
      getidentifyCode() {
          this.$vux.loading.show('获取验证码...');
          this.$store.dispatch('GetIdentifyCode1', { account: this.account, identifyCodeType: 2 }).then(data => {
            this.$vux.loading.hide();
            this.$vux.alert.show(data);
            this.countdownTimeOut = setTimeout(this.resetTdentifyCodeText,1000);
          }).catch(error => {
            this.$vux.loading.hide();
            this.$vux.alert.show('获取验证码失败,请稍后重试'); 
          })
      },
      resetTdentifyCodeText() {
         const self = this;
          if (self && !self._isDestroyed)
          {
              if(self.countDownCount > 0) {
                  self.countDownCount = self.countDownCount - 1;
                  self.identifyCodeText = `${self.countDownCount}s后重试`
                  self.identifyingCodeUseable = false
                  self.countdownTimeOut = setTimeout(this.resetTdentifyCodeText,1000)
              } else {
                  clearTimeout(self.countdownTimeOut);
                  self.identifyingCodeUseable = true
                  self.countDownCount = 60
                  self.identifyCodeText = '获取验证码'
              }
          }
      }
  }
}
</script>

<style lang="less" scoped>
.register-btn {
    background-color:rgb(225, 6, 1) !important
}
.weui-btn_primary {
    background-color:rgb(225, 6, 1) !important
}
</style>
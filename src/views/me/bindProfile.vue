<template>
    <group label-width="5.0em" label-margin-right="2em" label-align="right">
      <x-input :title="profileTitle"
      :is-type="validateAccount"
      v-model="bindInfo.profile" 
      required
      :placeholder="profilePlaceholder"
      ref="account"
      @input="onChange()">
      </x-input>
      <x-input 
        title="验证码" 
        v-model="bindInfo.identifyCode" 
        placeholder="请输入验证码"  
        class="weui-vcode"
        required
        is-type="number"
        @input="onChange()">
          <x-button slot="right" 
            type="primary" mini 
            :disabled="!identifyingCodeUseable"
            @click.native="getidentifyCode()">{{identifyCodeText}}</x-button>
      </x-input>
       <x-input
        title="密码" 
        type="password"
        v-model="bindInfo.password" 
        placeholder="请输入您的密码"
        :min="6" :max="12" 
        required
        ref="pwd"
        @input="onChange()"
        :is-type="validatePwd"></x-input>
      <cell-box>
        <x-button type="primary" action-type="button" class="register-btn" :disabled="!canUsable" @click.native="bindProfile()">绑定</x-button>
      </cell-box>
        
    </group>
</template>

<script>
import {  GroupTitle, Group, Cell, XInput, XButton, CellBox } from 'vux'
import { validateEmail, isNullOrEmpty,validatePhone } from '@/utils/validate'
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
          bindInfo: {
              profileType: 1,
              profile: null,
              identifycode: '',
              password: ''
          },
          profileTitle: '',
          profilePlaceholder: '',
          canUsable: false,
          identifyingCodeUseable: false,
          identifyCodeText: '获取验证码',
          countDownCount: 60,
          countdownTimeOut: null,
          validateAccount: function(val) {
            let msgStr = '账号不正确'
            let validFunc = validateEmail;
            if (this.$route.query.profileType == 2) {
                msgStr = '您输入的Email格式不正确'
            } else {
                msgStr = '您输入的手机号码不正确'
                validFunc = validatePhone
            }
            return {
              valid: validFunc(val),
              msg: msgStr
            }
          },
          validatePwd: function(val) {
               return {
                valid: val.length >= 6,
                msg: '密码不少于6位'
            }
          }
      }
  },
  created() {
    this.bindInfo.profileType = this.$route.query.profileType
    if(this.$route.query.profileType == 2) {
        this.profileTitle = 'Email'
        this.profilePlaceholder = '请输入电子邮箱'
    } else {
        this.profileTitle = '手机'
        this.profilePlaceholder = '请输入手机号码'
    }
  },
  methods: {
      bindProfile() {
        this.$vux.loading.show(`正在绑定${this.profileTitle}...`);
        this.$store.dispatch('BindProfile', this.bindInfo).then(data => {
          this.$vux.loading.hide();
          this.$vux.alert.show(data);
          this.countdownTimeOut = setTimeout(this.resetTdentifyCodeText,1000);
          setTimeout(()=> {
            this.$router.back(-1)
          },1500);
        }).catch(error => {
          this.$vux.loading.hide();
          this.$vux.alert.show(`绑定${this.profileTitle}失败,${error.message}`); 
          
        })
      },
      onChange() {
       const usernameValid = this.$refs.account.valid
       const pwdValid = this.$refs.pwd.valid

       if (isNullOrEmpty(this.bindInfo.profile)) {
            this.canUsable = false;
            this.identifyingCodeUseable = false;
            return;
       }

       if (usernameValid && this.countDownCount >=60){
           this.identifyingCodeUseable = true;
       } else {
           this.identifyingCodeUseable = false;
       }
       if (isNullOrEmpty(this.bindInfo.identifyCode)) {
            this.canUsable = false;
            return;
       }
       if (isNullOrEmpty(this.bindInfo.password)) {
            this.canUsable = false;
            return;
       }    
       if (usernameValid && pwdValid) {
            this.canUsable = true;
       } else {
           this.canUsable = false;
       }
    },
     getidentifyCode() {
          this.$vux.loading.show('获取验证码...');
          this.$store.dispatch('GetIdentifyCode2', { account: this.bindInfo.profile, identifyCodeType: 2 }).then(data => {
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
          
      },
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
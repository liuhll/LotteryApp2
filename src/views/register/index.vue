<template>
  <div>
      <group label-width="4.5em" label-margin-right="2em" label-align="right">
        <x-input title="用户名"
         v-model="user.account"
         placeholder="请输入手机|Email" 
         required
         :is-type="validateAccount"
         @input="onChange()"
         ref="account">
         </x-input>
        <x-input title="验证码"
         v-model="user.identifyCode" 
         required 
         is-type="number" 
         placeholder="请输入验证码"  
         class="weui-vcode">
            <x-button 
             slot="right" 
             type="primary" 
             mini
             :disabled="!identifyingCodeUseable" 
             @click.native="getidentifyCode()"
             >
             {{identifyCodeText}}
             </x-button>
        </x-input>
        <x-input title="密码"
         v-model="user.password" 
         type="password" 
         placeholder="请输入密码" 
         :min="6" :max="12" 
         required
         :is-type="validatePwd"
         @input="onChange()"
         ref="pwd">
         </x-input>
        
        <x-input title="确认密码" 
         v-model="user.confirmPwd"
         type="password" 
         placeholder="请输入确认密码" 
         :equal-with="user.password" 
         required
         ref="confirmPwd"
         @input="onChange()">
         </x-input>
        <cell-box>
          <x-button type="primary" action-type="button" class="register-btn"  @click.native="register()" :disabled="!canUsable">注册</x-button>
        </cell-box>
      </group>
      <group  label-width="4.5em" title="友情提示" label-margin-right="2em" label-align="right">
          <cell-box class="tips-wrapper">
             <p>1. 合法的用户名为手机号或Email</p>
             <p>2. 推荐以手机作为用户名</p>
             <p>3. 新用户注册即可获得50点积分</p>
             <p>4. 分享给好友还可赚取积分哦</p>
          </cell-box>
      </group>
    </div>
</template>

<script>
import {  GroupTitle, Group, Cell, XInput, XButton, CellBox } from 'vux'
import { isvalidUsername, isNullOrEmpty } from '@/utils/validate'
import { fail } from 'assert';
import { setTimeout, clearTimeout } from 'timers';

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
          user: {
              account:'',
              password: '',
              confirmPwd: '',
              identifyCode: '',
              clientRegistType: '1'
          },
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
        },
        validatePwd : function(val) {
            return {
                valid: val.length >= 6,
                msg: '密码不少于6位'
            }
        },
      }
  },
  created() {
      document.addEventListener('visibilitychange',this.onVisibilityChange)
  },
  methods: {
      register() {
        this.$vux.loading.show('注册中...');
        this.$store.dispatch('Register', {
            account: this.user.account,
            password: this.user.password,
            identifyCode: this.user.identifyCode,
            clientRegistType: this.user.clientRegistType
        }).then( res => {
            let _this = this;
            _this.$vux.loading.hide()
            _this.$vux.confirm.show({
                title: '注册',
                content: res +',是否转到登录界面?',
                onConfirm() {
                    _this.$router.push({ path: '/' })
                },
                onCancel() {

                }
            })
            
          }).catch(error => {
            this.$vux.loading.hide();
            this.$vux.alert.show(error.message); 
          })
      },
      getidentifyCode() {
          this.$vux.loading.show('获取验证码...');
          this.$store.dispatch('GetIdentifyCode1', { account: this.user.account }).then(data => {
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
      onVisibilityChange() {
        //this.resetTdentifyCodeText();
      },
      onChange() {
       const usernameValid = this.$refs.account.valid
       const pwdValid = this.$refs.pwd.valid
       const confirmPwdValid = this.$refs.confirmPwd.valid

       if (isNullOrEmpty(this.user.account)) {
            this.canUsable = false;
            this.identifyingCodeUseable = false;
            return;
       }

       if (usernameValid && this.countDownCount >=60){
           this.identifyingCodeUseable = true;
       } else {
           this.identifyingCodeUseable = false;
       }
       if (isNullOrEmpty(this.user.identifyCode)) {
            this.canUsable = false;
            return;
       }
       if (isNullOrEmpty(this.user.password)) {
            this.canUsable = false;
            return;
       }
       if (isNullOrEmpty(this.user.confirmPwd)) {
            this.canUsable = false;
            return;
       }
        if(this.user.password != this.user.confirmPwd) {
            this.canUsable = false;
            return;
        }       

       if (usernameValid && pwdValid && confirmPwdValid) {
            this.canUsable = true;
       } else {
           this.canUsable = false;
       }
      }
  }
}
</script>

<style lang="less" scoped>
.register-btn {
    background-color:rgb(225, 6, 1) !important
}
.tips-wrapper {
    display: block !important
}
.tips-weui-cells__title  {
    color: #333!important;
    font-size: 16px;
}
.tips-wrapper p {
    font-size: 14px;
    color: #999
}
.weui-btn_primary {
    background-color:rgb(225, 6, 1) !important
}
</style>

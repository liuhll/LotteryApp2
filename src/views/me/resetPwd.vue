<template>
    <group label-width="5.0em" label-margin-right="2em" label-align="right">
      <!-- <cell  v-if="userInfo.phone.isBind"   title="手机" :value="userInfo.phone.account" value-align="left"></cell>
      <cell  v-if="userInfo.email.isBind" title="Email" :value="userInfo.email.account" value-align="left"></cell> -->
      <x-input 
        title="旧密码" 
        v-model="resetPwd.oldPassword" 
        type="password" 
        placeholder="请输入旧密码" 
        :min="6" 
        :max="12" 
        @input="onChange()"
        ref="oldPwd"
        :is-type="validatePwd">
        </x-input>
      
      <x-input 
        title="新密码" 
        v-model="resetPwd.newPassword" 
        type="password" 
        placeholder="请输入新密码" 
        :min="6" 
        :max="12" 
        @input="onChange()"
        ref="pwd"
        :is-type="validatePwd">
      </x-input>
      <x-input
        title="确认密码"
        v-model="resetPwd.confirmNewPassword" 
        type="password" 
        placeholder="请输入确认密码"
        @input="onChange()" 
        ref="confirmPwd"
        :equal-with="resetPwd.newPassword" 
        :is-type="validatePwd">
        </x-input>
      <cell-box>
        <x-button 
         type="primary" 
         action-type="button" 
         class="resetpwd-btn"
         :disabled="!canUsable"  
         @click.native="confirm()">确认</x-button>
      </cell-box>        
    </group>
</template>

<script>
import { GroupTitle, Group, Cell, XInput, XButton, CellBox } from 'vux'
import { isNullOrEmpty } from '@/utils/validate'
import { setTimeout } from 'timers';

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
          userInfo: {},
          resetPwd: {
              oldPassword:'',
              newPassword: '',
              confirmNewPassword: '',
          },
          canUsable: false,
          validatePwd : function(val) {
            return {
                valid: val.length >= 6,
                msg: '密码不少于6位'
            }
        },
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
        if (isNullOrEmpty(this.resetPwd.oldPassword)) {
          this.canUsable = false;
          return;
       }
       if (isNullOrEmpty(this.resetPwd.newPassword))
       {
          this.canUsable = false;
          return;
       }
       if (isNullOrEmpty(this.resetPwd.confirmNewPassword))
       {
          this.canUsable = false;
          return;
       }
       const oldPwdValid = this.$refs.oldPwd.valid
       const pwdValid = this.$refs.pwd.valid
       const confirmPwdValid = this.$refs.confirmPwd.valid
       if (oldPwdValid && pwdValid && confirmPwdValid) {
            this.canUsable = true;
       } else {
           this.canUsable = false;
        }
      },
      confirm() {
        this.$vux.loading.show('重置密码中,请稍等...');
        let account;
        if (this.userInfo.phone.isBind) {
            account = this.userInfo.phone.account;
        } else {
            account = this.userInfo.email.account;
        }
        this.$store.dispatch('ResetPassword', { 
              account: account, 
              oldPassword: this.resetPwd.oldPassword,
              newPassword: this.resetPwd.newPassword
            }).then(data => {
               this.$vux.loading.hide();
               this.$vux.alert.show(data);
               let _this = this;
               	setTimeout(function() {
                    _this.$store.dispatch('Logout').then(result => {
                    _this.$router.push({ path: '/' })
                })
                   },1500)                      
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
.resetpwd-btn {
    background-color:rgb(225, 6, 1)!important
}
.weui-cell {
  padding: 8px 12px!important;
  font-size: 14px;
}
</style>
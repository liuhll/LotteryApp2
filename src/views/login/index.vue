<template>
  <div class="login-wapper" id="login">
      <div class="login-logo">
      </div>
       <box gap="10px 10px">
          <group class="login-area" ref="loginForm">
            <x-input title="账号" name="username" v-model="userinfo.username" required
            :is-type="validateAccount" placeholder="用户名|手机|Email" @input="onChange()" ref="username">
              <img slot="label" style="padding-right:10px;display:block;" src="../../assets/images/account.svg" width="24" height="24">
            </x-input>
            <x-input title="密码" v-model="userinfo.password" type="password" required 
            :is-type="validatePwd" placeholder="请输入密码" @input="onChange()" ref="pwd">
              <img slot="label" style="padding-right:10px;display:block;" src="../../assets/images/password.svg" width="24" height="24">
            </x-input>
            <x-button type="primary" @click.native="handleLogin()" :disabled="canUsable">立即登录</x-button>
          </group>
      </box>    
  </div>
</template>

<script>
import { Box, XInput, Group, XButton, Cell } from 'vux'
import { isvalidUsername, isNullOrEmpty } from '@/utils/validate'
import { error } from 'util';

export default {
  components: {
      Box,
      XInput,
      Group,
      XButton,
      Cell
  },
  data () {
      return {
        userinfo: {
              username: null,
              password: null,
              isForce: false,
              systemType: 'bjpks'
          },
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
        canUsable: true
      }
  },
  methods: {
    handleLogin() {
        this.$vux.loading.show('登录中...');
        this.$store.dispatch('LoginByUsername', this.userinfo).then(() => {
            this.$vux.loading.hide();
            this.$router.push({ path: '/' })
          }).catch(error => {
            this.$vux.loading.hide();
            if (error.code === 40006) {
               const _this = this;
               _this.userinfo.isForce = true;
               _this.$vux.confirm.show({
                  title: '登陆',
                  content: error.message,
                  onConfirm() {            
                    _this.handleLogin();
                  },
                  onCancel() {
                    
                  }
               });
               
            } else {
              this.$vux.alert.show(error.message);
            } 
            
          })
    },
    onChange() {
       if (isNullOrEmpty(this.userinfo.username)) {
            this.canUsable = true;
            return;
       }
       if (isNullOrEmpty(this.userinfo.password)) {
            this.canUsable = true;
            return;
       }
       const usernameValid = this.$refs.username.valid
       const pwdValid = this.$refs.pwd.valid
       if (usernameValid && pwdValid) {
            this.canUsable = false;
       } else {
           this.canUsable = true;
       }
    }
  }
}
</script>

<style>
.login-area {
    margin-top: 120px;
}
</style>

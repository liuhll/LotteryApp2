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
            <div class="lottery-options">
              <img style="display:inline-block;float:left;margin-left:16px;;margin-top:10px;" src="../../assets/images/option.svg" width="20" height="20">
              <selector placeholder="请选择彩种" v-model="userinfo.systemType" name="district" :options="lotteryList"></selector>
            </div>
            <x-button type="primary" @click.native="handleLogin()" :disabled="canUsable">立即登录</x-button>
          </group>
          <div class="register-wrapper">
            <span class="register-link"><a href="javascript:void(0)" @click="goRegister()">注册</a></span>
            <span class="findpwd-link"><a href="#">找回密码</a></span>
            <div class="clear"></div>
          </div>
      </box>    
  </div>
</template>

<script>
import { Box, XInput, Group, XButton, Cell, Selector } from 'vux'
import { isvalidUsername, isNullOrEmpty } from '@/utils/validate'
import { error } from 'util';

export default {
  components: {
      Box,
      XInput,
      Group,
      XButton,
      Cell,
      Selector
  },
  data () {
      return {
        userinfo: {
              username: null,
              password: null,
              isForce: false,
              systemType: ''
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
        canUsable: true,
        lotteryList: [{key: 'bjpks', value: '北京Pk10'}]
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
    goRegister() {
      this.$router.push({ name: 'register' })
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

<style less>
.login-area {
    margin-top: 120px;
}

.register-wrapper {
  margin-top: 15px;
}

.register-wrapper span {
  display: inline-block;
  font: 21px; 
}

.register-wrapper span a {
  color: #757575;
  text-decoration:underline
}
.register-wrapper span a:active {
  color: #EA0000;
}

.register-link {
  float: left; 
  margin-left: 15px
}

.findpwd-link {
  float: right;
  margin-right: 15px
}
.clear {
  clear: both;
}

.lottery-options {

}
</style>

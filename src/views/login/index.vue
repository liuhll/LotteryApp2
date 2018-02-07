<template>
  <div class="login-wapper" id="login">
      <div class="login-logo">
      </div>
       <box gap="10px 10px">
          <group class="login-area"  ref="loginForm">
            <x-input title="账号" name="username" v-model="userinfo.username"
             placeholder="用户名|手机|Email" is-type="china-name"></x-input>
            <x-input title="密码" v-model="userinfo.password" type="password"
             placeholder="请输入密码"></x-input>
            <x-button type="primary" @click.native="handleLogin()">立即登录</x-button>
          </group>
      </box>    
  </div>
</template>

<script>
import { Box, XInput, Group, XButton, Cell } from 'vux'
import { isvalidUsername } from '@/utils/validate'
import { fail } from 'assert';

export default {
  components: {
      Box,
      XInput,
      Group,
      XButton,
      Cell
  },
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入用户名|手机号码|电子邮件'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
      return {
        userinfo: {
              username: null,
              password: null
          },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      }
  },
  methods: {
      handleLogin() {
          debugger;
          this.$refs.loginForm.validate(valid => {
               if (valid){
                   debugger;
               } else {
                   return false;
               }
          });
      }
  }
}
</script>

<style>
.login-area {
    margin-top: 120px;
}
</style>

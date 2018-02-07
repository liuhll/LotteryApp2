<template>
  <div class="login-wapper" id="login">
      <div class="login-logo">
      </div>
       <box gap="10px 10px">
          <group class="login-area">
            <x-input title="账号" name="username" placeholder="用户名|手机|Email" is-type="china-name"></x-input>
            <x-input title="密码" v-model="password" type="password" placeholder="请输入密码"></x-input>
            <x-button type="primary">立即登录</x-button>
          </group>
      </box>    
  </div>
</template>

<script>
import { Box, XInput, Group, XButton, Cell } from 'vux'

export default {
  components: {
      Box,
      XInput,
      Group,
      XButton,
      Cell
  }
}
</script>

<style>
.login-area {
    margin-top: 120px;
}
</style>

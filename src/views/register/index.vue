<template>
  <div>
      <group label-width="4.5em" label-margin-right="2em" label-align="right">
        <x-input title="用户名" v-model="user.userName" placeholder="请输入用户名"></x-input>
        <x-input title="手机" v-model="user.phone"  mask="999 9999 9999" :max="13" is-type="china-mobile" placeholder="请输入手机号码"></x-input>
        <x-input title="电子邮件" v-model="user.email" placeholder="请输入电子邮件" is-type="email"></x-input>
        <x-input title="QQ" v-model="user.qqCode" placeholder="请输入QQ"></x-input>
        <x-input title="密码" v-model="user.passWord" type="password" placeholder="请输入密码" :min="6" :max="12"></x-input>
        <x-input title="确认密码" v-model="user.confirmPassWord" type="password" placeholder="请输入确认密码" :equal-with="user.password"></x-input>
        <cell-box>
          <x-button type="primary" action-type="button" class="register-btn"  @click.native="register()">注册</x-button>
        </cell-box>
        
      </group>
    </div>
</template>

<script>
import {  GroupTitle, Group, Cell, XInput, XButton, CellBox } from 'vux'
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
              userName: '',
              email: '',
              phone: '',
              passWord: '',
              confirmPassWord: '',
              qqCode: '',
              clientRegistType: ''
          }
      }
  },
  methods: {
      register() {

      }
  }
}
</script>

<style lang="less" scoped>
.register-btn {
    background-color:rgb(225, 6, 1) !important
}
</style>

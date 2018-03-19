<template>
   <group label-width="5.0em" label-margin-right="2em" label-align="right">
        <x-input title="手机|Email" v-model="account" placeholder="请输入手机号码|Email"></x-input>
        <x-input title="验证码" v-model="identifyCode " placeholder="请输入验证码"  class="weui-vcode">
            <x-button slot="right" type="primary" mini >获取验证码</x-button>
        </x-input>
        <cell-box>
          <x-button type="primary" action-type="button" class="register-btn" :disabled="!canUsable" @click.native="nextStep()">下一步</x-button>
        </cell-box>
        
      </group>
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
        account: '',
        identifyCode: '',
        canUsable: false
      }
  },
  methods: {
      nextStep() {
        this.$router.push({ name:'confirePwd' });
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
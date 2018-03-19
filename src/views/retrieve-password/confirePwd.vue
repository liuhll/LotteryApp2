<template>
  <group label-width="5.0em" label-margin-right="2em" label-align="right">
      <x-input title="新密码" v-model="user.passWord" type="password" placeholder="请输入新密码" :min="6" :max="12"></x-input>
      <x-input title="确认密码" v-model="user.confirmPassWord" type="password" placeholder="请输入确认密码" :equal-with="user.password"></x-input>
      <cell-box>
        <x-button type="primary" action-type="button" class="register-btn"  @click.native="confirm()">确认</x-button>
      </cell-box>
        
      </group>
</template>

<script>
import { GroupTitle, Group, Cell, XInput, XButton, CellBox } from 'vux'
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
            passWord: '',
            confirmPassWord: ''
        }
      }
  },
  methods: {
    confirm() {
      
    }
  }
}
</script>

<style lang="less" scoped>
.register-btn {
    background-color:rgb(225, 6, 1) !important
}
</style>
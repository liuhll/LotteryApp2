<template>
  <group label-width="5.0em" label-margin-right="2em" label-align="right">
      <x-input 
        title="新密码" 
        v-model="user.password" 
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
       v-model="user.confirmPassword" 
       type="password" 
       placeholder="请输入确认密码"
       @input="onChange()" 
       ref="confirmPwd"
       :equal-with="user.password" 
       :is-type="validatePwd">

      </x-input>
      <cell-box>
        <x-button 
         type="primary" 
         action-type="button" 
         class="register-btn"
         :disabled="!canUsable"  
         @click.native="confirm()">确认</x-button>
      </cell-box>        
    </group>
</template>

<script>
import { GroupTitle, Group, Cell, XInput, XButton, CellBox } from 'vux'
import { isNullOrEmpty } from '@/utils/validate'
import { throws } from 'assert';

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
            password: '',
            confirmPassword: '',
            account:''
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
    this.user.account = this.$route.params.account
  },
  methods: {
    onChange() {
       if (isNullOrEmpty(this.user.password)) {
            this.canUsable = false;
            return;
       }
       if (isNullOrEmpty(this.user.confirmPassword))
       {
          this.canUsable = false;
          return;
       }
       const pwdValid = this.$refs.pwd.valid
       const confirmPwdValid = this.$refs.confirmPwd.valid
       if (pwdValid && confirmPwdValid) {
            this.canUsable = true;
       } else {
           this.canUsable = false;
        }
    },
    confirm() {
      this.$vux.loading.show('重置密码中,请稍等...');
      this.$store.dispatch('RetrievePassword', { account: this.user.account, password: this.user.password }).then(data => {
          this.$vux.loading.hide();
          this.$vux.alert.show(data);
          let _this = this;
          setTimeout(function() {
             _this.$router.push({ path: '/' })
          }, 1500)           
        }).catch(error => {
          this.$vux.loading.hide();
          this.$vux.alert.show(error.message); 
        })
    }
  }
}
</script>

<style lang="less" scoped>
.register-btn {
    background-color:rgb(225, 6, 1) !important
}
</style>
<template>
  <section>
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view>
      <keep-alive>
          
      </keep-alive>       -->
      <router-view class="router-view" v-on:changeTab="changeTab"></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      num: 0
    }
  },
  mounted(){
    this.$emit('changeTab', this.num)
  },
  methods: {
    changeTab(num) {
      this.num = num
    }
  }
}
</script>
<style lang="less" scoped>
.router-view {
  height: 100%;
   
}
</style>

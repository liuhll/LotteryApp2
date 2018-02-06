<template>
  <section>
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <keep-alive>
          <router-view class="router-view"></router-view>
      </keep-alive>      
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>
<style lang="less" scoped>
.router-view {
    height: 100%;
   
}
</style>

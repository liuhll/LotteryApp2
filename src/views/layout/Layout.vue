<template>
  <div class="app-wrapper">
    <lt-header></lt-header>
    <app-main></app-main>
    <lt-tabbar></lt-tabbar>
  </div>
</template>
<script>
import LtHeader from './components/header'
import AppMain from './app-main'
import LtTabbar from './components/tabbar'

export default {
  name: 'layout',
  components: {
    LtHeader,
    LtTabbar,
    AppMain
  }
}
</script>

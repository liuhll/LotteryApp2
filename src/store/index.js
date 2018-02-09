import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import lotterydata from './modules/lotterydata'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
      user,
      lotterydata
    },
    getters
  })

  export default store 
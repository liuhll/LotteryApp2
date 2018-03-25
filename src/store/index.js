import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import lotterydata from './modules/lotterydata'
import commonData from './modules/common'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
      user,
      lotterydata,
      commonData
    },
    getters
  })

  export default store 
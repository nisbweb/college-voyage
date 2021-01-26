import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'
import axios from 'axios'
import './firebase_config'

import 'vuesax/dist/vuesax.css' // Vuesax styles

Vue.use(Vuesax)

Vue.use({
  install (Vue) {
    Vue.prototype.$axios = axios.create({
      baseURL: process.env.VUE_APP_BASE_URL,
      headers: {
        authorization: store.state.user.id
      }
    })
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

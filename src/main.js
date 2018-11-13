// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import store from './store'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(Vuex)

axios.defaults.baseURL = 'http://localhost:8010'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store: store
})

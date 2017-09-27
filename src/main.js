// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import MuseUI from 'muse-ui' 
import 'muse-ui/dist/muse-ui.css'

// import Fastclick from 'fastclick'
import Store from 'storejs'

import filters from './filters.js';

// Fastclick.attach(document.body)
Vue.use(MuseUI)
Vue.use(Store)

Vue.config.productionTip = false

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import API from './plugins/api'
import BootstrapVue from 'bootstrap-vue'
Vue.config.productionTip = false
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
/* eslint-disable no-new */

Vue.use(API)
Vue.use(BootstrapVue)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

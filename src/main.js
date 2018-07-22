// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import API from './plugins/api'
import BootstrapVue from 'bootstrap-vue'
Vue.config.productionTip = false
// import Buefy from 'buefy'
import VueFlex from "vue-flex";
// Already autoprefixed for vendor prefixes.
// Also namespaced to avoid collisions.
import "vue-flex/dist/vue-flex.css";
// import 'buefy/lib/buefy.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
/* eslint-disable no-new */

Vue.use(API);
Vue.use(VueFlex);
Vue.use(BootstrapVue);
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

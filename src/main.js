// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import API from './plugins/api'
import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = false;
import VueFlex from "vue-flex";
import "vue-flex/dist/vue-flex.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vSelect from 'vue-select'


const options = {name: '_'}; // customize the way you want to call it
// Vue.use(VueLodash, options); // options is optional
Vue.component('v-select', vSelect);
Vue.use(API);
Vue.use(VueFlex);
Vue.use(BootstrapVue);
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});

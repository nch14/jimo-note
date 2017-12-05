// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import {myAxios} from './assets/js/commons'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/cn-style.css'
import './assets/css/jimo-style.css'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$http = myAxios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});

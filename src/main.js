// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Toast from './toast'
// 引入并使用vue-resource网络请求模块
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(Toast);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//
  // render: main => main(App)
  components: { App },
  template: '<App/>'
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VueRouter from './VueRouter'
import App from './App'
// import TodoList from './TodoList.vue'
import router from './router'

// 引入并使用vue-resource网络请求模块
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // render: main => main(App)
  components: { App },
  template: '<App/>'
})

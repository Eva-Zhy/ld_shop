import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    show: false,
    sortName:'',
    sortIndex: 0,
    page_status: 0,
    selectedMd5:'',
    shopCarData:[],
    orderData:[],
    addressData:{
      name:'',
      phone:'',
      address:'',
      city:'', //城市
      street:'',  // 街道
      district:'', //区
      province:'', //省份
      cityStr:'省/市/区/街道'
    },
    allSelect:false
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    show: false,
    page_status: 0,
    selectedMd5:'',
    shopCarData:[],
    orderData:[],
    addressData:{
      name:'1',
      phone:'',
      address:'',
      city:''
    },
    allSelect:false
  }
})

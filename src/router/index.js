import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home/Home'
import ShopCar from '../components/ShopCar/ShopCar'
import GoodsSort from '../components/GoodsSort/GoodsSort'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', component:Home,name:"Home"},
    {path: '/shopcar', component:ShopCar},
    {path: '/goodssort', component:GoodsSort}
    //{name:'myAbout',path: '/myAbout', component:About},
    //{path: '/contact', component:DemoContact}
  ]
})

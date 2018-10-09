import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import DemoHome from '../components/DemoHome'
import DemoAbout from '../components/DemoAbout'
import DemoContact from '../components/DemoContact'
import About from '../components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', component:DemoHome},
    {path: '/about', component:DemoAbout},
    {name:'myAbout',path: '/myAbout', component:About},
    {path: '/contact', component:DemoContact}
  ]
})

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './vue/home.vue'
import Detail from './vue/detail.vue'
import Tag from './vue/tag.vue'
import About from './vue/about.vue'
import Login from './vue/login.vue'
import Manage from './vue/manage.vue'
import Menu from './vue/menu-comp.vue'
import axios from 'axios'
import './css/pure-min.css'
import './css/icon/iconfont.css'

Vue.use(VueRouter)


const router = new VueRouter({
	routes: [
		{ path: '/', component: Home},
		{ path: '/article/:id', name: 'article', component: Detail},
    { path: '/tag', component: Tag},
    { path: '/about', component: About},
    { path: '/login', component: Login},
	]
})

new Vue({
  
  router: router,
  data:{
    appSlide: '',
    menuShow:true
  },
  components:{
    'menu-comp': Menu,
  },
  methods:{
    push:function() {
        this.appSlide = 'padding-left:150px'
    },
    pull:function() {
        this.appSlide = ''
    },
    menuShowOff:function() {
      this.menuShow = false;
    },
    menuShowOn:function() {
      this.menuShow = true;
    }
  },
}).$mount('#app')

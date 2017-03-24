import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './vue/home.vue'
import Detail from './vue/detail.vue'
import Tag from './vue/tag.vue'
import About from './vue/about.vue'
import Login from './vue/login.vue'
import Menu from './vue/menu-comp.vue'
import Archive from './vue/archive.vue'
import axios from 'axios'
import './css/pure-min.css'
import './js/x-return-top.min.js'
import './css/atom-one-dark.css'

Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})

Vue.use(VueRouter)


const router = new VueRouter({
	routes: [
    { path: '/', component: Home},
		{ path: '/page/:page', component: Home},
		{ path: '/article/:id', name: 'article', component: Detail},
    { path: '/tag', component: Tag},
    { path: '/tag/:name', component: Tag},
    { path: '/about', component: About},
    { path: '/login', component: Login},
    { path: '/archives', component: Archive},
	]
})

new Vue({
  el: '#app',
  router: router,
  data:{
    appSlide: '',
    menuShow:true,
    header:'Hello'
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
    },
    tohome:function(){
      this.header = 'Hello'
    },
    totag:function(){
      this.header = 'Tags'
    },
    tolog:function(){
      this.header = 'Login'
    },
    toabout:function(){
      this.header = 'About'
    },
  },
})





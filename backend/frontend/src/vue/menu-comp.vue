<template>
	<div>
      <a id="menuLink" class="menu-link animated fadeIn" @click="menuon">
          <span></span>
      </a>
      <transition name="menu-slide">
          <div id="menu" v-show="show">
              <ul class="pure-menu-list">
                  <li class="pure-menu-item">
                      <a href="#" class="pure-menu-link"><i id="icon-menu" class="iconfont icon-home"></i>Home</a>
                  </li>

                  <li class="pure-menu-item">
                      <a href="/manage/" class="pure-menu-link"><i id="icon-menu" class="iconfont icon-home"></i>Manage</a>
                  </li>

                  <li class="pure-menu-item">
                      <a href="#/tag" class="pure-menu-link"><i id="icon-menu" class="iconfont icon-category"></i>Tag</a>
                  </li>

                  <li class="pure-menu-item">
                      <a href="#/about" class="pure-menu-link"><i id="icon-menu" class="iconfont icon-about-copy"></i>About</a>
                  </li>
              </ul>
              <i @click="menuoff" class="iconfont icon-left"></i>
          </div>
      </transition>

      <div id="top-menu" class="animated fadeIn">
          <a href="/#/" id="left-menu" class="top-menu-font">Hello</a>
          <a href="#/tag" class="top-menu-font">Tag</a>
          <a @click="manageLogin" class="top-menu-font">Manage</a>
          <a href="#/about" id="right-menu" class="top-menu-font">About</a>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      show: false,
    }
  },
  methods:{
    menuon:function() {
        this.show = true;
        this.$emit('menuon')
    },
    menuoff:function() {
        this.show = false;
        this.$emit('menuoff')
    },
    manageLogin:function() {
      axios.get('http://127.0.0.1:8000/api/request_user/', {
        headers:{ 'Authorization': 'Token ' + Cookies.get('token') }
      }).then(function(response){
        window.location.href = "/manage/"
      })
      .catch(function(){
        window.location.href = "/#/login/"
      })
    }
  }
}
</script>

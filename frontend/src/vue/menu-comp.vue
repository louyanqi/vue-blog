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
                      <a href="/#/manage" class="pure-menu-link"><i id="icon-menu" class="iconfont icon-home"></i>Manage</a>
                  </li>

                  <li class="pure-menu-item">
                      <a href="/#/tag" class="pure-menu-link"><i id="icon-menu" class="iconfont icon-category"></i>Tag</a>
                  </li>

                  <li class="pure-menu-item">
                      <a href="/#/about" class="pure-menu-link"><i id="icon-menu" class="iconfont icon-about-copy"></i>About</a>
                  </li>
              </ul>
              <i @click="menuoff" class="iconfont icon-left"></i>
          </div>
      </transition>

      <div id="top-menu" class="pure-menu pure-menu-horizontal animated fadeIn">
          <a href="#" class="pure-menu-heading pure-menu-link">Hello</a>
          <span class="pure-menu-list"><a href="/#/tag" class="pure-menu-link">Tag</a></span>
          <span class="pure-menu-list"><a href="/#/manage" class="pure-menu-link">Manage</a></span>
          <a style="float: right" href="/#/about" class="pure-menu-link">About</a>
      </div>
    </div>
</template>

<script>
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
    }
  }
}
</script>

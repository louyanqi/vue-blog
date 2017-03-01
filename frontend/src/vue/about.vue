<template>
  
    <div id="main">
        <div class="header animated fadeIn">
            <h1>About</h1>
        </div>

        <div style="text-align: center;margin-top: 50px;" class="animated fadeIn">
          <p>Leo</p>


          <div style="margin-top: 30px">
            <a id="about-icon" href="http://www.jianshu.com/u/c4adda69f8eb"><i class="iconfont icon-jian"></i></a>
            <a id="about-icon" href="http://weibo.com/5180092490/profile?rightmod=1&wvr=6&mod=personnumber&is_all=1"><i class="iconfont icon-weibo"></i></a>
            <a id="about-icon" href="https://github.com/lou147"><i class="iconfont icon-github"></i></a>
            <a id="about-icon" @click="showQQSwitch"><i class="iconfont icon-3"><span v-show="showQQ" style="font-size: 13px">: 778617402</span></i></a>
          </div>
        </div>
        
    </div>

</template>

<script>
export default {
  data () {
    return {
      showQQ: false,
    }
  },
  created(){
    this.showmenus()
  },
  methods:{
    showQQSwitch:function() {
      this.showQQ = !this.showQQ
    },
    showmenus:function() {
      this.$emit('showmenus')
    }
  }

}
</script>



<template>
	<div id="background-image" class="header animated fadeIn " :style="{'background-image': 'url(' + img_url +')'}">
      <h1 class="">Hello</h1>
      <div v-show="loadShow" style="margin-top: -50px" class="ui active centered inline loader"></div>
      <button @click="changeImg" title="点击切换图片" class="pure-button click-btn">click!</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      img_url: '',
      loadShow:true
    }
  },
  mounted(){
    this.changeImg()
  },
  methods:{
  	changeImg:function() {
      var self = this;
      axios.get('http://127.0.0.1:8000/change_img/').then(function(response){
        self.img_url = response.data.img_url;
        self.loadShow = false
      })
    },
  }
}
</script>
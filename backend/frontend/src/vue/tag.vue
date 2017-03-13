<template>
<div id="main">
  <div class="header animated fadeIn">
      <h1>Tags</h1>
  </div>
  <div class="pure-g ">
    <div id="main-tag" class="pure-u-1-1">
      <div v-for="tag in tags" @click="clickTag(tag)" class="tag animated flipInX" :class="{active: tag.tag_active}">
        <span class="tag-name">{{tag.name}}({{tag.article_num}})</span>
      </div>
    </div>
    <div class="article_list pure-u-1-1">
      <div v-for="article in articles" class="article animated fadeIn">
          <router-link :to="{ name: 'article', params: {id: article.id}}" class="article-head">{{article.title}}</router-link>
          <div class="date">{{article.create_time}}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      show: true,
      articles: [],
      isActive:false,
      tags: []
    }
  },
  created(){
    this.getTag(),
    this.showmenus(),
    document.title = 'Tag'
  },
  methods:{
    showmenus:function() {
      this.$emit('showmenus')
    },
    getTag:function() {
      var self = this;
      axios.get('http://127.0.0.1:8000/api/tags/?format=json').then(function(response) {
        for (var t in response.data){
          response.data[t].tag_active = false
        }
        self.tags = response.data
      })
    },
    clickTag:function(tag) {
      var self = this;
      if(tag.tag_active == true){
        tag.tag_active = false;
        self.articles = '';
      }else if(self.articles.length>0){
        for (var t in self.tags){
          self.tags[t].tag_active = false
        }

        axios.get('http://127.0.0.1:8000/api/articles_admin/?format=json&tag='+tag.id).then(function(response) {
          self.articles = response.data;
          tag.tag_active = !tag.tag_active;
        })
        .catch(function(error){
          // error
        })
      }else{
        axios.get('http://127.0.0.1:8000/api/articles_admin/?format=json&tag='+tag.id).then(function(response) {
          self.articles = response.data;
          tag.tag_active = !tag.tag_active;
        })
        .catch(function(error){
          // error
        })
      }
    },
  }
}
</script>

<style src="../css/tag.css"></style>
<style src="../css/animate.css"></style>
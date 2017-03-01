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
    <div class="article_list pure-u-1-1" style="margin-top: 10px">
      <div v-for="article in articles" class="article animated fadeIn">
          <router-link :to="{ name: 'article', params: {id: article.id}}" class="article-head">{{article.title}}</router-link>
          <div class="date">{{article.create_time}}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
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
    this.showmenus()
  },
  methods:{
    showmenus:function() {
      this.$emit('showmenus')
    },
    getTag:function() {
      this.$http.get('http://127.0.0.1:8000/api/tags/?format=json').then(response => {
        for (var t in response.body){
          response.body[t].tag_active = false
        }
        this.tags = response.body
      })
    },
    clickTag:function(tag) {
      if(tag.tag_active == true){
        tag.tag_active = false;
        this.articles = '';
      }else if(this.articles.length>0){
        for (var t in this.tags){
          this.tags[t].tag_active = false
        }

        this.$http.get('http://127.0.0.1:8000/api/articles_admin/?format=json&tag='+tag.id).then(response => {
          this.articles = response.body;
          tag.tag_active = !tag.tag_active;
        }, response => {
            //error
        })
      }else{
        this.$http.get('http://127.0.0.1:8000/api/articles_admin/?format=json&tag='+tag.id).then(response => {
          this.articles = response.body;
          tag.tag_active = !tag.tag_active;
        }, response => {
            //error
        })
      }
    },
  }
}
</script>

<style src="../css/tag.css"></style>
<style src="../css/animate.css"></style>
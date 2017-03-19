<template> 
<div id="main">
  <div class="pure-g ">
    <div id="main-tag" class="pure-u-1-1">
      <div v-for="tag in tags"  class="tag animated flipInX" :class="{active: tag.tag_active}">
        <router-link :to=" '/tag/' + tag.name" class="tag-name" :class="{active: tag.tag_active}">{{tag.name}}({{tag.article_num}})</router-link>
      </div>
    </div>
    <div class="article_list pure-u-1-1">
      <div v-for="article in articles" class="article animated fadeIn pure-g">
        <div class="article-content pure-u-3-4">
          <router-link :to="{ name: 'article', params: {id: article.id}}" class="article-head">{{article.title}}</router-link>
          <div class="date">{{article.create_time}}</div>
          <p style="margin-bottom: 5px">
              {{article.abstract}} ... 
          </p>
        </div>
        <div v-if="article.image != null" class="article-image pure-u-1-4" :style="{'background-image': 'url(' + article.image +')'}"></div>
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
      tags: [],
    }
  },
  created(){
    document.title = 'Tag',
    this.getTag()
  },
  mounted() {
    this.toTag()
  },
  watch:{
    '$route' : 'getTagArticle'
  },
  methods:{
    toTag:function(){
      this.$emit('tag')
    },
    getTag:function() {
      var self = this;
      axios.get('/api/tags/').then(function(response) {
        for (var t in response.data){
          response.data[t].tag_active = false
        }
        self.tags = response.data;
      })
    },
    getTagArticle:function() {
      var self = this;
      for (var t in self.tags){
        self.tags[t].tag_active = false
      };
      var name = this.$route.params.name;
      axios.get('/api/articles_admin/?tag='+name).then(function(response) {
        self.articles = response.data.article_data; 
        var filtered = self.tags.filter(function nowTag(tag){
          return tag.name == name
        })
        filtered[0].tag_active = true
      })
      .catch(function(error){
        // error
      })
    },

  }
}
</script>

<style src="../css/tag.css"></style>
<style src="../css/animate.css"></style>
<template>
  <div>
    
    <div id="main">

        <div class="articles">
        
          <div v-for="article in articles" class="article animated fadeIn pure-g">
            <div class="article-content pure-u-1">
              <router-link :to="{ name: 'article', params: {id: article.id}}" class="article-head">{{article.title}}</router-link>
              <div class="date">{{article.create_time}}</div>
              <p v-html="Marked(article.abstract)" style="margin-bottom: 5px">

                  <router-link :to="{ name: 'article', params: {id: article.id}}" id="read-more">Read more</router-link>
              </p>
              <router-link :to=" '/tag/' + tag.id" class="home-tag" v-for="tag in article.tag">{{tag.name}}</router-link>
            </div>
            <!-- :style="{'background-image': 'url(' + article.image +')'}" -->
            <!-- style="background-image: url('src/image/default.png');" -->
            <div v-if="article.url_img" class="article-image pure-u-1-5" :style="{'background-image': 'url(' + article.url_img +')'}"></div>
          </div>

          <div class="pagination">
            <div class="pure-menu pure-menu-horizontal">
              <ul class="pure-menu-list">
                  <li v-if="pre_list" class="pure-menu-item"><a @click="getPreList" class="pure-menu-link">上一页</a></li>
                  <li v-else class="pure-menu-item"><a class="pure-menu-link">上一页</a></li>

                  <li v-if="now_page==page" v-for="page in page_list" class="pure-menu-item choze"><a class="pure-menu-link">{{page}}</a></li>
                  <li v-else class="pure-menu-item"><a :href="'/#/page/' + page + '/'" class="pure-menu-link">{{page}}</a></li>

                  <li v-if="next_list" class="pure-menu-item"><a @click="getNextList" class="pure-menu-link">下一页</a></li>
                  <li v-else class="pure-menu-item"><a class="pure-menu-link">下一页</a></li>
              </ul>
          </div>
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
      show: false,
      articles: [],
      page_list:[],
      now_page:'',
      isActive:true,
      pre_list:'',
      next_list:'',
      loadShow: true
    }
  },
  beforeCreate() {
    document.title = "Hello"
  },
  created(){
    this.getArticleList(),
    this.home()
  },
  watch: {
    '$route': 'getArticleList'
  },
  methods:{
    Marked:function(content) {
      var marked = require('marked');
      return marked(content)
    },
    home:function() {
      this.$emit('home')
    },
    getArticleList:function() {
        var self = this;
        var page = this.$route.params.page;
        if (page == undefined){
          page = 1
        }

        axios.get('/api/articles/?page='+ page).then(function(response) {
            console.log(response);
            self.articles = response.data.data;
            self.page_list = response.data.page_list;
            self.now_page = response.data.now_page;
            self.pre_list = response.data.pre_list;
            self.next_list = response.data.next_list;
        })
        .catch(function(error){

        })
    },
    getPreList:function() {
      var self = this;
      window.location.href = '/#/page/' + (parseInt(self.now_page)-1) + '/'
    },
    getNextList:function() {
      var self = this;
      window.location.href = '/#/page/' + (parseInt(self.now_page)+1) + '/'
    },
  }
}
</script>

<style src="../css/side-menu.css"></style>


<template>
  <div>
    
    <div id="main">
        <div class="header animated fadeIn" style="background-image: url('src/image/head.jpeg');">
            <h1>Hello</h1>
            <button title="点击切换图片" class="pure-button click-btn">click!</button>
        </div>
        <div class="articles">
          <div v-for="article in articles" class="article animated fadeIn pure-g">
            <div class="article-content pure-u-3-4">
              <router-link :to="{ name: 'article', params: {id: article.id}}" class="article-head">{{article.title}}</router-link>
              <div class="date">{{article.create_time}}</div>
              <p style="margin-bottom: 5px">
                  {{article.abstract}} ... 
              </p>
              <router-link :to=" '/tag/' + tag.name" class="home-tag" v-for="tag in article.tag">{{tag.name}}</router-link>
            </div>
            <div v-if="article.image != null" class="article-image pure-u-1-4" :style="{'background-image': 'url(' + article.image +')'}"></div>
          </div>

          <div class="pagination">
            <div class="pure-menu pure-menu-horizontal">
              <ul class="pure-menu-list">
                  <li v-if="pre_list" class="pure-menu-item"><a @click="getPreList" class="pure-menu-link">上一页</a></li>
                  <li v-else class="pure-menu-item"><a class="pure-menu-link">上一页</a></li>

                  <li v-if="now_page==page" v-for="page in page_list" class="pure-menu-item choze"><a class="pure-menu-link">{{page}}</a></li>
                  <li @click="getArticleList(page)" v-else class="pure-menu-item"><a class="pure-menu-link">{{page}}</a></li>

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
      title: 'Home',
      show: false,
      articles: [],
      page_list:[],
      now_page:'',
      isActive:true,
      pre_list:'',
      next_list:'',
    }
  },
  beforeCreate() {
    document.title = "Hello"
  },
  created(){
    this.getArticleList(1),
    this.showmenus()
  },
  methods:{
    getArticleList:function(page) {
        var self = this;
        axios.get('http://127.0.0.1:8000/api/articles/?page='+ page).then(function(response) {
            self.articles = response.data.data;
            self.page_list = response.data.page_list;
            self.now_page = response.data.now_page;
            self.pre_list = response.data.pre_list;
            self.next_list = response.data.next_list;
            console.log(self.articles)
        })
        .catch(function(error){

        })
    },
    getPreList:function() {
      this.getArticleList(parseInt(this.now_page)-1)
    },
    getNextList:function() {
      this.getArticleList(parseInt(this.now_page)+1)
    },
    showmenus:function() {
      this.$emit('showmenus')
    },
  }
}
</script>

<style src="../css/side-menu.css"></style>


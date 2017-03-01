<template>
  <div>
    <div id="main">
        <div class="header animated fadeIn">
            <h1>Hello</h1>
        </div>

        <div v-for="article in articles" class="article animated fadeIn">
            <router-link :to="{ name: 'article', params: {id: article.id}}" class="article-head">{{article.title}}</router-link>
            <div class="date">{{article.create_time}}</div>
            <p>
                {{article.abstract}} ... 
            </p>
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
</template>

<script>
export default {
  data () {
    return {
      show: false,
      articles: [],
      page_list:[],
      now_page:'',
      isActive:true,
      pre_list:'',
      next_list:''
    }
  },
  computed:{

  },
  created(){
    this.getArticleList(1),
    this.showmenus()
  },
  methods:{
    getArticleList:function(page) {
      
        this.$http.get('http://127.0.0.1:8000/api/articles/?page='+ page).then(response => {
            this.articles = response.body.data;
            this.page_list = response.body.page_list;
            this.now_page = response.body.now_page;
            this.pre_list = response.body.pre_list;
            this.next_list = response.body.next_list;
            console.log(response.body)
        }, response => {
            // error
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


<template>
	<div class="main">
		<div class="archive">
			<h1 style="display: inline;">{{article_list.length}} </h1><span> posts</span>
			<div class="archive-content">
				<div class="article-list" v-for="article in article_list">
					<div class="archive-date" style="display: inline-block;">{{article.create_time}}</div>
					<router-link :to="{ name: 'article', params: {id: article.id}}" class="archive-article-title">{{article.title}}</router-link>
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
    	article_list:[]
    }
  },
  mounted() {
     document.title = 'Archive',
     this.getArticleList()
  },
  methods:{
  	getArticleList:function() {
  		var self = this;
  		axios.get('/api/archive_articles/').then(function(response) {
  			console.log(response)
  			self.article_list = response.data;
  		})
  	}
  }
}
</script>


<style src="../css/archive.css"></style>
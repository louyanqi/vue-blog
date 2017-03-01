<template>
    <div id="main">
        <div v-show="show" class="animated fadeIn article" style="margin-top: 100px">
            <h2 class="detail-article-head">{{article.title}}</h2>
            <div class="detail-date">{{article.create_time}}</div>
            <div v-html="Marked">

            </div>
            <hr>
            <div>
                <span @click="getPre">{{pre_title}}</span>
                <span @click="getNext" style="float: right">{{next_title}}</span>
            </div>

            <button v-show="!addComment" @click="showComment" class="pure-form pure-button animated fadeIn">添加评论</button>

            <div v-show="addComment" class="pure-form animated fadeIn">
                <input v-model="comment_user" type="text" class="pure-input-3-4" placeholder="你的名字...">
                <textarea v-model="comment_content" class="pure-input-3-4" placeholder="写下你的评论..."></textarea>
                <div style="width: 75%">
                    <button @click="postComment" id="comment-btn" class="pure-button pure-input-1-6">评论</button>
                    <button @click="cancelComment" class="pure-button pure-input-1-6">取消</button>
                </div>
            </div>
            
            <ul class="pure-menu-list">
                <li v-for="comment in commentList" class="comment">
                    <div style="height: 35px">
                        <img style="float: left;" class="avatar" src="/src/image/default.png">
                        <div class="username">
                            {{comment.comment_user}}
                            <span v-if="comment.parent"><span class="rep">回复</span>{{comment.parent.comment_user}}</span>
                            <span class="comment-date">{{comment.create_time}}</span>
                        </div>
                    </div>
                    <div>
                        {{comment.content}}
                    </div>
                    <div @click="showReplySwitch(comment)" class="reply-btn">回复</div>
                    <div v-show="comment.reply_window" class="pure-form reply animated fadeIn">
                        <input v-model="comment_user" type="text" class="pure-input-3-4" placeholder="你的名字...">
                        <textarea v-model="comment_content" class="pure-input-3-4" placeholder="写下你的评论..."></textarea>
                        <div style="width: 75%">
                            <button @click="postComment(comment)" class="pure-button pure-input-1-6">评论</button>
                            <button @click="showReplySwitch(comment)" class="pure-button pure-input-1-6">取消</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
	export default {
	  data () {
	    return {
	      show: false,
          article: '',
          addComment:false,
          comment_user:'',
          comment_content:'',
          commentList:[],
          id:this.$route.params.id,
          content:'',
          pre_id: '',
          pre_title: '',
          next_id: '',
          next_title: ''
	    }
	  },
      created() {
        this.getArticleDetail();
        this.showmenus();
        
      },
      computed:{
        Marked:function() {
            var marked = require('marked');
            return marked(this.content)
          }
      },
	  methods:{
        showmenus:function() {
          this.$emit('showmenus')
        },
        getArticleFun:function(id){
            this.show=false;
            this.$http.get('http://127.0.0.1:8000/api/article/'+ id + '/?format=json').then(response => {this.article = response.body.data;
                document.title = this.article.title
                this.content = this.article.content;
                this.show=true;
                this.pre_id = response.body.pre_id;
                this.next_id = response.body.next_id;
                this.pre_title = response.body.pre_title;
                this.next_title = response.body.next_title;
                this.getComment(id);
            });
        },
        getArticleDetail:function() {
            this.getArticleFun(this.id);
        },
        getPre:function() {
            document.body.scrollTop = 0;
            this.getArticleFun(this.pre_id);
        },
        getNext:function(){
            document.body.scrollTop = 0;
            console.log(this.next_id)
            this.getArticleFun(this.next_id);
        },
        showComment:function() {
            this.addComment = true
        },
        cancelComment:function() {
            this.comment_user = '';
            this.comment_content = '';
            this.addComment = false
        },
        getComment:function(id) {
            this.$http.get('http://127.0.0.1:8000/api/comments/?format=json&article_id='+id).then(response => {
                for(var a in response.body){
                    response.body[a].reply_window = false
                }
                this.commentList = response.body;
            });
        },
        postComment:function(comment) {
            this.$http.post('http://127.0.0.1:8000/api/comments/?format=json', {
                article_id: this.id,
                comment_user: this.comment_user,
                comment_content: this.comment_content,
                parent: comment.id
            }).then(response => {
                this.getComment(this.id);
                this.comment_user = '';
                this.comment_content = '';
            }, response => {
                //error
            })
        },
        showReplySwitch:function(comment) {
            comment.reply_window = !comment.reply_window;
            this.addComment = false;
            console.log(comment.reply_window)
        }
	  }
	}
</script>


<style src="../css/detail.css"></style>
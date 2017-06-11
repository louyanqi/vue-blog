<template>
    <div id="main">

        <div v-show="show" class="animated fadeIn article-detail">
            <h2 class="detail-article-head">{{article.title}}</h2>
            <div class="detail-date">{{article.create_time}}</div>
            <div v-html="Marked" v-highlight>

            </div>
            <hr>
            <div>
                <span v-if="pre_title != '没有了' " class="next-article-btn" @click="getPre"> < {{pre_title}}</span>
                <span v-if="next_title != '没有了' " class="next-article-btn" @click="getNext" style="float: right">{{next_title}} > </span>
            </div>

            <!-- 评论 -->
            
            <div class="comment-top">{{article.comment_num}}条评论</div>

            <!-- 父评论 -->
            <ul class="pure-menu-list" style="border-top: 1px solid #eaeaea;padding-top: 20px">
                <li v-for="comment in commentList" class="comment">
                    <div style="height: 35px">
                        <img style="float: left;" class="avatar" src="/static/image/default.png">
                        <div class="username">
                            {{comment.comment_user}}
                        </div>
                    </div>
                    <div class="comment-content">
                        {{comment.content}}
                    </div>

                    <div style="margin-top: 5px">
                        <span class="comment-date">{{comment.create_time}}</span>
                        <span @click="showReplySwitch(comment)" class="reply-btn">回复</span>
                    </div>

                    <!-- 回复父评论评论框 -->
                    <div style="margin-top: 15px;margin-left: 40px;" v-show="comment.reply_window" class="pure-form reply animated fadeIn">
                        <input v-model="comment_user_parent" type="text" class="pure-input-3-4" placeholder="你的名字...">
                        <input style="margin-top: 5px" v-model="user_email_parent" type="text" class="pure-input-3-4" placeholder="你的邮箱...">
                        <textarea style="margin-top: 5px" v-model="comment_content_parent" class="pure-input-3-4" placeholder="写下你的评论..."></textarea>
                        <div style="width: 75%">
                            <button @click="postComment(comment)" class="pure-button pure-input-1-6">评论</button>
                            <button @click="showReplySwitch(comment)" class="pure-button pure-input-1-6">取消</button>
                        </div>
                        <input style="margin-top: 15px" type="checkbox" id="checkbox" v-model="checked">
                        <label for="checkbox">有新回复时给我发邮件</label>

                    </div>
                    
                    <!-- 子评论 -->
                    <div style="margin-top: 15px">
                        <div v-for="child_comment in comment.child_comments" class="child-comment">
                            <div class="comment-container">
                                <div style="height: 35px">
                                    <img style="float: left;" class="avatar" src="/static/image/default.png">
                                    <div class="username">
                                        {{child_comment.comment_user}} <span style="font-size: 14px;color: #929292">回复</span> {{child_comment.reply.comment_user}}
                                    </div>
                                </div>
                                <div class="comment-content">
                                    {{child_comment.content}}
                                </div>

                                <div style="margin-top: 5px">
                                    <span class="comment-date">{{child_comment.create_time}}</span>
                                    <span @click="childReplySwitch(child_comment)" class="reply-btn">回复</span>
                                </div>

                                <!-- 回复子评论评论框 -->
                                <div style="margin-top: 15px;margin-left: 40px" v-show="child_comment.child_reply_input" class="pure-form reply animated fadeIn">
                                    <input v-model="comment_user" type="text" class="pure-input-3-4" placeholder="你的名字...">
                                    <input style="margin-top: 5px" v-model="user_email" type="text" class="pure-input-3-4" placeholder="你的邮箱...">
                                    <textarea style="margin-top: 5px" v-model="comment_content" class="pure-input-3-4" placeholder="写下你的评论..."></textarea>
                                    <div style="width: 75%">
                                        <button @click="replyComment(comment,child_comment)" class="pure-button pure-input-1-6">评论</button>
                                        <button @click="childReplySwitch(child_comment)" class="pure-button pure-input-1-6">取消</button>
                                    </div>
                                    <input style="margin-top: 15px" type="checkbox" id="checkbox" v-model="checked">
                                <label for="checkbox">有新回复时给我发邮件</label>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            
            <!-- 主评论框 -->
            <div v-show="mainComment" class="pure-form animated fadeIn">
                <input v-model="comment_user_parent" type="text" class="pure-input-3-4" placeholder="你的名字...">
                <input style="margin-top: 5px" v-model="user_email_parent" type="text" class="pure-input-3-4" placeholder="你的邮箱...">
                <textarea style="margin-top: 5px" v-model="comment_content_parent" class="pure-input-3-4" placeholder="写下你的评论..."></textarea>
                
                <div style="width: 75%">
                    <button @click="postComment" id="comment-btn" class="pure-button pure-input-1-6">评论</button>
                    <button @click="cancelComment" class="pure-button pure-input-1-6">取消</button>
                </div>
                <input style="margin-top: 15px" type="checkbox" id="checkbox" v-model="checked">
                <label for="checkbox">有新回复时给我发邮件</label>
            </div>

        </div>
    </div>

</template>

<script>
    import axios from 'axios'
	export default {
	  data () {
	    return {
          checked: false,
	      show: false,
          article: '',
          comment_user:'',
          comment_content:'',
          user_email: '',
          comment_user_parent:'',
          comment_content_parent:'',
          user_email_parent: '',
          commentList:[],
          content:'',
          pre_id: '',
          pre_title: '',
          next_id: '',
          next_title: '',
          mainComment:true
	    }
	  },
      created() {
        this.getArticleDetail()
      },
      computed:{
        Marked:function() {
            var marked = require('marked');
            return marked(this.content)
          }
      },
      watch: {
        '$route': 'getArticleDetail'
      },
	  methods:{
        manageLogin:function() {
          axios.get('/api/request_user/', {
            headers:{ 'Authorization': 'Token ' + Cookies.get('token') }
          }).then(function(response){
            window.location.href = "/manage/"
          })
          .catch(function(){
            window.location.href = "/#/login/"
          })
        },
        childReplySwitch:function(child_comment) {
            var self = this;
            self.comment_user = '';
            self.user_email = '';
            self.comment_content = '';
            child_comment.child_reply_input = ! child_comment.child_reply_input;
            self.mainComment = ! child_comment.child_reply_input;
        },
        getArticleFun:function(id){
            console.log('getegetetetete123123');
            var self = this;
            var id = this.$route.params.id;
            self.show=false;
            axios.get('/api/article/'+ id + '/').then(function(response) {

                self.article = response.data.data;
                document.title = self.article.title
                self.content = self.article.content;
                self.show=true;
                self.pre_id = response.data.pre_id;
                self.next_id = response.data.next_id;
                self.pre_title = response.data.pre_title;
                self.next_title = response.data.next_title;
                self.getComment(id);
            });
        },
        getArticleDetail:function() {
            this.getArticleFun();
        },
        getPre:function() {
            var self = this;
            document.body.scrollTop = 0;
            window.location.href = '/#/article/'+self.pre_id
        },
        getNext:function(){
            var self = this;
            document.body.scrollTop = 0;
            window.location.href = '/#/article/'+self.next_id
        },
        cancelComment:function() {
            this.comment_user_parent = '';
            this.comment_content_parent = '';
        },
        getComment:function(id) {
            var self = this;
            axios.get('/api/comments/?article_id='+id).then(function(response){
                for(var a in response.data){
                    response.data[a].reply_window = false
                }
                self.commentList = response.data;
            });
        },
        postComment:function(comment) {
            var id = this.$route.params.id
            var self = this;
            axios.post('/api/comments/', {
                article_id: id,
                comment_user: self.comment_user_parent,
                comment_content: self.comment_content_parent,
                user_email: self.user_email_parent,
                parent: comment.id,
                reply_to: comment.id,
                send_email: self.checked
            }).then(function(response) {
                self.getComment(id);
                self.comment_user_parent = '';
                self.user_email_parent = '',
                self.comment_content_parent = '';
                self.checked = false;
                self.mainComment = true;
                self.article.comment_num += 1
            })
            .catch(function(error){

            })
        },

        replyComment:function(comment, child_comment) {
            var id = this.$route.params.id
            var self = this;
            axios.post('/api/comments/', {
                article_id: id,
                comment_user: self.comment_user,
                comment_content: self.comment_content,
                user_email: self.user_email,
                parent: comment.id,
                reply_to: child_comment.id,
                send_email: self.checked
            }).then(function(response) {
                self.getComment(id);
                self.comment_user = '';
                self.user_email_parent = '',
                self.comment_content = '';
                self.checked = false;
                self.mainComment = true;
                self.article.comment_num += 1
            })
            .catch(function(error){

            })
        },
        showReplySwitch:function(comment) {
            var self = this;
            comment.reply_window = !comment.reply_window;
            self.mainComment = !comment.reply_window;
        }
	  }
	}
</script>


<style src="../css/detail.css"></style>
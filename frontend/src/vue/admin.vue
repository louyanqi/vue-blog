<template>
<div>
	<div id="layout" class="content pure-g" v-show="!writeModelShow">
    <!-- 左侧菜单栏 -->
    <div id="nav" class="pure-u">
        <div class="pure-menu">
            <ul class="pure-menu-list">
                <li class="pure-menu-item"><a href="/#/" class="pure-menu-link">返回首页</a></li>
                <li @click="logOut" class="pure-menu-item"><a class="pure-menu-link">退出</a></li>
                <div class="menu-solid"></div>
                <li @click="addNewArticle" class="pure-menu-item"><a class="pure-menu-link">新建文章</a></li>
                <li @click="getArticleList" class="pure-menu-item"><a :class="{active: allArticleActive}" class="pure-menu-link">所有文章</a></li>
                <li @click="getTag" class="pure-menu-item"><a class="pure-menu-link">所有标签 {{tagIcon}}</a></li>
                <li @click="addTagBtn" v-show="newTag" class="pure-menu-item"><a class="pure-menu-link">新建标签</a></li>
                <li v-show="tagInput" class="pure-menu-item"><input @keyup.enter="postTag" v-model="tagName" class="tag-input"></li>
                <li @click="delTagBtn" v-show="newTag" class="pure-menu-item"><a class="pure-menu-link">删除标签</a></li>
                <li v-for="tag in tags" class="pure-menu-item"><a @click="clickTag(tag)" :class="{active: tag.tag_active}" class="pure-menu-link" id="tag-link">{{tag.name}}</a><span v-show="delTagIcon" @click="deleteTag(tag.id)" class="tag-delete-icon">x</span></li>
            </ul>
        </div>
    </div>

    <!-- 中间文章列表栏 -->
    <div id="list" class="pure-u-1">
        <div @click="getArticleInfo(article)" v-for="article in articles" :class="{selected: article.article_active}" class="article-item">
            <h4 class="article-title">{{article.title}}</h4>
             <span class="admin-date">发表于{{article.create_time}}</span>
            <p class="article-desc">
                <span v-for="tag in article.tag">{{tag.name}} | </span>
            </p>
        </div>
    </div>

    <!-- 右侧编辑栏 -->
    <div id="editor-main" class="pure-u-1">
        <div class="article-content">
            <div v-show="msgShow" class="message animated fadeIn">{{msg}} <span @click="closeMsg" class="close-icon">x</span></div>
            <div class="article-content-header">
                <input v-model="article_info.title" class="article-input-title">
            </div>
            <div class="tool">
                <a v-for="article_tag in article_info.tag" class="tags">{{article_tag.name}}</a><span v-show="addArticleTagIcon" @click="showAddArtTagLi" class="add-article-tag-icon" title="添加标签">+</span>
                <div v-show="tagList" class="tag-box">
                    <ul style="background-color: black" class="pure-menu-list">
                        <li @click="addArticleTag(tag.id)" v-for="tag in articleTagList" class="pure-menu-item"><a id="add-article-tag-link" class="pure-menu-link">{{tag.name}}</a></li>
                        
                    </ul>
                </div>
                <button @click="deleteArticle" id="tool-btn" class="pure-button">删除文章</button>
                <button v-show="postArticleBtn" @click="postArticle" id="tool-btn" class="pure-button">修改保存</button>
                <button v-show="addNewArticleBtn" @click="addNewArticlePost" id="tool-btn" class="pure-button">新建保存</button>
                <button @click="writeModelSwitch" id="tool-btn" class="pure-button">写作模式</button>

            </div>

            <div>
                <div id="test"></div>
                <textarea v-model="article_info.content" id="article-textarea" class="article-textarea" :style="{height: (getscrollHeight-160) + 'px'}">
                </textarea>
   
            </div>
        </div>
    </div>
</div>
    <!-- 写作模式 -->
    <div v-show="writeModelShow" class="write-model" :style="{height: getscrollHeight + 'px'}">
        <div id="write-page">
            <div id="editor-main" class="pure-u-1">
                <div class="article-content">
                    <div v-show="msgShow" class="message animated fadeIn">{{msg}} <span @click="closeMsg" class="close-icon">x</span></div>
                    <div class="article-content-header">
                        <input v-model="article_info.title" class="article-input-title">
                    </div>
                    <div class="tool">
                        <a v-for="article_tag in article_info.tag" class="tags">{{article_tag.name}}</a><span v-show="addArticleTagIcon" @click="showAddArtTagLi" class="add-article-tag-icon" title="添加标签">+</span>
                        <div v-show="tagList" class="tag-box">
                            <ul style="background-color: black" class="pure-menu-list">
                                <li @click="addArticleTag(tag.id)" v-for="tag in articleTagList" class="pure-menu-item"><a id="add-article-tag-link" class="pure-menu-link">{{tag.name}}</a></li>
                                
                            </ul>
                        </div>
                        <button @click="deleteArticle" id="tool-btn" class="pure-button">删除文章</button>
                        <button v-show="postArticleBtn" @click="postArticle" id="tool-btn" class="pure-button">修改保存</button>
                        <button v-show="addNewArticleBtn" @click="addNewArticlePost" id="tool-btn" class="pure-button">新建保存</button>
                        <button @click="writeModelSwitch" id="tool-btn" class="pure-button">返回</button>

                    </div>

                    <div>
                        <div id="test"></div>
                        <textarea v-model="content" id="article-textarea" class="article-textarea" :style="{height: (getscrollHeight-160) + 'px'}">
                        </textarea>
           
                    </div>
                </div>
            </div>
        </div>

        <div id="show-page">
            <div class="article-content">
                <div v-show="msgShow" class="message animated fadeIn">{{msg}} <span @click="closeMsg" class="close-icon">x</span></div>
                <div class="article-content-header">
                    <div v-html="article_info.title" class="article-input-title"></div>
                </div>

                <div v-html="Marked">
                 
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
        articles:[],
        tags:[],
        tagIcon: '>',
        article_info: '',
        scrollHeight:'',
        msgShow:false,
        allArticleActive:'',
        newTag:false,
        tagInput:false,
        tagName:'',
        msg: '',
        delTagIcon:false,
        tagList:false,
        articleTagList:[],
        postArticleBtn:false,
        addNewArticleBtn:false,
        addArticleTagIcon:true,
        content:'',
        writeModelShow:false,
    }
  },
  created(){
    this.getArticleList()
  },
  computed:{
    getscrollHeight:function() {
        this.height = document.body.scrollHeight
        console.log(this.height)
        console.log('123')
        return document.body.scrollHeight
    },
    getscrollWidth:function() {
        
        this.width = document.body.scrollWidth
        return document.body.scrollWidth
        console.log(this.width)
    },
    Marked:function() {
        var marked = require('marked');
        return marked(this.content)
    }
  },
  methods:{
    writeModelSwitch:function() {
        this.writeModelShow = !this.writeModelShow
    },                     
    logOut:function() {
        Cookies.remove('token');
        location.reload()   
    },
    getArticleList:function() {
        this.$http.get('http://127.0.0.1:8000/api/articles_admin/').then(response => {
            this.articles = response.body;
            this.allArticleActive = true;
            for (var t in this.tags){
              this.tags[t].tag_active = false
            };
            this.getArticleInfo(this.articles[0])
        }, response => {
            //error
        })
    },
    // 显示某一文章
    getArticleInfo:function(article){
        var id = article.id;
        this.postArticleBtn = true;
        this.addNewArticleBtn = false;
        for (var a in this.articles){
            this.articles[a].article_active = false
        };
        this.$http.get('http://127.0.0.1:8000/api/article_admin/'+ id + '/?format=json').then(response => {
        this.article_info = response.body;
        article.article_active = true;
        this.content = this.article_info.content
      })
    },
    // get标签的函数模版
    getTagFun:function() {
      this.$http.get('http://127.0.0.1:8000/api/tags_admin/?format=json').then(response => {
        this.tags = response.body;
        this.tagIcon = 'v';
        this.newTag = true;
      })
    },
    // 显示所有标签
    getTag:function() {
      if (this.tags.length > 0){
        this.tags = [];
        this.tagIcon = '>';
        this.newTag = !this.newTag;
      }else{
        this.getTagFun()
      }
    },
    // 显示标签下的所有文章
    clickTag:function(tag) {
        for (var t in this.tags){
          this.tags[t].tag_active = false
        }
        this.$http.get('http://127.0.0.1:8000/api/articles_admin/?format=json&tag='+tag.id).then(response => {
          this.articles = response.body;
          this.allArticleActive = false;
          tag.tag_active = !tag.tag_active;
        }, response => {
            //error
        })
    },
    // 修改文章
    postArticle:function() {
        this.$http.put('http://127.0.0.1:8000/api/article_admin/'+this.article_info.id+'/',{
            id:this.article_info.id,
            title: this.article_info.title,
            content: this.article_info.content
      },).then(response => {
        this.msg = '保存成功';
        this.msgShow = true;
        this.getArticleInfo(this.article_info);
        this.getArticleList()
      })
    },
    closeMsg:function() {
        this.msgShow = false
    },
    // 显示新建标签的input
    addTagBtn:function() {
        this.tagInput = !this.tagInput
    },
    // 新建标签
    postTag:function() {
        this.$http.post('http://127.0.0.1:8000/api/tags_admin/?format=json', {
            tag: this.tagName
        }).then(response => {
            this.msg = '标签创建成功';
            this.msgShow = true;
            this.getTagFun();
            this.tagInput = false;
            this.tagName=''
        })
    },
    // 显示标签删除按钮
    delTagBtn:function() {
        this.delTagIcon = !this.delTagIcon
    },
    deleteTag:function(id) {
        this.$http.delete('http://127.0.0.1:8000/api/tag/'+id+'/',{
            id:id
        }).then(response => {
            alert('delete it!!')
            this.getTagFun()
        })
    },
    // 显示可添加标签的列表
    showAddArtTagLi:function() {
        this.tagList = !this.tagList
        this.$http.get('http://127.0.0.1:8000/api/tags_admin/?format=json').then(response => {
        this.articleTagList = response.body;
      })
    },
    // 给文章添加标签
    addArticleTag:function(id) {
        var article_id = this.article_info.id
        this.$http.post('http://127.0.0.1:8000/api/article_admin/'+article_id+'/',{
            tag_id:id
        }).then(response => {
            this.getArticleInfo(this.article_info)
        })
    },
    addNewArticle:function() {
        this.postArticleBtn = false;
        this.addNewArticleBtn = true;
        this.article_info = [];
        this.addArticleTagIcon = false;
        for (var a in this.articles){
            this.articles[a].article_active = false
        };
    },
    addNewArticlePost:function() {
        this.$http.post('http://127.0.0.1:8000/api/articles_admin/', {
            title: this.article_info.title,
            content: this.article_info.content
        }).then(response => {
            this.getArticleList();
            this.addArticleTagIcon = true
        })
    },
    deleteArticle:function() {
        var article_id = this.article_info.id
        this.$http.delete('http://127.0.0.1:8000/api/article_admin/'+article_id+'/').then(response => {
            this.getArticleList()
        })
    }
  }
  
}
</script>

<style src="../css/email.css"></style>


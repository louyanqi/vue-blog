<template>

  <div id="main">
  
    <component v-on:loginSuccess="watchlogin" v-bind:is="currentView"></component>
    
  </div>

</template>

<script>
import Login from './login.vue'


export default {
  data () {
    return {
      request_user:'',
      msg: '',
      currentView: 'login-page',
    }
  },
  mounted(){
    this.requestUser();
     document.title = 'Manage'
  },
  methods:{
    requestUser:function() {
      this.$http.get('http://127.0.0.1:8000/api/request_user/', {
        headers:{
          Authorization: 'Token ' + Cookies.get('token')
        }
      }).then(response => {
        this.request_user = response.body.user;
        this.watchlogin()
      }, response => {
        this.currentView = 'login-page'
      })
    },
    watchlogin:function() {

      this.$emit('watchlogin')
    }
  },
  components: {
    'login-page': Login,

  }
}
</script>

<style src="../css/manage.css"></style>

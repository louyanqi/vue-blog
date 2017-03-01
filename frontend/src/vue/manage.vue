<template>

  <div id="main">
  
    <component v-on:loginSuccess="watchlogin" v-bind:is="currentView"></component>
    
  </div>

</template>

<script>
import Login from './login.vue'
import Admin from './admin.vue'

export default {
  data () {
    return {
      request_user:'',
      msg: '',
      currentView: 'admin-page',
    }
  },
  mounted(){
    this.requestUser()
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
      this.currentView = 'admin-page';
      this.$emit('watchlogin')
    }
  },
  components: {
    'login-page': Login,
    'admin-page': Admin,
  }
}
</script>

<style src="../css/manage.css"></style>

<template>
<div>

    <div class="pure-form" id="manage-login-form" style="width: 300px;margin: auto;">
      <div class="msg animated fadeIn">{{msg}}</div>
      <input v-model="username" class="pure-input" type="text" placeholder="username" style="margin-top: 50px;margin-bottom: 10px;width: 300px;"><br>
      <input v-model="password" class="pure-input" type="password" placeholder="password" style="margin-bottom: 10px;width: 300px;"><br>
      <button @click="logIn" style="width: 300px" class="pure-button">Sign in</button>
    </div>
    
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      username:'',
      password:'',
      msg: '',
    }
  },
  mounted() {
     document.title = 'Login',
     this.requestUser(),
     this.log()
  },
  methods:{
    log:function() {
      this.$emit('log')
    },
    logIn:function() {
      axios.post('http://127.0.0.1:8000/api/login/',{
        username: this.username,
        password: this.password
      },).then(function(response) {
        Cookies.set('token', response.data.token, { expires: 365});
        window.location.href = '/manage/'
	    })
      .catch(function(error){
        this.msg = '帐号或密码错误'
      })
    },
    requestUser:function() {
      axios.get('http://127.0.0.1:8000/api/request_user/',{
        headers:{ 'Authorization': 'Token ' + Cookies.get('token') }
      }).then(function(response){
        window.location.href = '/manage/'
      })
      .catch(function(){

      })
    },
  }
}
</script>
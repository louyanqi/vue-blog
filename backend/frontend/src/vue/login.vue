<template>
<div>
	<div class="header animated fadeIn" style="background-image: url('src/image/head.jpeg');">
        <h1>Manage</h1>
    </div>
    <div class="pure-form" id="manage-login-form">
      <div class="msg animated fadeIn">{{msg}}</div>
      <input v-model="username" class="pure-input" type="text" placeholder="username" style="margin-top: 100px"><br>
      <input v-model="password" class="pure-input" type="password" placeholder="password"><br>
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
     this.requestUser()
  },
  methods:{
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
      // axios.get('http://127.0.0.1:8000/api/request_user/', {
      //   headers:{
      //     Authorization: 'Token ' + Cookies.get('token')
      //   }
      // }).then(function(response) {
      //   window.location.href = '/manage/'
      // }
      // .catch(function(error){
      //   // error
      // })
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
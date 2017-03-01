<template>
<div>
	<div class="header animated fadeIn">
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
export default {
  data () {
    return {
      username:'',
      password:'',
      msg: '',
    }
  },
  created() {
     document.title = 'Login'
  },
  methods:{
    logIn:function() {
      this.$http.post('http://127.0.0.1:8000/api/login/',{
        username: this.username,
        password: this.password
      },).then(response => {
        Cookies.set('token', response.data.token, { expires: 365});
        this.loginSuccess()
	    }, response => {
	      this.msg = '帐号或密码错误'
	    })
    },
    loginSuccess:function() {
    	console.log('loginSuccess')
    	this.$emit('loginSuccess')
    }
  }
}
</script>
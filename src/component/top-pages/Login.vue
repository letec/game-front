<template>
  <div class="container">
    <div class="row login">
      <div class="col-md-12 login-logo">
        <router-link to="/" class="col-md-12 reg-logo">
          首页
        </router-link>
      </div>
      <div class="col-md-12 login-info">
        <strong style="font-size:22px;">一个账号，</strong><b style="font-size:24px;">尽情玩转网页游戏！</b> 
      </div>
    </div>
    <div class="row">
      <div class="login-form">
        <div class="login-form-input">
          <input type="text" ref="username" placeholder="账号" />
          <input type="text" ref="password" placeholder="密码" />
        </div>
        <div class="login-form-button">
          <span class="login-span" @click="login()">登&nbsp;&nbsp;&nbsp;陆</span>
        </div>
        <div class="login-form-bottom">
          <router-link to="/forget" class="forget-span">无法登陆?</router-link>
          <span class="reg-span">没有账号 <router-link to="/signin">立即注册</router-link></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    login(){
      let username = this.$refs.username.value;
      let password = this.$refs.password.value;
    }
  }
}
</script>

<style lang="scss">
  .login { padding: 50px; text-align: center; }
  .login-logo { height: 43px; }
  .login-info { height: 42px; margin-top:20px; }
  .login-form {
    margin: 0 auto;
    border: 1px solid #c9242b;
    text-align: center;
    width: 400px;
  }
  .login-form-input {
    padding: 30px 30px;
  }
  .login-form input {
    width: 344px;
    height: 42px;
    padding: 2px 15px;
    margin-bottom: 30px;
    font-size: 14px;
  }
  .login-form input:focus {
    outline: none;
    border: 1px solid #c9242b;
  }
  .login-form-button span {
    margin: 0 auto;
    display: block;
  }
  .login-span {
    line-height: 42px;
    height: 42px;
    width: 342px;
    background-color: #c9242b;
    color: white;
    font-size: 18px;
    cursor: pointer;
  }
  .login-span:hover {
    background-color: rgba(201, 36, 43, 0.8);
  }
  .login-form-bottom {
    margin: 15px 0 15px 0;
    text-align: center;
  }
  .login-form-bottom a {
    color: #c9242b;
    text-decoration: none;
  }
  .login-form-bottom a:hover{
    color: rgba(201, 36, 43, 0.8);
  }
  .forget-span {
    display: block;
    margin-bottom: 10px;
    height: 35px;
    padding-top: 10px;
    font-size: 14px;
  }
  .reg-span {
    font-size: 14px;
    display: block;
    height: 42px;
    line-height: 42px;
    border: 1px solid #c7c7c7;
    width: 342px;
    margin: 0 auto;
  }
  .reg-span a {
    color: #c9242b;
  }
</style>
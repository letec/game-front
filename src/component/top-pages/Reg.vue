<template>
  <div class="container">
    <div class="row reg">
      <router-link to="/" class="col-md-12 reg-logo">
        屌丝游戏
      </router-link>
      <div class="col-md-12 reg-info">
        畅玩
      </div>
    </div>
    <div class="row">
      <div class="reg-form">
        <div class="reg-form-input">
          <input type="text" ref="username" placeholder="账号" />
          <input type="text" ref="password" placeholder="登陆密码" />
          <input type="text" ref="re-password" placeholder="确认密码" />
        </div>
        <div class="reg-form-button">
          <img src="scsc" rel="vcodeImg" />
          <input type="text" ref="vCode" placeholder="验证码" />
          <span class="reg-ok" rel="reg-btn">注册我的账号</span>
        </div>
        <div class="reg-form-bottom">
          <span class="reg-span">已有账号 <router-link to="/login">立即登陆</router-link></span>
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
  created () {
  },
  methods:{
  }
}
</script>

<style lang="scss">
  .reg { padding: 50px; text-align: center; }
  .reg-logo { height: 43px; }
  .reg-info { height: 42px; margin-top:20px; }
  .reg-form {
    margin: 0 auto;
    border: 1px solid #c9242b;
    text-align: center;
    width: 400px;
  }
  .reg-form-input {
    padding: 30px 30px 0px 30px;
  }
  .reg-form input {
    width: 344px;
    height: 42px;
    padding: 2px 15px;
    margin-bottom: 25px;
    font-size: 14px;
  }
  .reg-form input:focus {
    outline: none;
    border: 1px solid #c9242b;
  }
  .reg-form-button span {
    clear: both;
    margin-bottom: 15px;
    display: block;
  }
  .reg-ok {
    line-height: 42px;
    height: 42px;
    width: 342px;
    background-color: #c9242b;
    color: white;
    font-size: 18px;
    cursor: pointer;
  }
  .reg-ok:hover {
    background-color: rgba(201, 36, 43, 0.8);
  }
  .reg-form-bottom {
    margin: 15px 0 15px 0;
    text-align: center;
  }
  .reg-form-bottom a {
    color: #c9242b;
    text-decoration: none;
  }
  .reg-form-bottom a:hover {
    color: rgba(201, 36, 43, 0.8);
  }
  .reg-span {
    display: block;
    font-size: 14px;
    height: 42px;
    line-height: 42px;
    border: 1px solid #c7c7c7;
    width: 342px;
    margin: 0 auto;
  }
  .reg-form-button {
    padding: 5px 30px 0px 30px;
  }
  .reg-form-button input {
    width: 60%;
    float: left;
  }
  .reg-form-button img {
    float: right;
    width: 102px;
    height: 42px;
  }
</style>
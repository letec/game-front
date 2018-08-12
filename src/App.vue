<template>
  <div class="container-fluid">
      <div class="row">
        <div class="col-md-7 header">
          <div class="row header">
            <div class="header-logo">123</div>
            <div class="header-menu">
              <ul>
                <li><router-link to="/">首页</router-link></li>
                <li><router-link to="/about">关于我们</router-link></li>
              </ul>
            </div>
            <div class="header-guest">
              <div class="header-unlogin">
                <router-link to="/login">登陆</router-link>
                <span>|</span>
                <router-link to="/signin">注册</router-link>
              </div>
              <div class="header-login">
                <a ></a>
              </div>  
            </div>
          </div>
        </div>
      </div>
      <div class="row main">
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss">
  div, ul, li, a { margin: 0; padding: 0; }
  .header-menu ul { display: block; height: 100%; line-height: 90px; }
  .header-menu ul li { display: inline-block; margin-right: 3rem; }
  .header-menu ul li a { color: black;text-decoration: none; }
  .header-menu ul li a:hover { color: #c9242b; }
  .header {
    margin: 0 auto;
    height: 90px;
  } 
  .header-logo {
    width: 35%;
  }
  .header-menu {
    width: 35%;
  }
  .header-guest {
    text-align: right;
    line-height: 90px;
    width: 30%;
  }
  .main {
    height: 620px;
  }
  .header-guest a { color: rgb(58, 58, 58); text-decoration: none; }
  .header-guest a:hover { color: #c9242b; }
  .header-unlogin { font-size: 0.9em; }
  .header-unlogin span {
    margin-left: 0.8rem;
    margin-right: 0.8rem;
  }
</style>

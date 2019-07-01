<template>
    <div class="container">
        <div class="row reg">
            <router-link to="/" class="reg-logo"></router-link>
            <div class="col-md-12 reg-info">
                <strong style="font-size:22px;">一个账号，</strong><b style="font-size:24px;">尽情玩转网页游戏！</b>
            </div>
        </div>
        <div class="row">
            <div class="reg-form">
                <div class="reg-form-input">
                    <input type="text" ref="username" placeholder="账号 5~16位字母和数字组成" />
                    <input type="password" ref="password" placeholder="密码 6~16位字母和数字组成" />
                    <input type="password" ref="re-password" placeholder="请确认密码" />
                </div>
                <div class="reg-form-button">
                    <img @click="verifyCode()" ref="vcodeImg" />
                    <input ref="vCode" type="text" placeholder="验证码" />
                    <span class="reg-ok" @click="doRegister()">注册我的账号</span>
                </div>
                <div class="reg-form-bottom">
                    <span class="reg-span">已有账号 <router-link to="/signin">立即登陆</router-link></span>
                </div>
            </div>
        </div>
        <footer-view></footer-view>
    </div>
</template>
<script>
    import global from "../../logic/global"
    export default {
        data() {
            return {
                vcodeID: ""
            }
        },
        mounted() {
            this.verifyCode();
        },
        methods: {
            doRegister() {
                let username = this.$refs.username.value;
                let password = this.$refs.password.value;
                let repassword = this.$refs.password.value;
                let vCode = this.$refs.vCode.value;
                let flag = true;
                if (!username.match(/^[a-zA-Z0-9]{5,16}$/)) {
                    this.$layer.msg("请输入合法的用户名");
                    flag = false;
                }
                if (!password.match(/^[a-zA-Z0-9]{6,16}$/)) {
                    this.$layer.msg("请输入合法的密码!")
                    flag = false;
                }
                if (password != repassword) {
                    this.$layer.msg("两次输入的密码不一致!")
                    flag = false;
                }
                if (!flag) {
                    this.verifyCode()
                    return false;
                }
                let params = {
                    username: username,
                    password: password,
                    repassword: repassword,
                    vCode: vCode,
                    vcodeID: this.vcodeID
                }
                this.$axios.post(global.apiUrl + '/signup', JSON.stringify(params)).then(resp => {
                    this.$layer.msg(resp.data.msg);
                    if (resp.data.result == true) {
                        setTimeout(() => {
                            this.$router.push("/signin")
                        }, 1500)
                    }
                }).catch(error => {
                    this.$layer.msg(error);
                });
            },
            verifyCode() {
                this.$axios.get(global.apiUrl + '/captcha?v=' + (Math.floor(Math.random() * 100))).then(resp => {
                    this.$refs.vcodeImg.setAttribute("src", resp.data.img);
                    this.vcodeID = resp.data.msg;
                }).catch(error => {
                    this.$layer.msg(error);
                });
            }
        }
    }
</script>

<style scoped>
    .reg {
        padding: 50px;
        text-align: center;
    }

    .reg-logo {
        height: 43px;
    }

    .reg-info {
        height: 42px;
        margin-top: 20px;
    }

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
        width: 120px;
        height: 42px;
        cursor: pointer;
    }

    .reg-logo {
        margin: 0 auto;
        text-align: center;
        display: block;
        height: 66px;
        width: 64px;
        background: url(https://static.web.sdo.com/copyright/pic/shengqu/shengqu-logo.png) no-repeat;
    }
</style>
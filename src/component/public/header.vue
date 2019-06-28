<template>
    <div class="col-md-7 header">
        <div class="row header">
            <div class="header-logo">
                <a class="logo"></a>
            </div>
            <div class="header-menu">
                <ul>
                    <li><span @click="activeClick(1)" v-bind:class="{ active: activeTarget == 1 }">首页</span></li>
                    <li><span @click="activeClick(2)" v-bind:class="{ active: activeTarget == 2 }">关于我们</span></li>
                </ul>
            </div>
            <div class="header-guest">
                <div class="header-unlogin">
                    <router-link to="/login">登陆</router-link>
                    <span>|</span>
                    <router-link to="/signin">注册</router-link>
                </div>
                <div class="header-login">
                    <a></a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeTarget: 0
            }
        },
        created() {
            this.activeTarget = typeof this.$route.query.activeTarget != "undefined" ? this.$route.query.activeTarget :
                1;
        },
        methods: {
            activeClick(flag) {
                switch (flag) {
                    case 1:
                        this.$router.push({
                            path: '/',
                            query: {
                                activeTarget: 1
                            }
                        });
                        break;
                    case 2:
                        this.$router.push({
                            path: '/about',
                            query: {
                                activeTarget: 2
                            }
                        });
                        break;
                }
            }
        }
    }
</script>
<style>
    .active {
        color: #e5004f;
    }
    .header-menu ul {
        display: block;
        height: 100%;
        line-height: 90px;
    }

    .header-menu ul li {
        display: inline-block;
        margin-right: 3rem;
        cursor: pointer;
    }

    .header-menu ul li span {
        font-size: 16px;
    }

    .header-menu ul li a:hover {
        color: #c9242b;
    }

    .header {
        margin: 0 auto;
        height: 90px;
    }

    .header-logo {
        width: 33%;
    }

    .header-menu {
        width: 35%;
    }

    .header-guest {
        text-align: right;
        line-height: 90px;
        width: 30%;
    }

    .header-guest a {
        color: rgb(58, 58, 58);
        text-decoration: none;
    }

    .header-guest a:hover {
        color: #e5004f;
    }

    .header-unlogin {
        font-size: 14px;
    }

    .header-unlogin span {
        margin-left: 0.8rem;
        margin-right: 0.8rem;
    }

    .logo {
        display: block;
        float: left;
        width: 321px;
        height: 46px;
        margin-top: 20px;
        border: 0;
        background-image: url(http://www.sdo.com/static2015/img/logo@1x.png)
    }

</style>
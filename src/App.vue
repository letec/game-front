<template>
    <div>
        <header-view></header-view>
        <div id="swiper_main" class="col-md-12" style="margin:0;padding:0" @mouseleave="menuHover(false, -1)">
            <div class="swiper-container" :style="{'height': swiperHeight}">
                <div class="swiper-wrapper">
                    <div v-for="(item, i) in imgList" class="swiper-slide"
                        :style="{'background-image': 'url('+item+')','height': swiperHeight}" v-bind:key="i">
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <div class="menu_wrap" style="left: 50px; top: 100px;">
            <ul>
                <li v-bind:class="{cur:currentMenu==i}" @mouseenter="menuHover(true, i)" v-for="(item,i) in gameList"
                    v-bind:key="i">
                    <a href="javascript:void(0);" class="menu_link">
                        <h3>{{item.type}}</h3>
                        <span class="word">{{item.code}}</span>
                        <div class="bg"></div>
                    </a>
                    <div class="drop_box" :style="{'display':currentMenu==i?'block':'none'}">
                        <span class="arrow" :style="{'top':35+(item.number-1)*160+'px'}"></span>
                        <div class="drop_main">
                            <div class="drop_t">
                                <ul>
                                    <li v-for="(img,k) in item.imgs" v-bind:key="k" style="display:inline-block">
                                        <a href="http://woool.sdo.com" class="pic" target="_blank">
                                            <img class="banner_img"
                                                src="http://spread.sdo.com/ipic/20190605/1559700367768299.jpg">
                                            <span class="go"></span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="drop_b">
                                <div class="drop_b_box">
                                    <ul class="type clearfix">
                                        <li v-for="(game,g) in item.list" class="showDetail none" v-bind:key="g">
                                            <router-link :to="game.path" :class="{'hot':game.icon=='icon_2'}" class="listLink link" target="_blank">
                                                <i :class="game.icon"></i>{{game.name}}
                                            </router-link>
                                            <div class="detail_box" style="display: none;">
                                                <span class="arrow_1"></span>
                                                <div class="detail_main">
                                                    <div class="img">
                                                        <div class="detail_mask"></div>
                                                        <img :src="game.img" class="detailIcon">
                                                    </div>
                                                    <div class="info">
                                                        <div class="info_t">
                                                            <div class="info_link">
                                                                <router-link :to="game.path" class="btn btn_yellow"
                                                                    target="_blank">进入游戏</router-link>
                                                            </div>
                                                            <h3 class="detailTitle">{{game.name}}</h3>
                                                        </div>
                                                        <p class="detailDesc">{{game.description}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <footer-view></footer-view>
    </div>
</template>

<script>
    import Swiper from "swiper";
    import global from "./logic/global"
    import "swiper/dist/css/swiper.css";

    export default {
        data() {
            return {
                swiperHeight: document.documentElement.clientHeight - 90 + 'px',
                imgList: [
                    require('./assets/images/website/wuzi_b_1.jpg'),
                    require('./assets/images/website/chess_b_1.jpg'),
                    require('./assets/images/website/dizhu_b_2.jpg')
                ],
                currentMenu: -1,
                menuTop: document.documentElement.clientHeight - 850 + 'px',
                gameList: global.gameConfig
            };
        },
        mounted() {
            window.onresize = () => {
                this.swiperHeight = document.documentElement.clientHeight - 90 + 'px';
            };
            var swiper = new Swiper(".swiper-container", {
                direction: "vertical",
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                }
            });
            document.getElementById("swiper_main").onclick = () => {
                this.currentMenu = -1;
            };
        },
        methods: {
            menuHover(flag, i) {
                this.currentMenu = flag ? i : -1;
            }
        }
    };
</script>

<style scoped>
    .main {
        height: 620px;
    }

    .swiper-slide {
        background-size: 100% 100%;
    }

    .menu_wrap {
        position: absolute;
        width: 130px;
        height: 520px;
        top: 0;
        left: 50px;
        margin: 0px 0 0 0px;
        zoom: 1;
        z-index: 15;
    }

    .menu_link {
        box-sizing: border-box;
        text-align: center;
        background-image: url(http://www.sdo.com/static2015/img/menu_bg.png);
    }

    .menu_wrap ul li a:hover {
        text-decoration: none;
    }

    .menu_wrap ul li a.menu_link {
        width: 130px;
        height: 130px;
        display: block;
        position: relative;
    }

    .menu_wrap ul li a.menu_link h3 {
        color: #000;
        font-size: 22px;
        padding-top: 36px;
        margin-bottom: 10px;
        font-weight: normal;
    }

    .menu_wrap ul li.menu_item {
        position: relative;
        text-align: center;
        z-index: 2;
    }

    *,
    ::after,
    ::before {
        box-sizing: border-box;
    }

    h3 {
        display: block;
        font-size: 1.17em;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
    }

    .menu_wrap ul li a.menu_link h3 {
        color: #000;
        font-size: 22px;
        padding-top: 36px;
        font-weight: normal;
    }

    .menu_wrap ul li a.menu_link .word {
        color: #8E8F91;
        font-size: 13px;
    }

    .menu_wrap ul li.cur a.menu_link h3 {
        color: #d02229;
        font-size: 22px;
        font-weight: normal;
    }

    .menu_wrap ul li.cur a.menu_link .word {
        color: #f04e37;
        font-size: 13px;
    }

    .drop_box {
        position: absolute;
        width: 557px;
        left: 136px;
        top: 26px;
        text-align: left;
        z-index: 3;
    }

    .drop_box .arrow {
        position: absolute;
        left: 0;
        background: url(http://www.sdo.com/static2015/img/arrow_1.png) no-repeat;
        width: 12px;
        height: 24px;
    }

    .drop_box .drop_main {
        text-align: left;
        margin-left: 20px;
    }

    .drop_box .drop_main .drop_t {
        margin-right: -6px;
        overflow: hidden;
        zoom: 1;
    }

    .drop_box .drop_main .drop_b {
        background: url(http://www.sdo.com/static2015/img/bg_tra.png) repeat;
        zoom: 1;
        margin-top: 6px;
        min-height: 380px;
    }

    .drop_box .drop_main .drop_t li {
        position: relative;
        overflow: hidden;
        margin-right: 6px;
        display: inline;
    }

    .drop_box .drop_main .drop_t li img {
        display: block;
        width: 175px;
        height: 90px;
        transform: scale(1);
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
        transition: all 0.5s;
        -moz-transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -o-transition: all 0.5s;
        -ms-transition: all 0.5s;
    }

    .drop_box .drop_main .drop_t li .pic:hover img {
        transform: scale(1.1);
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -ms-transform: scale(1.1);
        -o-transform: scale(1.1);
    }

    .drop_box .drop_main .drop_t .go {
        background: url(http://www.sdo.com/static2015/img/btn_go.png) no-repeat;
        width: 28px;
        height: 16px;
        display: block;
        position: absolute;
        bottom: 15px;
        right: 10px;
    }

    .drop_box .drop_main .drop_b .type {
        padding: 20px 0;
    }

    .drop_box .drop_main .drop_b .type li {
        padding: 0px 0 15px 20px;
        width: 176px;
        display: inline;
        float: left;
        position: relative;
        z-index: 5;
        border-right: 1px solid #b8b8b8;
    }

    .drop_box .drop_main .drop_b .type i {
        width: 18px;
        height: 18px;
        display: inline;
        margin-right: 8px;
        float: right;
        vertical-align: middle;
    }

    .drop_box .drop_main .drop_b .type .icon_1 {
        background: url(http://www.sdo.com/static2015/img/icon.png) no-repeat left -40px;
    }

    .drop_box .drop_main .drop_b .type .icon_2 {
        background: url(http://www.sdo.com/static2015/img/icon.png) no-repeat left -60px;
    }

    .drop_box .drop_main .drop_b a.link:hover,
    .drop_box .drop_main .drop_b a.hot {
        color: #f04e37;
        font-weight: bold;
    }
</style>
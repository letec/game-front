<template>
    <div>
        <header-view></header-view>
        <div class="banner_main">
            <h3>关于趣玩 <span>ABOUT</span></h3>
        </div>
        <div class="about_main" :style="{'height': mainHeight}">
            <div class="about_des tab_content on" style="display: block;">
                <div class="cell_title">
                    简介<span>INTRODUCTION</span>
                </div>
                <div class="about_intro">
                    <div class="img"><img src="/static/images/quwan/shengqugames_intro.jpg" alt=""></div>
                    <div class="intro">
                        <p>
                            趣玩是全球领先的网络游戏开发商、运营商和发行商。立足“科技赋能文化”的新文化产业定位，趣玩全面推进“精品化”、“全球化”、“新文化”三大战略，以科技为骨、文化为翼，用科技激活文化的精髓，致力于成为一家打造极致互动体验的科技文化企业。
                        </p>
                        <p>
                            2001年，趣玩运营《斗地主》，创下当时全球休闲在线游戏运营纪录，开创了中国网络游戏时代；2005年，首创免费模式，引领了全球游戏行业模式变革。
                        </p>
                        <p>
                            作为中国游戏产业开创者与变革者，趣玩不断精进游戏品质，先后推出和运营了《五子棋》、《中国象棋》、《21点》、《贪吃蛇》等多款精品游戏，注册用户超过21亿。
                        </p>
                        <p>
                            2019年3月31日起，正式启用"趣玩"作为全新的品牌标识，以全新的理念与姿态，探索极限科技，构建新文化产业的绿色生态，把优秀的中国文化带向全球。
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <footer-view></footer-view>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                mainHeight: document.documentElement.clientHeight - 380 + 'px',
            }
        },
        mounted() {
            window.onresize = () => {
                this.mainHeight = document.documentElement.clientHeight - 380 + 'px';
            };
        }
    }
</script>

<style scoped>

    .main {
        height: 620px;
    }

    .about_main .tab_content {
        width: 1200px;
        margin: 0 auto;
        position: relative;
    }

    html,
    body,
    form,
    fieldset,
    p,
    div,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        -webkit-text-size-adjust: none;
    }

    .cell_title {
        font-size: 24px;
        color: #000;
        margin: 60px 0 40px;
        font-family: 'Microsoft Yahei';
        font-weight: 400;
        border-left: 3px solid #e4004f;
        padding-left: 12px;
    }

    .about_main .about_intro {
        font-size: 15px;
    }

    .about_main .about_intro .img {
        float: right;
        margin-top: -60px;
    }

    .about_main .about_intro .intro {
        margin-right: 530px;
    }

    .about_main .about_intro .intro p {
        margin-bottom: 34px;
        line-height: 1.8;
        color: #666;
    }

    .banner_main {
        bottom: 0;
        text-align: center;
        width: 100%;
        height: 190px;
        background-image: url(/static/images/quwan/about_banner.png);
    }

    .banner_main h3 {
        font-size: 42px;
        color: #fff;
        font-weight: 700;
        padding-top: 56px;
    }

    .banner_main h3 span {
        font-family: 'Myriad Pro', arial;
        font-weight: 400;
        display: block;
        font-size: 30px;
        margin-top: 10px;
    }

    .cell_title span {
        font-size: 18px;
        color: #9e9d9d;
        padding-left: 10px;
        font-family: arial;
    }
</style>
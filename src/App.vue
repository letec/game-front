<template>
    <div>
        <header-view></header-view>
        <div class="col-md-12" style="margin:0;padding:0">
            <div class="swiper-container" :style="{'height': swiperHeight}">
                <div class="swiper-wrapper">
                    <div v-for="(item, i) in imgList" class="swiper-slide" :style="{'background-image': 'url('+item+')','height': swiperHeight}" v-bind:key="i">
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <footer-view></footer-view>
    </div>
</template>

<script>
    import Swiper from "swiper";
    import "swiper/dist/css/swiper.css";

    export default {
        data() {
            return {
                swiperHeight: document.documentElement.clientHeight - 90 + 'px',
                imgList: [
                    require('./assets/images/website/tg_image_942048547.jpg'),
                    require('./assets/images/website/tg_image_1104544829.jpg'),
                    require('./assets/images/website/tg_image_1768057613.jpg')
                ]
            };
        },
        mounted() {
            var swiper = new Swiper(".swiper-container", {
                direction: "vertical",
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                }
            });
            window.onresize = function() {
                this.swiperHeight = document.documentElement.clientHeight - 90 + 'px';
            };
        }
    };
</script>

<style lang="scss">
    div,
    ul,
    li,
    a {
        margin: 0;
        padding: 0;
    }

    .main {
        height: 620px;
    }

    .swiper-slide { 
        background-size: 100% 100%;
    }

</style>
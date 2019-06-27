<template>
  <div class="container-fluid">
    <header-view></header-view>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">Slide 1</div>
            <div class="swiper-slide">Slide 2</div>
            <div class="swiper-slide">Slide 3</div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <!-- 如果需要滚动条 -->
        <div class="swiper-scrollbar"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";

export default {
  data() {
    return {
      swiperOption: {
          direction: 'vertical',
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
    };
  },
  mounted() {
    var mySwiper = new Swiper('.swiper-container', {
      
    });
  }
};
</script>

<style lang="scss">
div, ul, li, a {
  margin: 0;
  padding: 0;
}
.main {
  height: 620px;
}
.swiper-container {
  height: 300px;
}
</style>

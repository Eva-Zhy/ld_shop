<template>
  <div class="swiper_shop">
    <div class="swiper-container" style="width: 100%; height: 100%;">
      <div class="swiper-wrapper">
        <div v-for="(item, index) in swiperImgs" :key="index" class="swiper-slide">
          <a :href="item.img_link">
            <img class="img100" :src="item.img_url">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  export default {
    data(){
      return {
        swiperImgs: []
      }
    },
    mounted(){
      var mySwiper = new Swiper('.swiper-container', {
        autoplay: true,
        loop: true
      })
    },
    created() {
      this.$http.post("https://ludianvr.com/test/wxmarket/advertisement", {}, {emulateJSON: true})
        .then(
          (response) => {
            response = response.body;
            if (response.status.state == 24001) {
              this.swiperImgs = response.content.content;
            }
          },
          (error) => {
            console.log(error);
          }
        )
    }
  }
</script>

<style scoped>
  .swiper_shop {
    float: left;
    width: 100%;
    height: 140px;
  }
</style>

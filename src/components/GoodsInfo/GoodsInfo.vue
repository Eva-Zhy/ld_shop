<template>
  <transition name="leftMove">
    <div v-show="showFlag" class="GoodsInfo-v" rel="V_GoodsInfo">
      <v-BackView :backTitle="backTitle" @back="back"></v-BackView>
      <div class="goods_window_img">
        <img class="window_img" src="./fangkuai.jpeg" />
      </div>
      <div class="goods_title">
          <div class="title">
            VR项目
          </div>
          <div class="price">
            ¥100-¥222
          </div>
      </div>
      <div class="line"></div>
      <div class="goods_info">
        <div class="info-left">

        </div>
        <div class="info-right">
          商品介绍
        </div>
      </div>
      <div class="goods_info_div">
        <img class="goods_img" src="./swiper.jpeg">
        <img class="goods_img" src="./swiper.jpeg">
        <img class="goods_img" src="./swiper.jpeg">
        <img class="goods_img" src="./swiper.jpeg">
        <img class="goods_img" src="./swiper.jpeg">
      </div>
      <div class="info_bar">
        <div class="bar_item">
          <div class="bar_btn">
              加入购物车
          </div>
        </div>
        <div class="bar_item">
          <div class="bar_btn" style="background-color: #ff3b0d">
            立即购买
          </div>
        </div>
        <div class="bar_item2">
          <div class="shopcar_img">
            <img class="img100" src="./gwc2.png" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
    import BackView from '../BackView/BackView'
    export default {
      data () {
        return {
          showFlag: false,
          backTitle: "商品详情"
        }
      },
      methods: {
        show() {
          this.showFlag = true;
        },
        back() {
          this.showFlag = false;
        }
      },
      components: {
        "v-BackView" : BackView
      }
    }
</script>

<style scoped>
  .shopcar_img{
    display: block;
    margin: 0 auto;
    height: 30px;
    width: 30px;
    margin-top: 10px;
  }
  .bar_btn{
    width: 90%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    float: left;
    margin-top: 10px;
    margin-left: 5%;
    background-color: #e6872f;
    border-radius: 3px;
    color: #fff;
  }
  .bar_item{
    width: 40%;
    height: 100%;
    float: left;
  }
  .bar_item2{
    width: 20%;
    height: 100%;
    float: left;
  }
  .info_bar{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 50px;
    background-color: #fff;
  }
  .goods_img{
    width: 100%;
    float: left;
  }
  .goods_info_div{
    width: 100%;
    height: auto;
    float: left;
  }
  .info-right{
    width: 96%;
    height: 30px;
    line-height: 30px;
    float: left;
    padding-left: 2%;
    border-bottom: 1px solid #e4e4e4;
  }
  .info-left{
    width: 2%;
    height: 30px;
    float: left;
    background-color: #ff3b0d;
    border-bottom: 1px solid #ff3b0d
  }
  .goods_info{
    width: 100%;
    height: 30px;
    float: left;
  }
  .line{
    width: 100%;
    height: 10px;
    float: left;
    background-color: #e4e4e4;
  }
  .title{
    width: 90%;
    height: 20px;
    float: left;
    margin-top: 5px;
    margin-left: 5%;
    font-size: 15px;
    color: #999999;
  }
  .price{
    width: 90%;
    height: 20px;
    float: left;
    margin-left: 5%;
    color: red;
    font-size: 20px;
  }
  .goods_window_img {
    width: 90%;
    height: 300px;
    float: left;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 20px;
  }
  .window_img{
    width: 100%;
    height: 100%;
  }
  .GoodsInfo-v {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    width: 100%;
    background: #fff;
  }

  .goods_title{
    width: 100%;
    height: 60px;
    float: left;
    border-top: 1px solid #d1d1d1;
    border-bottom: 1px solid #d1d1d1;
  }

  .leftMove-enter-active {
    transform: translate3d(0, 0, 0);
    transition: all 0.4s;
  }

  .leftMove-leave-active {
    transition: all 0.4s;
    transform: translate3d(100%, 0, 0);

  }

  .leftMove-enter {
    transform: translate3d(100%, 0, 0);
  }

  .leftMove-leave {
    transform: translate3d(0, 0, 0);
  }
</style>

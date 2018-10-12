<template>
    <div class="bottom_bar">
        <router-link to="/">
        <div class="bar_item">
              <div class="img_div">
                  <img class="bar_img" src="./home2.png" />
              </div>
              <div class="bar_title">
                  首页
              </div>
        </div>
        </router-link>
        <router-link to="/shopcar">
        <div class="bar_item">
            <div class="img_div">
              <img class="bar_img" src="./gwc2.png" />
            </div>
            <div class="bar_title">
                  购物车
            </div>
        </div>
        </router-link>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
  .bottom_bar{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 50px;
  }
  .bar_item {
    width: 50%;
    height: 100%;
    float: left;
  }
  .img_div{
    width:100%;
    height: 25px;
    float: left;
    margin-top: 5px;
  }
  .bar_img {
    width: 25px;
    height: 25px;
    margin: 0 auto;
    display: block;
  }
  .bar_title{
    width: 100%;
    height: 20px;
    float: left;
    text-align: center;
    font-size: 12px;
  }
</style>

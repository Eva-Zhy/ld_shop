<template>
  <div class="bottom_bar">
    <router-link to="/">
      <div v-if="$store.state.page_status === 0" class="bar_item1" @click="changePageStatus0" >
           <!--:class="{ 'bar_item1':$store.state.page_status === 0,'bar_item2':$store.state.page_status === 1}">-->
        <div class="img_div">
          <img class="bar_img" :src="watch_home_img"/>
        </div>
        <div class="bar_title">
          首页
        </div>
      </div>
      <div v-if="$store.state.page_status === 1" class="bar_item2" @click="changePageStatus0" >
        <!--:class="{ 'bar_item1':$store.state.page_status === 0,'bar_item2':$store.state.page_status === 1}">-->
        <div class="img_div">
          <img class="bar_img" :src="watch_home_img"/>
        </div>
        <div class="bar_title">
          首页
        </div>
      </div>
      <div v-if="$store.state.page_status === 2" class="bar_item2" @click="changePageStatus0" >
        <!--:class="{ 'bar_item1':$store.state.page_status === 0,'bar_item2':$store.state.page_status === 1}">-->
        <div class="img_div">
          <img class="bar_img" :src="watch_home_img"/>
        </div>
        <div class="bar_title">
          首页
        </div>
      </div>


    </router-link>
    <router-link to="/shopcar">
      <div v-if="$store.state.page_status === 1" class="bar_item1" @click="changePageStatus1">
           <!--:class="{ 'bar_item2':$store.state.page_status === 0,'bar_item1':$store.state.page_status === 1 }">-->
        <div class="img_div">
          <img class="bar_img" :src="watch_gwc_img"/>
        </div>
        <div class="bar_title">
          购物车
        </div>
      </div>
      <div v-if="$store.state.page_status === 0" class="bar_item2" @click="changePageStatus1">
           <!--:class="{ 'bar_item2':$store.state.page_status === 0,'bar_item1':$store.state.page_status === 1 }">-->
        <div class="img_div">
          <img class="bar_img" :src="watch_gwc_img"/>
        </div>
        <div class="bar_title">
          购物车
        </div>
      </div>
      <div v-if="$store.state.page_status === 2" class="bar_item2" @click="changePageStatus1">
           <!--:class="{ 'bar_item2':$store.state.page_status === 0,'bar_item1':$store.state.page_status === 1 }">-->
        <div class="img_div">
          <img class="bar_img" :src="watch_gwc_img"/>
        </div>
        <div class="bar_title">
          购物车
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
  // 下面是导入两张图片的相对地址
  import home1 from './home1.png'
  import home2 from './home2.png'
  import gwc1 from './gwc1.png'
  import gwc2 from './gwc2.png'
  export default {
    data() {
      return {
        home_img: home1,
        gwc_img: gwc1
      }
    },
    methods: {
      changePageStatus0() {
        this.$store.state.page_status = 0;
      },
      changePageStatus1() {
        this.$store.state.page_status = 1;
        console.log(this.$store.state.page_status);
      }
    },
    computed: {
      watch_home_img()
      {
        if (this.$store.state.page_status == 0) {
          this.home_img = home1;
        } else {
          this.home_img = home2;
        }
        return this.home_img;
      }
      ,
      watch_gwc_img()
      {
        if (this.$store.state.page_status == 0) {
          this.gwc_img = "https://www.ludianvr.com/ldvr/h5/shop/img/gwc2.png";
        } else if (this.$store.state.page_status == 2) {
          this.gwc_img = "https://www.ludianvr.com/ldvr/h5/shop/img/gwc2.png";
        } else {
          this.gwc_img = "https://www.ludianvr.com/ldvr/h5/shop/img/gwc1.png";
        }
        return this.gwc_img;
      }
    }
  }
</script>

<style scoped>
  .bottom_bar {
    background-color: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 50px;
  }

  .bar_item1 {
    width: 50%;
    height: 100%;
    float: left;
    color: #fff;
    background-color: #ff7049;
  }

  .bar_item2 {
    width: 50%;
    height: 100%;
    float: left;
    color: #000;
    background-color: #ffffff;
  }

  .img_div {
    width: 100%;
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

  .bar_title {
    width: 100%;
    height: 20px;
    float: left;
    text-align: center;
    font-size: 12px;
  }
</style>

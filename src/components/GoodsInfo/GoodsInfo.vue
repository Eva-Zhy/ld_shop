<template>
  <div>
    <transition name="leftMove">
      <div  v-show="showFlag" class="GoodsInfo-v" rel="V_GoodsInfo">
        <div class="goods-v">
          <v-BackView :backTitle="backTitle" @back="back"></v-BackView>
          <div class="goods_window_img">
            <img class="window_img" :src="goodsData.detail_img_url"/>
          </div>
          <div class="goods_title">
            <div class="title">
              {{goodsData.name}}
            </div>
            <div class="price">
              ¥{{minPrice}}-{{maxPrice}}
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
            <img class="goods_img" :src="goodsData.introduce_img_url">
          </div>
        </div>
        <div class="info_bar">
          <div class="bar_item">
            <div class="bar_btn" @click="openSelect('car')">
              加入购物车
            </div>
          </div>
          <div class="bar_item">
            <div class="bar_btn" @click="openSelect('buy')" style="background-color: #ff3b0d">
              立即购买
            </div>
          </div>
          <div class="bar_item2">
            <router-link to="/shopcar">
              <div class="shopcar_img" @click="changePageStatus1">
                <img class="img100" src="https://www.ludianvr.com/ldvr/h5/shop/img/gwc2.png"/>
                <div v-if="$store.state.shopCarData.length!=0" class="shopcar_num">{{$store.state.shopCarData.length}}</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </transition>
    <v-SelectGoods  @GoOrder="goOrder" :SelectGoods="goodsData" :minPrice="minPrice" :maxPrice="maxPrice" :sureType="sureType"
                   ref="V_SelectGoods"></v-SelectGoods>
    <v-Order @back="back" :orderData="$store.state.orderData" ref="V_Order"></v-Order>
  </div>
</template>

<script type="text/ecmascript-6">
  import BackView from '../BackView/BackView'
  import SelectGoods from '../SelectGoods/SelectGoods'
  import Order from '../Order/Order'
  export default {
    props: {},
    data () {
      return {
        goodsData: {},
        showFlag: false,
        backTitle: "商品详情",
        minPrice: "",
        maxPrice: "",
        sureType: "",
        SelectGoods: {
          info: {
            img: {}
          },
          taocan: [{
            name: "套餐类型",
            type: 0,
            value: [
              "套餐A",
              "套餐B"
            ]
          },
            {
              name: "内容选择",
              type: 1,
              value: [
                "场景1",
                "场景2",
                "场景2",
                "场景2",
                "场景2",
                "场景2",
                "场景2",
                "场景2"
              ]
            }
          ]
        }
      }
    },
    methods: {
      goOrder(){
        console.log("goOrder");
        this.$refs.V_Order.show();
      },
      changePageStatus1() {
        this.$store.state.page_status = 1
      },
      show() {
        this.showFlag = true;
        this.$http.post(this.$store.state.webServer+"wxmarket/commonityconfig",
          {
            md5: this.$store.state.selectedMd5
          },
          {emulateJSON: true})
          .then(
            (response) => {
              response = response.body;
              if (response.status.state == 22001) {
                this.goodsData = response.content;
                this.minPrice = response.content.price_range[0];
                this.maxPrice = response.content.price_range[1];
              }
            },
            (error) => {
              console.log(error);
            }
          )
      },
      back() {
        this.showFlag = false;
      },
      openSelect(type) {
        this.sureType = type;
        this.$refs.V_SelectGoods.showlist();
      }
    },
    components: {
      "v-BackView": BackView,
      "v-SelectGoods": SelectGoods,
      'v-Order': Order
    },
    created() {
    }
  }
</script>

<style scoped>
  .shopcar_img {
    display: block;
    margin: 0 auto;
    height: 30px;
    width: 30px;
    margin-top: 10px;
  }

  .shopcar_num{
    position: absolute;
    right: 3%;
    width: 20px;
    height: 20px;
    top: 5%;
    border-radius: 50%;
    text-align: center;
    color: #fff;
    font-size: 12px;
    line-height: 20px;
    border: 1px solid #fff;
    background-color: #e61717;
  }

  .bar_btn {
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

  .bar_item {
    width: 40%;
    height: 100%;
    float: left;
  }

  .bar_item2 {
    width: 20%;
    height: 100%;
    float: left;
  }

  .info_bar {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 50px;
    background-color: #fff;
  }

  .goods_img {
    width: 100%;
    float: left;
  }

  .goods_info_div {
    width: 100%;
    height: auto;
    float: left;
  }

  .info-right {
    width: 96%;
    height: 30px;
    line-height: 30px;
    float: left;
    padding-left: 2%;
    border-bottom: 1px solid #e4e4e4;
  }

  .info-left {
    width: 2%;
    height: 30px;
    float: left;
    background-color: #ff3b0d;
    border-bottom: 1px solid #ff3b0d
  }

  .goods_info {
    width: 100%;
    height: 30px;
    float: left;
  }

  .line {
    width: 100%;
    height: 10px;
    float: left;
    background-color: #e4e4e4;
  }

  .title {
    width: 90%;
    height: 20px;
    float: left;
    margin-top: 5px;
    margin-left: 5%;
    font-size: 15px;
    color: #999999;
  }

  .price {
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

  .window_img {
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

  .goods-v {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 50px;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .goods_title {
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

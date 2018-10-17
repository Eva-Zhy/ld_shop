<template>
  <transition name="leftMove">
      <div v-show="showFlag" class="order" rel="V_Order">
        <v-BackView :backTitle="backTitle" @back="back"></v-BackView>
        <div class="address">
          <div v-if="$store.state.addressData.name == ''" class="miss_address" @click="goAddress">
            <div style="font-size: 50px;" class="address_text">+</div>
            <div class="address_text" style="line-height: 130px;">添加收货地址</div>
          </div>
          <div v-if="$store.state.addressData.name != ''" class="miss_address2">
            <div class="select_btn_v">
              <img class="select_icon2" src="./map.png"/>
            </div>
            <div class="right_div">
                <div class="right_name">
                    收货人：张三&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;15775108718
                </div>
                <div class="right_address">
                    收货地址：张三收货地址收货地址收货地址址收货地址
                </div>
            </div>
            <div class="right_div2">
              编辑
            </div>
          </div>
        </div>
        <div class="goods">
          <div class="info_v" v-for="(item,index) in $store.state.shopCarData" :key="index">
            <div class="goods_img_v">
              <span><img class="goods_img" :src="item.img"/></span>
            </div>
            <div class="goods_info">
              <div class="title">
                {{item.title}}
              </div>
              <div class="info">
                <div class="info_text">{{item.info}}</div>
              </div>
              <div class="price">
                <div class="price_div">
                  ￥{{item.price * item.count}}
                </div>
                <div class="price_num">
                  x{{item.count}}
                </div>
              </div>
            </div>
          </div>

          <div class="send">
            <div class="send_left">
              配送方式
            </div>
            <div class="send_right">
              快递 免邮
            </div>
          </div>
        </div>
        <div class="shop_car_bar">
          <div class="order_btn">
            提交订单
          </div>
          <div class="order_text">
            合计：<span style="color: #ff7049;">￥108.00</span>
          </div>
        </div>
      <v-Address ref="V_Address"></v-Address>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BackView from '../BackView/BackView'
  import Address from '../Address/Address'

  export default{
    data(){
      return {
        showFlag: false,
        backTitle: "确认订单",
      }
    },
    methods: {
      show() {
        this.showFlag = true;
      },
      back() {
        this.showFlag = false;
      },
      goAddress(){
        this.$refs.V_Address.show();
      }
    },
    components: {
      "v-BackView": BackView,
      "v-Address": Address
    }
  }
</script>

<style scoped>

  .select_btn_v {
    width: 10%;
    height: 100%;
    float: left;
  }
  .right_div {
    width: 70%;
    height: 100%;
    float: left;
    margin-left: 5%;
  }
  .right_div2 {
    width: 15%;
    height: 100%;
    float: left;
    font-size: 12px;
    line-height: 140px;
    text-align: center;
    color: #b6b6b6;
  }
  .right_name {
    width: 100%;
    height: 40px;
    float: left;
    font-size: 18px;
    margin-top: 20px;
  }
  .right_address {
    width: 100%;
    height: 40px;
    float: left;
    font-size: 13px;
  }
  .select_icon2 {
    width: 25px;
    height: 25px;
    display: block;
    padding: 5px;
    margin: 0 auto;
    margin-top: 45px;
  }

  .order_text {
    width: auto;
    height: 40px;
    line-height: 40px;
    float: right;
    font-size: 13px;
  }

  .order_btn {
    width: 90px;
    height: 40px;
    line-height: 40px;
    float: right;
    text-align: center;
    font-size: 13px;
    margin-left: 10px;
    background-color: #ff7049;
    color: #fff;
  }

  .shop_car_bar {
    width: 100%;
    height: 40px;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #fff;
    border-top: 1px solid #ebebeb;
  }

  .send_left {
    float: left;
    height: 100%;
    line-height: 40px;
    margin-left: 4%;
  }

  .send_right {
    height: 100%;
    line-height: 40px;
    float: right;
    margin-right: 4%;
  }

  .send {
    width: 100%;
    float: left;
    height: 40px;
    font-size: 12px;
    border-bottom: 1px solid #f0f0f0;
  }

  .price_num {
    float: right;
    font-size: 11px;
    margin-top: 5px;
  }

  .info_text {
    float: left;
    width: 100%;
    height: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .info_v {
    width: 100%;
    height: 100px;
    margin-top: 10px;
    float: left;
    border-bottom: 1px solid #f0f0f0;
  }

  .goods_img_v {
    width: 30%;
    height: 100%;
    text-align: center;
    display: table;
    float: left;
  }

  .goods_img {
    margin-top: 5px;
    width: 80px;
    height: 80px;
  }

  .price {
    width: 90%;
    height: 20px;
    float: left;
  }

  .price_div {
    width: auto;
    height: 15px;
    font-size: 11px;
    float: left;
    margin-top: 5px;
    color: #ff977c;
  }

  .info {
    width: 90%;
    height: 40px;
    float: left;
    color: #999999;
    font-size: 12px;
    margin-top: 3px;
    overflow: hidden;
  }

  .title {
    width: 80%;
    height: 20px;
    float: left;
    margin-top: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .goods_info {
    width: 70%;
    height: 100%;
    float: left;
  }

  .goods {
    width: 100%;
    height: auto;
    float: left;
  }

  .address_text {
    display: inline-block;
    height: 120px;
    line-height: 120px;
    vertical-align: top;
  }

  .miss_address2 {
    width: 100%;
    height: 120px;
    border-bottom: 1px solid #e9e9e9;
    border-top: 1px solid #e9e9e9;
  }
  .miss_address {
    width: 100%;
    height: 120px;
    line-height: 120px;
    text-align: center;
    color: #ff9b7f;
    border-bottom: 1px solid #e9e9e9;
    border-top: 1px solid #e9e9e9;
  }

  .address {
    width: 100%;
    float: left;
    height: 120px;
  }

  .order {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    width: 100%;
    background: #fff;
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

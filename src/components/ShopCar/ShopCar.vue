<template>
  <div>
    <div class="ShopCar">
      <div v-if="$store.state.shopCarData.length == 0" class="shopCarData0">
        购物车中还没有商品，赶紧选购吧！
      </div>
      <div v-if="$store.state.shopCarData.length > 0" v-for="(item,index) in $store.state.shopCarData" :key="index"
           class="goods_item">
        <div class="select_btn_v" @click="changeSelStatus(item)">
          <img v-if="!item.selStatus" class="select_icon" src="./selc2.png"/>
          <img v-if="item.selStatus" class="select_icon" src="./selc1.png"/>
        </div>
        <div class="goods_img_v">
          <span><img class="goods_img" :src="item.img"/></span>
        </div>
        <div class="goods_info">
          <div class="title">
            {{item.title}}
          </div>
          <div class="info">
            {{item.info}}
          </div>
          <div class="price">
            <div class="price_div">
              {{item.price*item.count}}
            </div>
            <div class="add_div">
              <div class="jian" @click="jian(item)">
                -
              </div>
              <div class="num">
                {{item.count}}
              </div>
              <div class="jia" @click="jia(item)">
                +
              </div>
            </div>
          </div>
          <div class="cancel" @click="deleteData(item)">
            <img src="./cha.png" class="img100 cancel_img"/>
          </div>
        </div>
        <div class="shop_car_bar">
          <div class="select_btn_v" @click="allSelect">
            <img v-if="!$store.state.allSelect" class="select_icon2" src="./selc2.png"/>
            <img v-if="$store.state.allSelect" class="select_icon2" src="./selc1.png"/>
          </div>
          <div class="select_text">
            全选
          </div>
          <div class="select_btn" @click="goOrder">
            结算（{{orders}}）
          </div>
          <div class="select_text2">
            合计：￥{{price}}
          </div>
        </div>
      </div>
    </div>
    <v-Order :orderData="orderData" ref="V_Order"></v-Order>
  </div>
</template>

<script>
  import Order from '../Order/Order'
  export default {
    data(){
      return {
        orderData: {},
        shopCarData: []
      }
    },
    computed: {
      price(){
        let allPrice = 0;
        for (let i = 0; i < this.$store.state.shopCarData.length; i++) {
          if (this.$store.state.shopCarData[i].selStatus) {
            allPrice += this.$store.state.shopCarData[i].price * this.$store.state.shopCarData[i].count;
          }
        }
        return allPrice;
      },
      orders(){
        let allOrders = 0;
        for (let i = 0; i < this.$store.state.shopCarData.length; i++) {
          if (this.$store.state.shopCarData[i].selStatus) {
            allOrders++;
          }
        }
        return allOrders;
      }
    },
    methods: {
      deleteData(item){
        console.log(item);
        console.log(this.$store.state.shopCarData);
        for (let i = 0; i < this.$store.state.shopCarData.length; i++) {
          if (item.md5 === this.$store.state.shopCarData[i].md5) {
            this.$store.state.shopCarData.splice(i,1);
          }
        }
        console.log(this.$store.state.shopCarData);
      },
      jian(item){
        if (item.count > 1) {
          item.count--;
        }
      },
      jia(item) {
        item.count++;
      },
      allSelect(){
        if (!this.$store.state.allSelect) {
          for (let i = 0; i < this.$store.state.shopCarData.length; i++) {
            this.$store.state.shopCarData[i].selStatus = true;
          }
          this.$store.state.allSelect = true;
        } else {
          for (let i = 0; i < this.$store.state.shopCarData.length; i++) {
            this.$store.state.shopCarData[i].selStatus = false;
          }
          this.$store.state.allSelect = false;
        }
        console.log(this.$store.state.shopCarData)
      },
      changeSelStatus(item) {
        if (item.selStatus) {
          item.selStatus = false;
          this.$store.state.allSelect = false;
        } else {
          item.selStatus = true;
          let trueNum = 0;
          for (let i = 0; i < this.$store.state.shopCarData.length; i++) {
            if (this.$store.state.shopCarData[i].selStatus) {
              trueNum++;
            }
          }
          if (trueNum == this.$store.state.shopCarData.length) {
            this.$store.state.allSelect = true;
          }
        }
      },
      goOrder(){
        if (this.orders == 0) {
          this.$toast("请选择需要购买的商品");
        } else {
          this.$store.state.orderData = [];
          for (let i = 0; i < this.$store.state.shopCarData.length; i++) {
            if (this.$store.state.shopCarData[i].selStatus) {
              this.$store.state.orderData.push(this.$store.state.shopCarData[i]);
            }
          }
          console.log(this.$store.state.orderData);
          this.$refs.V_Order.show();
        }
      }
    },
    components: {
      'v-Order': Order,
    }
  }
</script>

<style scoped>
  .cancel {
    width: 35px;
    height: 35px;
    position: absolute;
    right: 0;
    top: 0;
    background-image: url("./xx.png");
    background-size: 100% 100%;
  }

  .cancel_img {
    width: 12px;
    height: 12px;
    position: absolute;
    right: 5px;
    top: 5px;
  }

  .shopCarData0 {
    width: 100%;
    height: auto;
    text-align: center;
  }

  .select_btn {
    width: 80px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    float: right;
    background-color: #ff7049;
    color: #fff;
    text-align: center;
    border-radius: 10px;
    margin-top: 5px;
    margin-right: 5px;
  }

  .select_text {
    width: auto;
    height: 40px;
    line-height: 40px;
    font-size: 13px;
    float: left;
  }

  .select_text2 {
    width: auto;
    height: 40px;
    line-height: 40px;
    font-size: 13px;
    float: right;
    margin-right: 10px;
  }

  .shop_car_bar {
    width: 100%;
    height: 40px;
    position: fixed;
    left: 0;
    bottom: 50px;
    background-color: #fff;
    border-bottom: 1px solid #ebebeb;
  }

  .num {
    width: 30px;
    height: 15px;
    line-height: 13px;
    text-align: center;
    float: left;
    font-size: 11px;
  }

  .jian {
    width: 20px;
    height: 15px;
    line-height: 10.5px;
    text-align: center;
    float: left;
    font-size: 27px;
  }

  .jia {
    width: 20px;
    height: 15px;
    line-height: 11.5px;
    text-align: center;
    float: right;
    font-size: 21px;
  }

  .add_div {
    width: 70px;
    height: 15px;
    float: right;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #d7d7d7;
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
    line-height: 19px;
    background-color: #f5f5f5;
    margin-top: 3px;
    word-break: break-all;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .title {
    width: 80%;
    height: 20px;
    float: left;
    margin-top: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .goods_info {
    width: 60%;
    height: 100%;
    float: left;
    position: relative;
    overflow: hidden;
  }

  span {
    display: table-cell;
    width: 80px;
    height: 80px;
    vertical-align: middle;
  }

  .goods_img {
    margin-top: 5px;
    width: 80px;
    height: 80px;
  }

  .goods_img_v {
    width: 30%;
    height: 100%;
    text-align: center;
    display: table;
    float: left;
  }

  .select_icon {
    width: 20px;
    height: 20px;
    display: block;
    padding: 5px;
    margin: 0 auto;
    margin-top: 40px;
  }

  .select_icon2 {
    width: 20px;
    height: 20px;
    display: block;
    padding: 5px;
    margin: 0 auto;
    margin-top: 5px;
  }

  .select_btn_v {
    width: 10%;
    height: 100%;
    float: left;
  }

  .ShopCar {
    width: 100%;
    /*height: auto;*/
    /*float: left;*/
    background-color: #f1f1f1;
    overflow: scroll;
    position: absolute;
    top: 0;
    bottom: 95px;
    left: 0;
  }

  .goods_item {
    width: 90%;
    height: 110px;
    float: left;
    margin-left: 5%;
    margin-top: 13px;
    border-radius: 12px;
    background-color: #fff;
    overflow: hidden;
  }
</style>

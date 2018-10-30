<template>
  <div>
    <transition name="listFold">
      <div class="selectGoods-list" rel="V_SelectGoods" v-show="listShow">
        <div class="info">
          <div class="goods_img">
            <img class="img100" :src="SelectGoods.purchase_img_url">
          </div>
          <div class="goods_info">
            <div class="price">￥{{price}}</div>
            <br/>
            <div class="inventory">库存{{SelectGoods.count}}件</div>
            <div class="package">选择 套餐</div>
          </div>
        </div>
        <div v-for="(item, index) in SelectGoods.config" :key="index" class="select_div">
          <div class="title">
            {{item.name}}
          </div>
          <div class="item_div">
            <div @click="selItem(item,item.options,index2)" v-for="(item2, index2) in item.options" :key="index2"
                 :class="{ 'item':item2.selStatus == false,'item_sel' :item2.selStatus == true}"
            >
              {{item2.option}}
            </div>
          </div>
        </div>
        <div class="num_div">
          <div class="num_text">
            购买数量
          </div>
          <div class="add_div">
            <div class="jian" @click="jian">
              -
            </div>
            <div class="num">
              {{goods_count}}
            </div>
            <div class="jia" @click="jia">
              +
            </div>
          </div>
        </div>
        <div class="btn_div">
          <div class="suer" @click="suer">
            确定
          </div>
          <div class="suer" @click="cancel" style="margin-left: 5.5%; background-color: #b6b6b6">
            取消
          </div>
        </div>
      </div>
    </transition>

    <transition name="listFold">
      <div class="list-mask" v-show="listShow" v-on:click="hidelist"></div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "SelectGoods",
    props: {
      SelectGoods: {},
      minPrice: '',
      maxPrice: '',
      sureType: ''
    },
    created(){
    },
    data(){
      return {
        listShow: false,
        goods_count: 1
      }
    },
    computed: {
      price: function () {
        let goods_price = 0;
        if (this.SelectGoods.config) {
          for (let i = 0; i < this.SelectGoods.config.length; i++) {
            for (let o = 0; o < this.SelectGoods.config[i].options.length; o++) {
              if (this.SelectGoods.config[i].options[o]['selStatus']) {
                goods_price = goods_price + this.SelectGoods.config[i].options[o].price;
              }
            }
          }
          if (goods_price == 0) {
            goods_price = this.minPrice + "-" + this.maxPrice;
          } else {
            goods_price = (goods_price * this.goods_count);
          }
          return goods_price;
        } else {
          return 0;
        }
      }
    },
    methods: {
      jian() {
        if (this.goods_count > 1) {
          this.goods_count--;
        }
      },
      jia() {
        this.goods_count++;
      },
      suer() {
        console.log(this.sureType);
        if (!isNaN(this.price)) {
          if (this.sureType == "car") {
            let goods = {};
            console.log(this.SelectGoods);
            goods.title = this.SelectGoods.name;
            goods.md5 = this.$store.state.selectedMd5;
            goods.img = this.SelectGoods.purchase_img_url;
            goods.info = "";
            goods.count = this.goods_count;
            goods.price = this.price / this.goods_count;
            goods.selStatus = false;
            for (let i = 0; i < this.SelectGoods.config.length; i++) {
              goods.info += this.SelectGoods.config[i].name;
              for (let o = 0; o < this.SelectGoods.config[i].options.length; o++) {
                if (this.SelectGoods.config[i].options[o]['selStatus']) {
                  goods.info += " " + this.SelectGoods.config[i].options[o].option;
                  console.log(this.SelectGoods.config[i].options[o]);
                  goods.config_md5 = this.SelectGoods.config[i].options[o].md5;
                }
              }
            }
            this.$store.state.shopCarData.push(goods);
            this.$toast("添加购物车成功");
            console.log(this.$store.state.shopCarData);
            this.listShow = false;
          } else if (this.sureType == "buy") {
            this.$store.state.orderData = [];
            let goods = {};
            console.log(this.SelectGoods);
            goods.title = this.SelectGoods.name;
            goods.img = this.SelectGoods.purchase_img_url;
            goods.md5 = this.$store.state.selectedMd5;
            goods.info = "";
            goods.count = this.goods_count;
            goods.price = this.price / this.goods_count;
            goods.selStatus = false;
            for (let i = 0; i < this.SelectGoods.config.length; i++) {
              goods.info += this.SelectGoods.config[i].name;
              for (let o = 0; o < this.SelectGoods.config[i].options.length; o++) {
                if (this.SelectGoods.config[i].options[o]['selStatus']) {
                  goods.info += " " + this.SelectGoods.config[i].options[o].option;
                  goods.config_md5 = this.SelectGoods.config[i].options[o].md5;
                }
              }
            }
            this.$store.state.orderData.push(goods);
//            this.$toast("添加购物车成功");
            console.log(this.$store.state.orderData);
            this.listShow = false;
            this.$emit('GoOrder');
          }
        } else {
          console.log(111111);
          this.$toast("请选择商品套餐");
        }
      },
      cancel() {
        this.listShow = false;
      },
      selItem(item, item2, index){
        console.log("item", item);
        let sel_num = 0;
        // 获取选中数量
        for (let w = 0; w < item2.length; w++) {
          if (item2[w].selStatus) {
            sel_num++;
          }
        }
        // 判断是否可以点击
        if (sel_num <= item.selection) {
          for (let u = 0; u < item2.length; u++) {
            if (u == index) {
              this.$set(item2, index, {
                selStatus: true,
                amount: item2[u].amount,
                price: item2[u].price,
                rule: item2[u].rule,
                option: item2[u].option,
                md5: item2[u].md5
              });
            } else {
              this.$set(item2, u, {
                selStatus: false,
                amount: item2[u].amount,
                price: item2[u].price,
                rule: item2[u].rule,
                option: item2[u].option,
                md5: item2[u].md5
              });
            }
          }
        }
      },
      hidelist() {
        this.listShow = false;
      },
      showlist() {
        this.listShow = true;
        // 添加可选状态
        if (this.SelectGoods.config.length !== 0) {
          for (let i = 0; i < this.SelectGoods.config.length; i++) {
            for (let o = 0; o < this.SelectGoods.config[i].options.length; o++) {
              this.SelectGoods.config[i].options[o]['selStatus'] = false;
            }
          }
          console.log(this.SelectGoods);
        }
      }
    }
  }
</script>

<style scoped>
  .suer {
    width: 42%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    float: left;
    margin-left: 5%;
    margin-top: 5px;
    background-color: #ff7049;
    border-radius: 15px;
  }
  .btn_div {
    width: 100%;
    height: 50px;
    float: left;
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
    line-height: 12.5px;
    text-align: center;
    float: left;
    font-size: 12px;
  }
  .jia {
    width: 20px;
    height: 15px;
    line-height: 12.5px;
    text-align: center;
    float: right;
    font-size: 12px;
  }
  .add_div {
    width: 70px;
    height: 15px;
    float: right;
    margin-top: 10px;
    margin-right: 8%;
    border-radius: 5px;
    border: 1px solid #d7d7d7;
  }
  .num_text {
    float: left;
  }
  .num_text {
    float: left;
  }
  .num_div {
    width: 100%;
    height: 35px;
    line-height: 35px;
    font-size: 12px;
    border-bottom: 1px solid #cdcdcd;
    padding-left: 5%;
    float: left;
  }
  .item {
    width: auto;
    padding: 2px 10px;
    border: 1px solid #ff7049;
    float: left;
    margin-right: 15px;
    margin-top: 10px;
    border-radius: 5px;
    font-size: 12px;
  }
  .item_sel {
    width: auto;
    padding: 2px 10px;
    border: 1px solid #ff7049;
    background-color: #ff7049;
    color: #fff;
    float: left;
    margin-right: 15px;
    margin-top: 10px;
    border-radius: 5px;
    font-size: 12px;
  }
  .item_div {
    width: 95%;
    height: auto;
    float: left;
    margin-left: 5%;
    font-size: 13px;
    padding-bottom: 20px;
    border-bottom: 1px solid #cdcdcd;
  }
  .title {
    width: 95%;
    height: 20px;
    line-height: 20px;
    float: left;
    margin-left: 5%;
    font-size: 13px;
    margin-top: 10px;
  }
  .select_div {
    width: 100%;
    height: auto;
    float: left;
  }
  .package {
    width: 100%;
    height: 30px;
    float: left;
  }
  .inventory {
    width: 100%;
    height: 30px;
    float: left;
  }
  .price {
    width: 100%;
    height: 30px;
    float: left;
    margin-top: 15px;
  }
  .goods_info {
    width: 60%;
    height: 100%;
    float: left;
    margin-left: 5%;
  }
  .goods_img {
    width: 28%;
    float: left;
    margin-left: 5%;
    margin-top: 15px;
  }
  .info {
    width: 100%;
    height: auto;
    float: left;
  }
  .selectGoods-list {
    width: 100%;
    height: auto;
    /*min-height: 300px;*/
    /*max-height: 400px;*/
    overflow-y: scroll;
    overflow-x: hidden;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1001;
    background-color: #fff;
    border-radius: 10px 10px 0 0;
  }
  .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background: rgba(7, 17, 27, 0.6);
  }
  .listFold-enter-active {
    opacity: 1;
    transition: all 0.4s;
  }
  .listFold-leave-active {
    opacity: 0;
    transition: all 0.4s;
  }
  .listFold-enter {
    opacity: 0;
  }
  .listFold-leave {
    opacity: 1;
  }
</style>

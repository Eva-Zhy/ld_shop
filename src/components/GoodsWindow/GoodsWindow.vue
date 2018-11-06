<template>
  <div class="window_v">
    <div v-if="windowType == 'home'">
      <div class="window_data" v-for="(item,index) in windowData" :key="index" @click="goGoodsInfo(item.md5)">
        <div class="window_img">
          <img class="img100" :src="item.pic_url"/>
        </div>
        <div class="window_name">
          {{item.name}}
        </div>
        <div class="window_price">
          <span>¥{{item.price[0]}}</span><span v-if="item.price[1]">-{{item.price[1]}}</span>
        </div>
      </div>
    </div>

    <div v-if="windowType == 'sort'">
      <div class="window_data" v-for="(item,index) in windowData[$store.state.sortIndex].products" :key="index">
        <div class="window_img" @click="goGoodsInfo(item.md5)">
          <img class="img100" :src="item.pic_url"/>
        </div>
        <div class="window_name">
          {{item.name}}
        </div>
        <div class="window_price">
          <span>¥{{item.price[0]}}</span><span v-if="item.price[1]">-{{item.price[1]}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsWindow",
    props: {
      windowData: {
        type: Array
      },
      windowType: "",
      sortIndex: 0
    },
    methods: {
      goGoodsInfo (md5) {
        this.$emit('ClickGoodsInfo', md5)
      }
    },
    beforeMount() {
//      this.windowData = this.windowData.products;
//      console.log('window',this.windowData);
    }
  }
</script>

<style scoped>
  .window_v {
    width: 100%;
    height: auto;
    float: left;
    /*display: flex;*/
    background-color: #fff;
  }

  .window_data {
    /*flex: 1;*/
    width: 30%;
    float: left;
    margin: 5px;
    border: 1px solid #e8e8e8;
    padding-bottom: 8px;
    padding-top: 4px;
  }

  .window_img {
    width: 90%;
    height: 100px;
    float: left;
    margin-left: 5%;
    margin-top: 2%;
  }

  .window_name {
    width: 100%;
    float: left;
    text-align: center;
    margin-top: 5px;
  }

  .window_price {
    width: 100%;
    float: left;
    margin-top: 5px;
    color: #ff734d;
    font-size: 13px;
    text-align: center;
  }
</style>

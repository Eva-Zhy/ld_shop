<template>
    <div class="window_v">
      <div class="window_data" v-for="(item,index) in windowData" :key="index">
          <div class="window_img" @click="goGoodsInfo(index)">
            <img class="img100" src="./fangkuai.jpeg" />
          </div>
          <div class="window_name">
              {{item.name}}
          </div>
          <div class="window_price">
            ¥{{item.price}}
          </div>
      </div>
    </div>
</template>

<script>
    export default {
      name:"GoodsWindow",
      props: {
        windowData: {
          type: Array
       }
      },methods:{
        goGoodsInfo (index) {
          this.$emit('ClickGoodsInfo', index)
        }
      }
    }
</script>

<style scoped>
  .window_v{
    width: 100%;
    height: 170px;
    float: left;
    display: flex;
  }
  .window_data {
    flex: 1;
    margin: 5px;
    border: 1px solid #e8e8e8;
  }
  .window_img{
    width: 90%;
    height: 100px;
    float: left;
    margin-left: 5%;
    margin-top: 2%;
  }
  .window_name{
    width: 100%;
    float: left;
    text-align: center;
    margin-top: 5px;
  }
  .window_price{
    width: 100%;
    float: left;
    text-align: center;
  }
</style>

<template>
  <div class="nav_bar">
    <div class="nav_data_item" v-for="(item,index) in navData.projects" :key="index" @click="goGoodsSort(index)">
      <router-link :to="'/goodssort?name='+ navData.category + '&index=' + index">
        {{item.project}}
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      goGoodsSort (index) {
        console.log(index);
//          this.$emit('ClickGoodsSort', index)
      }
    },
    props: {
      navData: {
      }
    }

  }
</script>

<style scoped>
  .nav_bar {
    width: 100%;
    height: 40px;
    float: left;
    background-color: #fff;
  }

  .nav_data_item {
    float: left;
    height: 20px;
    margin-top: 10px;
    line-height: 20px;
    width: 60px;
    text-align: center;
    border-left: 1px solid sandybrown;
    border-right: 1px solid sandybrown;
  }

  .nav_data_item:nth-child(1) {
    margin-left: 30px;
  }
</style>

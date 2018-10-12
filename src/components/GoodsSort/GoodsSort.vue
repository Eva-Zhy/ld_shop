<template>
  <transition name="leftMove">
    <div v-show="showFlag" ref="V_GoodsSort" class="goodsSort">
      <v-navBar :navData="scenceData"></v-navBar>
      <v-goodsWindow :windowData="goodsData"></v-goodsWindow>
      <v-contactUs></v-contactUs>
    </div>
  </transition>
</template>

<script>
    import NavBar from '../NavBar/NavBar'
    import GoodsWindow from '../GoodsWindow/GoodsWindow'
    import ContactUs from '../ContactUs/ContactUs'
    export default {
      methods:{
        show() {
          this.showFlag = true;
        }
      },
      data () {
        return {
          scenceData: ["消防","工地","医疗","刑侦"],
          showFlag:true,
          goodsData: [
            {
              img:'',
              name:'消防',
              price:'123'
            },
            {
              img:'',
              name:'工地',
              price:'111'
            },
            {
              img:'',
              name:'医疗',
              price:'111'
            },
            {
              img:'',
              name:'医疗',
              price:'111'
            }
          ]
        };
      },
      components: {
        'v-goodsWindow': GoodsWindow,
        'v-contactUs': ContactUs,
        'v-navBar': NavBar
      }
    }
</script>

<style scoped>
  .goodsSort{
    /*position: fixed;*/
    /*left: 0;*/
    /*top: 0;*/
    /*bottom: 48px;*/
    /*z-index: 30;*/
    /*width: 100%;*/
    /*background: #FFFFFF;*/
  }
</style>

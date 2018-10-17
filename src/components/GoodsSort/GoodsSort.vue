<template>
  <transition name="leftMove">
    <div v-show="showFlag" ref="V_GoodsSort" class="goodsSort">
      <v-navBar :navData="scenceData"></v-navBar>
      <v-goodsWindow :windowData="windowData"></v-goodsWindow>
      <v-contactUs></v-contactUs>
    </div>
  </transition>
</template>

<script>
  import NavBar from '../NavBar/NavBar'
  import GoodsWindow from '../GoodsWindow/GoodsWindow'
  import ContactUs from '../ContactUs/ContactUs'
  export default {
    created(){
      console.log(this.$route.query.name);
      this.$http.post("https://ludianvr.com/test/wxmarket/goodsmore", {category: this.$route.query.name}, {emulateJSON: true})
        .then(
          (response) => {
            response = response.body;
            console.log(response);
            if (response.status.state == 20001) {
                this.scenceData.projects = response.content.content;
                this.windowData = response.content.content;
            }
          },
          (error) => {
            console.log(error);
          }
        )
    },
    methods: {
      show() {
        this.showFlag = true;
      }
    },
    data () {
      return {
        scenceData:{
          projects:[]
        },
        showFlag: true,
        windowData: [
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
  .goodsSort {
    /*position: fixed;*/
    /*left: 0;*/
    /*top: 0;*/
    /*bottom: 48px;*/
    /*z-index: 30;*/
    /*width: 100%;*/
    /*background: #FFFFFF;*/
  }
</style>

<template>
  <transition name="leftMove">
    <div v-show="showFlag" ref="V_GoodsSort" class="goodsSort">
      <v-navBar :windowType="windowType"  :navData="scenceData"></v-navBar>
      <v-goodsWindow @ClickGoodsInfo="ClickGoodsInfo"  :windowType="windowType" :sortIndex="sortIndex" :windowData="windowData"></v-goodsWindow>
      <v-contactUs></v-contactUs>
      <v-goodsInfo  ref="V_GoodsInfo"></v-goodsInfo>
    </div>
  </transition>
</template>

<script  type="text/ecmascript-6">
  import NavBar from '../NavBar/NavBar'
  import GoodsWindow from '../GoodsWindow/GoodsWindow'
  import ContactUs from '../ContactUs/ContactUs'
  import GoodsInfo from '../GoodsInfo/GoodsInfo'
  export default {
    created(){
      console.log(this.$route.query.name);
      this.$store.state.sortName = this.$route.query.name;
      this.sortIndex = this.$route.query.index;
      this.$http.post("https://ludianvr.com/test/wxmarket/goodsmore",
        {category: this.$route.query.name},
        {emulateJSON: true})
        .then(
          (response) => {
            response = response.body;
            console.log("sort",response);
            if (response.status.state == 25101) {
                this.scenceData.projects = response.content.content;
                console.log("scenceData",response.content.content);
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
      },
      ClickGoodsInfo (md5) {
        this.$store.state.selectedMd5 = md5;
        this.$store.state.show = true;
        this.$refs.V_GoodsInfo.show();
      }
    },
    data () {
      return {
        windowType: "sort",
        scenceData:{
          projects:[]
        },
        showFlag: true,
        windowData: [
        ],
        sortIndex:0
      };
    },
    components: {
      'v-goodsWindow': GoodsWindow,
      'v-contactUs': ContactUs,
      'v-goodsInfo': GoodsInfo,
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

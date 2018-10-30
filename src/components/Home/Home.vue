<template>
  <div>
    <div class="home">
      <v-swiper></v-swiper>
      <div v-for="(item,index) in windowData" :key="index">
        <v-navBar :windowType="windowType" :navData="item.project"></v-navBar>
        <v-goodsWindow @ClickGoodsInfo="ClickGoodsInfo" :windowType="windowType" :windowData="item.products"></v-goodsWindow>
      </div>
      <v-contactUs></v-contactUs>
    </div>
    <v-goodsInfo  ref="V_GoodsInfo"></v-goodsInfo>
  </div>
</template>

<script type="text/ecmascript-6">
  import Swiper from '../Swiper/Swiper'
  import NavBar from '../NavBar/NavBar'
  import GoodsWindow from '../GoodsWindow/GoodsWindow'
  import ContactUs from '../ContactUs/ContactUs'
  import GoodsSort from '../GoodsSort/GoodsSort'
  import GoodsInfo from '../GoodsInfo/GoodsInfo'
  export default {
    data () {
      return {
        scenceData: ["消防", "工地", "医疗", "刑侦"],
        windowType: "home",
        goodsData: [
          {
            img: '',
            name: '消防',
            price: '123'
          },
          {
            img: '',
            name: '工地',
            price: '111'
          },
          {
            img: '',
            name: '医疗',
            price: '111'
          }
        ],
        windowData: [],

        selectedMd5: ""
      };
    },
    created() {
      this.$http.post("https://ludianvr.com/test/wxmarket/goods", {
        openid: wxUserObj.openid}, {emulateJSON: true})
        .then(
          (response) => {
            response = response.body;
            console.log(response);
            if (response.status.state == 25001) {
              this.windowData = response.content.content;
            }
          },
          (error) => {
            console.log(error);
          }
        )
    },
    methods: {
      ClickGoodsInfo (md5) {
        this.$store.state.selectedMd5 = md5;
        this.$store.state.show = true;
        this.$refs.V_GoodsInfo.show();
      }
//        ClickGoodsSort: function (index) {
//          console.log(this.$refs);
//          this.$refs.V_GoodsSort.show();
//        }
    },
    components: {
      'v-swiper': Swiper,
      'v-goodsWindow': GoodsWindow,
      'v-contactUs': ContactUs,
      'v-goodsSort': GoodsSort,
      'v-goodsInfo': GoodsInfo,
      'v-navBar': NavBar
    }
  }
</script>

<style scoped>
  .home {
    width: 100%;
    /* height: auto; */
    /* float: left; */
    background-color: #f1f1f1;
    overflow: scroll;
    position: absolute;
    top: 0;
    bottom: 50px;
    left: 0;
  }

</style>

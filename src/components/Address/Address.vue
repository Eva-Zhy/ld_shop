<template>
  <transition name="leftMove">
    <div v-show="showFlag" class="address_v" rel="V_Address">
      <v-BackView :backTitle="backTitle" @back="back"></v-BackView>
      <div class="input_v">
        <div class="title">收货人</div>
        <div class="input">
          <input class="text" v-model="name" type="text"/>
        </div>
      </div>
      <div class="input_v">
        <div class="title">手机号码</div>
        <div class="input">
          <input class="text" v-model="phone" type="text"/>
        </div>
      </div>
      <div class="input_v">
        <div class="title">家庭住址</div>
        <div class="input">
          <input class="text" type="text" v-model="cityValue" readOnly="true" @click="showlist"/>
        </div>
      </div>
      <div class="input_v2">
        <div class="title">详细地址</div>
        <div class="input2">
          <textarea placeholder="如门牌号、小区、楼栋号、单元室等" v-model="address" class="text" type="text"></textarea>
        </div>
      </div>
      <div class="save_btn" @click="save">
        保存
      </div>

      <div>
        <transition name="listFold">
          <div class="select_div" rel="V_SelectGoods" v-show="listShow">
            <div class="xzdd">
              <div id="close_xcdd" @click="hidelist">
                <img style="width: 100%;height: 100%;" src="./cha.png">
              </div>
              <div class="xzdd-title">
                选择地点
              </div>
              <div id="sure_xcdd" @click="gou">
                <img style="width: 100%;height: 100%;" src="./gou.png">
              </div>
            </div>
            <div class="xz-address">
              <div class="slet-div">
                <select v-model="province_selected" @change="changeProvince(province_selected)" id="sheng"
                        class="select_item" style="-webkit-appearance: none;">
                  <option value="省" selected="selected">省</option>
                  <option v-for="(item, index) in province" :key="index" :value="item">{{item}}</option>
                </select>
              </div>
              <div v-if="have_city" class="slet-div" id="shi_div">
                <select v-model="city_selected" @change="changeCity(city_selected)" id="shi" class="select_item"
                        style="-webkit-appearance: none;">
                  <option value="市" selected="selected">市</option>
                  <option v-for="(item, index) in city" :key="index" :value="item">{{item}}</option>
                </select>
              </div>
              <div class="slet-div">
                <select v-model="district_selected" @change="changeDistrict(district_selected)" id="qu"
                        class="select_item" style="-webkit-appearance: none;">
                  <option value="区" selected="selected">区</option>
                  <option v-for="(item, index) in district" :key="index" :value="item">{{item}}</option>
                </select>
              </div>
              <div class="slet-div">
                <select v-model="street_selected" id="jie" class="select_item" style="-webkit-appearance: none;">
                  <option value="街道" selected="selected">街道</option>
                  <option v-for="(item, index) in street" :key="index" :value="item">{{item}}</option>
                </select>
              </div>
            </div>
          </div>
        </transition>

        <transition name="listFold">
          <div class="list-mask" v-show="listShow" v-on:click="hidelist"></div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BackView from '../BackView/BackView'
  export default{
    data(){
      return {
        showFlag: false,
        listShow: false,
        have_city: true,
        name: this.$store.state.addressData.name,
        phone: this.$store.state.addressData.phone,
        address: this.$store.state.addressData.address,
        cityValue: this.$store.state.addressData.cityStr,
        backTitle: "收货地址",
        cityType: '0',
        province: [],
        province_selected: "省",
        city: [],
        city_selected: "市",
        district: [],
        district_selected: "区",
        street: [],
        street_selected: "街道"
      }
    },
    created() {
      this.$http.post("https://ludianvr.com/address/province", {}, {emulateJSON: true})
        .then(
          (response) => {
            response = response.body;
            if (response.status.state == 20001) {
              this.province = response.content.province
            }
          },
          (error) => {
            console.log(error);
          }
        )
    },
    methods: {
      gou(){
        if (this.have_city) {
          console.log(this.province_selected);
          if (this.province_selected == "省" || this.province_selected == "" || this.city_selected == "市"|| this.city_selected == ""
            || this.district_selected == "区" || this.district_selected == "" || this.street_selected == "街道"|| this.street_selected == "") {
            this.$toast("地点信息不能为空");
          } else {
            this.cityValue = this.province_selected + this.city_selected + this.district_selected + this.street_selected;
            this.hidelist();
          }
        } else {
          if (this.province_selected == "省" || this.province_selected == ""
            || this.district_selected == "区" || this.district_selected == "" || this.street_selected == "街道"|| this.street_selected == "") {
            this.$toast("地点信息不能为空");
          } else {
            this.cityValue = this.province_selected + this.district_selected + this.street_selected;
            this.hidelist();
          }
        }
      },
      save(){
        if (this.isNull0(this.name)) {
          this.$toast("收货人名字不能为空");
        } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.phone))) {
          this.$toast("手机号码有误");
        } else if (this.cityValue == "省/市/区/街道") {
          this.$toast("城市信息有误");
        } else if (this.isNull0(this.address)) {
          this.$toast("详细地址有误");
        } else {
          this.$http.post("https://ludianvr.com/test/wxmarket/edituseraddress", {
              openid: wxUserObj.openid,
              name:this.name,
              phonenumber:this.phone,
              province: this.province_selected,
              district: this.district_selected,
              street: this.street_selected,
              address: this.address
            }, {emulateJSON: true})
            .then(
              (response) => {
                response = response.body;
                if (response.status.state == 28001) {
                  this.$store.state.addressData.name = this.name;
                  this.$store.state.addressData.phone = this.phone;
                  this.$store.state.addressData.address = this.address;
                  this.$store.state.addressData.cityStr = this.cityValue;

                  this.$store.state.addressData.province = this.province_selected;
                  this.$store.state.addressData.district = this.district_selected;
                  this.$store.state.addressData.street = this.street_selected;
                  this.$toast("保存成功");
                  this.showFlag = false;
                  console.log(this.$store.state.addressData);
                }
              },
              (error) => {
                console.log(error);
              }
            );
        }
      },
      isNull0(data) {
        if (data == "" || data == null || data == undefined || data == 0) {
          return true;
        } else {
          return false;
        }
      },
      show() {
        this.showFlag = true;
        this.name = this.$store.state.addressData.name;
          this.phone = this.$store.state.addressData.phone;
          this.address = this.$store.state.addressData.address;
          this.cityValue =this.$store.state.addressData.cityStr;
      },
      back() {
        this.showFlag = false;
      },
      hidelist() {
        this.listShow = false;
      },
      showlist() {
        this.listShow = true;
      },
      changeProvince(value) {
        console.log(value);
        if (value !== "省") {
          this.$http.post("https://ludianvr.com/address/city", {province: value}, {emulateJSON: true})
            .then(
              (response) => {
                response = response.body;
                if (response.status.state == 20002) {
                  this.have_city = true;
                  this.city = response.content.city
                } else if (response.status.state == 20011) {
                  this.$http.post("https://ludianvr.com/address/district", {
                    province: this.province_selected
                  }, {emulateJSON: true})
                    .then(
                      (response) => {
                        response = response.body;
                        if (response.status.state == 20002) {
                          this.have_city = false;
                          this.district = response.content.district
                        }
                      },
                      (error) => {
                        console.log(error);
                      }
                    )
                }
              },
              (error) => {
                console.log(error);
              }
            )
        }
      },
      changeCity(value) {
        console.log(value);
        if (value !== "市") {
          this.$http.post("https://ludianvr.com/address/district", {
            province: this.province_selected,
            city: this.city_selected
          }, {emulateJSON: true})
            .then(
              (response) => {
                response = response.body;
                if (response.status.state == 20002) {
                  this.district = response.content.district
                }
              },
              (error) => {
                console.log(error);
              }
            )
        }
      },
      changeDistrict(value) {
        if (value !== "区") {
          if (this.have_city) {
            this.$http.post("https://ludianvr.com/address/street", {
              province: this.province_selected,
              district: this.district_selected,
              city: this.city_selected
            }, {emulateJSON: true})
              .then(
                (response) => {
                  response = response.body;
                  if (response.status.state == 20003) {
                    this.street = response.content.street
                  }
                },
                (error) => {
                  console.log(error);
                }
              )
          } else {
            this.$http.post("https://ludianvr.com/address/street", {
              province: this.province_selected,
              district: this.district_selected
            }, {emulateJSON: true})
              .then(
                (response) => {
                  response = response.body;
                  if (response.status.state == 20003) {
                    this.street = response.content.street
                  }
                },
                (error) => {
                  console.log(error);
                }
              )
          }
        }
      }
    },
    components: {
      "v-BackView": BackView
    }
  }
</script>

<style scoped>

  .xzdd {
    width: 100%;
    height: 40px;
    float: left;
    background-color: #f2f2f2;
  }

  .xzdd-title {
    width: 80%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    float: left;
    font-size: 16px;
  }

  #close_xcdd {
    width: 20px;
    height: 20px;
    float: left;
    margin-top: 10px;
    margin-left: 10px;
  }

  #sure_xcdd {
    width: 20px;
    height: 20px;
    float: right;
    margin-top: 10px;
    margin-right: 10px;
  }

  .save_btn {
    width: 85%;
    height: 40px;
    border-radius: 15px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background-color: #ff7049;
    position: absolute;
    bottom: 5px;
    left: 7.5%;
  }

  .select_item {
    width: 100%;
    height: 100%;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    /* border-bottom: 0; */
    border-bottom: 2px solid #b6b6b6;
    background-color: #ffffff;
  }

  .xz-address {
    width: 100%;
    float: left;
    height: auto;
    display: flex;
  }

  .slet-div {
    margin-top: 50px;
    flex: 1;
    height: 20px;
    padding: 10px;
  }

  .select_div {
    position: absolute;
    width: 100%;
    height: 200px;
    background-color: #ffffff;
    z-index: 1001;
    bottom: 0;
  }

  .input_v {
    width: 100%;
    height: 40px;
    line-height: 40px;
    float: left;
    border-bottom: 1px solid #ebebeb;
  }

  .input_v2 {
    width: 100%;
    height: 70px;
    line-height: 40px;
    float: left;
    border-bottom: 1px solid #ebebeb;
  }

  .title {
    margin-left: 15px;
    float: left;
    font-size: 12px;
    color: #b7b7b7;
  }

  .input {
    width: 60%;
    float: left;
    margin-left: 10px;
    height: 30px;
  }

  .input2 {
    width: 60%;
    float: left;
    margin-left: 10px;
    height: 50px;
    margin-top: 12px;
  }

  .text {
    border: 0;
    width: 100%;
    height: 95%;
  }

  .address_v {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    width: 100%;
    background: #fff;
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

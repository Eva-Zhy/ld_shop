<template>
    <div class="back-v">
      <div class="back-d" @click="back"><img src="./back.png" class="back-img" ></div>
      {{backTitle}}
    </div>
</template>

<script>
    export default {
      props: {
        backTitle: {
          type: String
        }
      },
      methods: {
        back(){
          this.$emit('back');
        }
      }
    }
</script>

<style scoped>
  .back-v{
    width: 100%;
    height: 40px;
    background: #fff;
    float: left;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
  }
  .back-img{
    width: 25px;
    height:25px;
    display: block;
    margin: 0 auto;
    margin-top: 5px;
  }
  .back-d{
    width: 40px;
    height: 40px;
    position: absolute;
  }
</style>

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
    height: 30px;
    background: #fff;
    float: left;
    text-align: center;
    line-height: 30px;
  }
  .back-img{
    width: 15px;
    height:15px;
  }
  .back-d{
    width: 30px;
    height: 30px;
    position: absolute;
    left: 10px;
  }
</style>

<template>

  <!-- 全局提示框 -->
  <div v-show="visible" class="dialog-tips dialog-center">
    <div class="dialog_title">提示</div>
    <div class="message">{{message}}</div>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        visible: false,
        message: ""
      };
    }
  };
</script>
<style>
  .dialog_title{
    width: 100%;
    height: 35px;
    line-height: 25px;
    float: left;
    color: #ff7049;
    border-bottom: 1px solid #dfdfdf;
  }
  .message{
    width: 100%;
    height:60px;
    line-height: 68px;
    float: left;
  }
  .dialog-tips {
    position: fixed;
    z-index: 10000;
    min-width: 280px;
    padding: 10px 0px;
    white-space: nowrap;
    background-color: #fff;
    /*box-shadow: 0px 8px 15px 0 rgba(0, 0, 0, 0.1);*/
    text-align: center;
    border-radius: 15px;
    box-shadow: 5px 5px 10px #888888;
  }
  .dialog-tips-icon {
    width: 54px;
    height: 54px;
  }
  .dialog-center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }

</style>

<template>
  <div id="app">
    <!--<demo-header></demo-header>-->
    <router-view></router-view>
    <!--<demo-footer></demo-footer>-->
    <v-bottomBar></v-bottomBar>
  </div>
</template>
<script>
  import BottomBar from './components/BottomBar/BottomBar'
  export default {
    name: 'app',
    components: {
      'v-bottomBar': BottomBar
    }
  }
</script>
<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: auto;
    float: left;
  }

  body,html{
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .img100{
    width: 100%;
    height: 100%;
  }
</style>

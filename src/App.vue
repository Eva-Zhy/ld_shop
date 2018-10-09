<template>
  <div>
  <div id="app">
    <demo-header></demo-header>
    <router-view></router-view>
    <demo-footer></demo-footer>
  </div>
  </div>
</template>
<script>
  import DemoHeader from './components/DemoHeader'
  import DemoFooter from './components/DemoFooter'
  export default {
    name: 'app',
    components: {
      'demo-header':DemoHeader,
      'demo-footer':DemoFooter,
    }
  }
</script>
<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: aliceblue;
  }
</style>

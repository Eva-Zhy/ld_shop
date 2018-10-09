<template>
  <li @click="handleDelete">{{content}}</li>
</template>

<script type="text/ecmascript-6">
  export default{
    // 接受传值
    props: ['content', 'index'],
    methods: {
      handleDelete () {
        this.$emit('delete',this.index);
      }
    }
  }
</script>

<style>

</style>

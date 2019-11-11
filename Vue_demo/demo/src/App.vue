<template>
<main>
  <appheader></appheader>
   <div class="container-fluid">
     <div class="row">
        <appside></appside>
        <router-view class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main"></router-view>
     </div>
     </div>
</main>
   
</template>

<script>
// 导入普通组件
import appheader from './components/Header.vue'
import appside from './components/Side.vue'

export default {
  // 注册组件
  components: {
    appheader,
    appside
  }
}
</script>

<style>

</style>

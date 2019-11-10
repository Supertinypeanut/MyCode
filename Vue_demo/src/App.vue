<template>
<body>
   <app-header></app-header>
   <app-main></app-main>
</body>

</template>

<script>
import appheader from './app_header'
import appmain from './app_main'
export default {
  components:{
    "app-header":appheader,
    "app-main":appmain
  }
}
</script>

<style>

</style>

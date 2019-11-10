<template>
  <div class="container-fluid">
        <div class="row">
            <main-sidenav></main-sidenav>
            <!-- <main-container></main-container> -->
            <router-view class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main"></router-view>
    </div>
</div>
</template>

<script>
import sidenav from './main_sideNav'
export default {
components:{
    "main-sidenav":sidenav,
}
}
</script>

<style>

</style>
<template>
  <div class="root">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import './assets/global.css'
import './assets/icon.css'
export default {
  
}
</script>
<style lang="less" media="screen">
.root {
  height: 100%;
  .container {
    position: absolute;
    background: #fdfdfd;
    width: 100%;
    height:100%;
  }
}
</style>

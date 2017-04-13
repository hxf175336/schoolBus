<!-- 头部和导航 -->
<template>
  <div class="menulist">
    <mt-header title="foo校园通">
      <i slot="left" class="iconfont" @click="showLeftSlider">&#xe63d;</i>
      <i slot="right" class="iconfont"><a href="#/activity">&#xe605;</a></i>
    </mt-header>
    <div class="nav" @click="showLeftSlider" :class="{'wid': !leftSliderVisible}">
      <div class="banner">
        <div class="logo">
          <div class="item">
            <img src="../../assets/foo.jpg" alt="">
          </div>
          <div class="item">
            <p>foo新用户</p>
            <p>{{userName}}</p>
          </div>
        </div>
        <div class="navlist">
          <router-link v-for="item in navList" :to="item.path">
            <i class="iconfont" v-html="item.icon"></i>
            {{item.name}}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navList from './navList.js'
import 'assets/css/menu.less'
// import API from './api.js'
import {getCookie} from 'util/utils.js'
export default {
  data() {
    return {
      userName: '',
      leftSliderVisible: false,
      navList: navList.navlist,
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let userName = getCookie('userName');
      if (userName == null) {
        this.$router.replace('/login');
      } else {
        this.userName = userName;
      }
    },
    showLeftSlider() {
      this.leftSliderVisible = !this.leftSliderVisible
    }
  }
}
</script>

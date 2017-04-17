<template>
  <div class="login-index">
    <mt-header title="foo校园通"></mt-header>
    <div class="logo">
      <img src="../../assets/foo.jpg" alt="">
    </div>
    <div class="sign-in">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="param.userName"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="param.passWord"></mt-field>
      <a class="signup-link" href="/#/signup">还没有账号?</a>
      <mt-button size="large" type="primary" class="submit-button" @click="submit">登录</mt-button>
      <mt-popup v-model="popupVisible" position="top" class="mint-popup-2" :modal="false">
        <p>{{errorTip}}</p>
      </mt-popup>
    </div>
  </div>
</template>

<script>
import 'assets/css/login.less'
import { Toast } from 'mint-ui';
import { hex_md5 } from 'util/md5'
import API from './api.js'
export default {
  data() {
    return {
      popupVisible: false,
      errorTip: '',
      param: {
        userName: '',
        userIp: '',
        passWord: '',
      }
    }
  },
  beforeMount() {
    this.getUserIp();
  },
  // 错误提示
  watch: {
    popupVisible(visible) {
      if (visible) {
        setTimeout(() => {
          this.popupVisible = false;
        }, 2000);
      }
    }
  },
  methods: {
    submit() {
      let param = this.param;
       param.passWord = hex_md5(this.param.passWord);
      API.login(param)
      .then(response => {
        let res = response.body;
        if (res.code == 0) {
          Toast({
            message: '登陆成功！',
            iconClass: 'mintui mintui-success'
          });
          this.reset();
          this.$router.replace('/home');
        } else {
          this.errorTip = res.message;
          this.popupVisible = true;
        }
      })
    },
    reset() {
      this.param = {
        userName: '',
        passWord: ''  
      }
    },
    
    getUserIp() {
      this.$http.jsonp('http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_='+Math.random())
      .then((response) => {
        let res = response.body;
        this.param.userIp = res.Ip;
      })
    }
  }
}
</script>

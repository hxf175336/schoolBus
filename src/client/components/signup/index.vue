<template>
  <div class="login-index">
    <mt-header title="foo校园通"></mt-header>
    <div class="logo">
      <img src="../../assets/foo.jpg" alt="logo">
    </div>
    <div class="sign-in">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="param.userName">
      </mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="param.passWord">
      </mt-field>
      <mt-field label="手机号" placeholder="请输入手机号" type="text" v-model="param.phoneNumber">
      </mt-field>
      <mt-radio
        v-model="param.type"
        :options="userTypeOption">
      </mt-radio>
      
      <a class="signup-link" href="/#/login">已有账号?</a>
      <mt-button size="large" type="primary" class="submit-button" @click="submit">注册</mt-button>
      <!-- error -->
      <mt-popup v-model="popupVisible" position="top" class="mint-popup-2" :modal="false">
        <p>{{errorTip}}</p>
      </mt-popup>
    </div>
  </div>
</template>

<script>
import 'assets/css/login.less'
import { Toast } from 'mint-ui';
import {vertifyPhone, vertifyPassword, vertifyUser} from 'util/utils'
import { hex_md5 } from 'util/md5'

import API from './api.js'
export default {
  data() {
    return {
      disabled: true,
      popupVisible: false,
      errorTip: '',
      param: {
        userName: '',
        passWord: '',
        phoneNumber: '',
        type: '0',
      },
      userTypeOption: [],
    }
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

  mounted() {
    this.init();
  },

  methods: {
    
    init() {
      this.userTypeOption = [{
        label: '校车司机',
        value: '1'
      },
      {
        label: '乘客',
        value: '0'
      }]
    },
    // 提交注册
    submit() {
      // 验证用户密码
      if (!vertifyUser(this.param.userName)) {
        this.errorTip = '用户名在三到十位之间';
        this.popupVisible = true;
        return ;
      }
      // 验证用户密码
      if (!vertifyPassword(this.param.passWord)) {
        this.errorTip = '密码长度必须大于6位';
        this.popupVisible = true;
        return ;
      }
      // 验证手机号
      if (!vertifyPhone(this.param.phoneNumber)) {
        this.errorTip = '电话号码格式错误！';
        this.popupVisible = true;
        return ;
      }
      this.param.passWord = hex_md5(this.param.passWord);
      API.siginUp(this.param)
      .then((response) => {
        let res = response.body;
        if (res.code == 0) {
          Toast({
            message: '注册成功！',
            iconClass: 'mintui mintui-success'
          });
          this.reset();
          
        } else {
          this.errorTip = res.message;
          this.popupVisible = true;
        }
      })
    },
    // 初始化
    reset() {
      this.param = {
        userName: '',
        passWord: '',
        phoneNumber: '',
        type: '0',
      };
    }
  }
}
</script>

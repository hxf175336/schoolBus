<template>
  <div class="activity" id="activity">
  	<menuNav></menuNav>
    <div class="main">
      <h1>校园资讯</h1>
      <ul id="list" >
        <a v-for="item in list" :href="'/#/detail?articleId='+item._id">
          <li>
            <img v-lazy="'/src/servers/public/' + item.picUrl">
            <div>
              <p>标题：{{item.articleTitle}}</p>
            </div>
          </li>
        </a>
      </ul>
      <p v-if="isOver" class="over">已经到底了</p>
    </div>
    
  </div>
</template>

<script>
import menuNav from '../common/menu.vue'
import { InfiniteScroll, Lazyload, Indicator } from 'mint-ui';
import API from './api.js'

const clientHeight = document.documentElement.clientHeight;

export default {
  data() {
    return {
      list: [],
      pageSize: 10,
      page: 0,
      isOver: false,
      articleId: '',
      articleDetail: {}
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    init() {
      this.getActive();
      this.listen();
    },
    listen() {
      window.addEventListener('scroll', this.handleScroll);
    },
    handleScroll() {
      let offsetHeight = clientHeight + window.scrollY,
          ulHeight = document.getElementById('activity').offsetHeight;
      if (offsetHeight > ulHeight) {
        this.page++;
        this.getActive();
      }
    },
    getActive() {
      if (this.isOver) return ;
      let flag = false;
      if (flag) return ;
      flag = true;
      API.getActive({
        page: this.page,
        pageSize: this.pageSize
      }).then(response => {
         let res = response.body;
         flag = false;
         if (res.code == 0 ) {
            if (res.list.length > 0) {
              this.isOver = false;
              res.list.forEach(item => {
                this.list.push(item);
              }) 
            } else {
              this.isOver = true;
            }      
         }
      })
    },
    
  },
  components: {
  	menuNav,
  }
}
</script>

<style lang="less">
.main {
  width: 100%;
  margin-top: 50px;
  padding-top: 6px;
  background: #fafafa;
  h1 {
    margin: 0;
    text-align: left;
    font-size: 16px;
    text-indent: 12px;
    line-height: 33px;
    position: relative;
    padding: 3px;
    &:before {
        content: '';
        position: absolute;
        width: 5px;
        height: 18px;
        left: 0;
        background: #ffc107;
        left: 2%;
          top: 27%;
      }
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      border-bottom: 1px solid #ccc;
      width: 100%;
    }
  }
  ul {
    display: block;
    list-style-type: none;
    padding: 0;
      a {
        text-decoration: none;
        color: #5a5a5a;
        li {
          margin: 0 auto;
          height: 212px;
          width: 95%;
          margin-bottom: 20px;
          img {
            width: 100%;
            height: 180px;
          }
          div {
            position: relative;
            line-height: 36px;
            margin-top: -3px;
           
            &:after {
              content: '';
              position: absolute;
              left: 0;
              bottom: 0;
              border-bottom: 1px solid #ccc;
              width: 100%;
            }
            p {
               background: #fff;
              overflow:hidden;
              text-indent: 6px;
              margin: 0;
              font-weight: bold;
              width: 100%;
              text-overflow:ellipsis;
              -o-text-overflow:ellipsis;
              -webkit-text-overflow:ellipsis;
              -moz-text-overflow:ellipsis;
              white-space:nowrap;
            }
          }
        }
      }
      
  }
  .page-infinite-loading {
    text-align: center;
  }
  .mint-spinner-fading-circle {
    margin: 0 auto;
  }
  .over {
    text-align: center;
    line-height: 12px;
    padding-bottom:6px;
    border-bottom: 1px solid #ccc;
  }
}
</style>

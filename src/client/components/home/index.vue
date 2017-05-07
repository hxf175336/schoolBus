<template>
  <div class="home">
    <menuNav></menuNav>
    <div class="map-main" v-if="!isdetail">
      <baidu-map class="vue-map" :center="center" :min-zoom="18" >
        <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"/>
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"/>
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :autoLocation="true" />
        <bm-marker v-if="theSchoolBusListMap"
          :position="theSchoolBusListMap" 
          :dragging="false" 
          animation="BMAP_ANIMATION_BOUNCE" 
          :label="{content: '校车', 
          opts: {offset: {width: 20, height: -10}}}">
        </bm-marker>
        <bm-marker v-if="positionList" v-for="item in positionList"
          :position="item" 
          :dragging="false" 
          animation="BMAP_ANIMATION_BOUNCE" 
          :label="{content: '校车停靠点', 
          opts: {offset: {width: 20, height: -10}}}">
        </bm-marker>
        
      </baidu-map>
    <div class="search-recent-bus" v-if="btnVisible" @click.nactive="showBus()">
      <div class="search-bus-box">
        <div class="search-bus-button">查看校车</div>
      </div>
    </div>
      <div class="search-recent-bus" v-if="payBtnVisible" @click.nactive="toPayFor()">
        <div class="search-bus-box">
          <div class="search-bus-button">我要支付</div>
        </div>
      </div>
    </div>
    <div v-else style="overflow:hidden">
       <detail @reset="reset" :user-name="userName"></detail>
    </div>

  </div>

</template>

<script>
import menuNav from '../common/menu.vue'
import { Indicator } from 'mint-ui'
import detail from './detail.vue'
import {getCookie} from 'util/utils.js'
import API from './api.js'
import position from '../../config/position.js'
export default {
  data () {
    return{
      flag: false,
      btnVisible: false,
      isdetail: false,
      payBtnVisible: false,
      userName: '',
      positionList: [],
      theSchoolBusList: [],
      theSchoolBusListMap: {
        lng: '',
        lat: ''
      },
      center: {
        lng: '',
        lat: ''
      }
    }
  },

  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.cookie();
      this.getLocation();
      
    },
    // 获取cookie
    cookie() {
      let userName = getCookie('userName');
      if (userName && userName !== '') {
        this.userName = userName;
      } else {
        this.$router.replace('/login');
      }
    },
    // getlocation
    getLocation() {
      Indicator.open('定位中...');
      // setTimeout(() => {
      //     Indicator.close();
      // }, 2000);
      // 方案1
      // let that = this;
      // if (navigator.geolocation) {
      //   navigator.geolocation.watchPosition((position) => {
      //     Indicator.close();  
      //     that.btnVisible = true;
      //     console.log(position);
      //     that.center = {
      //       lng: position.coords.longitude,
      //       lat: position.coords.latitude
      //     }
      //   });
      // } 


      /*方案2*/
      let geolocation = new BMap.Geolocation(),
          that = this;
    	geolocation.getCurrentPosition(function(r){
    		if(this.getStatus() == BMAP_STATUS_SUCCESS){
          Indicator.close();
          that.btnVisible = true;
          that.center = {
            lng: r.longitude,
            lat: r.latitude
          }
          console.log(that.center)
    		}
    		else {
    			alert('failed'+this.getStatus());
    		}
    	},{enableHighAccuracy: true});
    },
    //
    toPayFor() {
      this.isdetail = true;
    },
    // 显示校车
    showBus() {
      this.payBtnVisible = true;
      this.btnVisible = false;
      this.positionList = position.position;
      // 获取校车司机的ip
      API.getDriverIp({
        userType: '1'
      }).then(response => {
        let res = response.body;
        this.theSchoolBusList = res.list;
        let that = this,
            map = [];
        this.theSchoolBusList.forEach((item) => {
            that.$http.jsonp('http://api.map.baidu.com/location/ip?ak=4b04053e2f36b919f23fe04a9b2959e3&coor=bd09ll&ip='+ item.userIp)
            .then(response => {
                let res = response.body;
                
                let point = new BMap.Point(res.content.point.x, res.content.point.y);
                console.log(point);
                let translateCallback = (data) => {
                  if(data.status === 0) {
                    var marker = new BMap.Marker(data.points[0]);
                    let theDriver = {
                      lng: marker.point.lng + 0.06918,
                      lat: marker.point.lat - 0.0962790
                    }

                    that.theSchoolBusListMap = JSON.parse(JSON.stringify(theDriver  ));
                    console.log(that.theSchoolBusListMap);
                  }
                }
                setTimeout(function(){
                  var convertor = new BMap.Convertor();
                  var pointArr = [];
                  pointArr.push(point);
                  convertor.translate(pointArr, 1, 5, translateCallback)
                });
                
            }, response => {
                console.log(response);
            })
        });
      })
     
    },
    
    reset() {
      this.btnVisible = true;
      this.isdetail = false;
      this.payBtnVisible = false;
    } 
  },
  components: {
    menuNav, detail
  }
}
</script>

<style lang="less">
.home {
  
  height: 100%;
  .map-main {
    height: 100%;
    .vue-map {
    top:50px;
    width: 100%;
    height: 100%;
    height: calc(~"100% - 50px");
    .anchorBL {
      display: none;
    }
  }
  .search-recent-bus {
    z-index: 1;
    position: fixed;
    bottom: 0;
    left: 50%;
    margin-left: -50px;
    bottom: 12px;
    .search-bus-box, .search-bus-button {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .search-bus-box {
      width: 90px;
      height: 90px;
      border-radius: 45px;
      background: #fff;
    }
    .search-bus-button {
      width: 80px;
      height: 80px;
      border-radius: 40px;
      background: #111;
      color: #49ec49;
      font-variant: inherit;
      font-weight: bold;
    }
  }
  }
}
</style>

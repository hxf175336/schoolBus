<template>
  <div class="home">
    <menuNav></menuNav>
    <baidu-map class="vue-map" :center="center" :min-zoom="17" >
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"/>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"/>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :autoLocation="true" />
    </baidu-map>
    <div class="search-recent-bus" v-if="btnVisible">
      <div class="search-bus-box">
        <div class="search-bus-button">查看校车</div>
      </div>
    </div>
  </div>
</template>

<script>
import menuNav from '../common/menu.vue'
import { Indicator } from 'mint-ui'
export default {
  data () {
    return{
      btnVisible: false,
      center: {
        lng: '',
        lat: ''
      }
    }
  },
  mounted() {
    this.getLocation();
  },
  methods: {
    // getlocation
    getLocation() {
      Indicator.open('定位中...');

      // 方案1
      // let that = this;
      // if (navigator.geolocation) {
      //   navigator.geolocation.watchPosition((position) => {
      //     console.log(position);
      //     Indicator.close();
      //     that.btnVisible = true;
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
    		}
    		else {
    			alert('failed'+this.getStatus());
    		}
    	},{enableHighAccuracy: true});
    }
  },
  components: {
    menuNav
  }
}
</script>

<style lang="less">
.home {
  
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
      width: 100px;
      height: 100px;
      border-radius: 50px;
      background: #e4e6e7;
    }
    .search-bus-button {
      width: 90px;
      height: 90px;
      border-radius: 45px;
      background: #111;
      color: #49ec49;
      font-variant: inherit;
      font-weight: bold;
    }
  }
}
</style>

<template>
  <div class="my-map amap-page-container">
    <div class="search-bar">
      <el-input class="search-inp" v-model="search" placeholder="请输入站点名称"></el-input>
      <el-button type="primary">查询</el-button>
    </div>
    <el-amap
      vid="amapDemo3"
      :center="center"
      :zoom="zoom"
      :amap-manager="amapManager"
      :plugin="plugin"
      class="amap-demo"
    >
      <el-amap-marker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
        :vid="index"
        :events="marker.events"
        :visible="marker.visible"
      >
        <div class="marker-info">
          <img :src="markersImg" alt />
          <span>{{marker.num}}</span>
        </div>
      </el-amap-marker>
      <el-amap-info-window
        :position="currentWindow.position"
        :content="currentWindow.content"
        :visible="currentWindow.visible"
        :events="currentWindow.events"
      ></el-amap-info-window>
    </el-amap>
  </div>
</template>

<script>
import VueAMap from "vue-amap";
let amapManager = new VueAMap.AMapManager();
export default {
  data() {
    let self = this;
    const center = [113.92, 22.52];

    return {
      markersImg: require("@/assets/images/m1.png"),
      search: "",
      amapManager,
      plugin: [
        {
          pName: "MapType",
          defaultType: 0
        },
        {
          pName: "ToolBar",
          position: "LB"
        }
      ],
      zoom: 12,
      center,
      markers: [],
      windows: [],
      count: 0,
      currentWindow: {
        position: [0, 0],
        content: "",
        events: {},
        visible: false
      }
    };
  },
  created() {
    let self = this;
    let markers = [];
    let index = 0;
    let windows = [];
    let basePosition = [113.92, 22.52];
    let num = 5;

    for (let i = 0; i < num; i++) {
      markers.push({
        position: [basePosition[0] + i * 0.03, basePosition[1] + i * 0.03],
        visible: true,
        num: 5 + i,
        events: {
          click: () => {
            this.windows.forEach(window => {
              window.visible = false;
            });
            this.currentWindow = this.windows[i];
            self.$nextTick(() => {
              this.currentWindow.visible = true;
            });
          }
        }
      });
      windows.push({
        position: [basePosition[0] + i * 0.03, basePosition[1] + i * 0.03],
        content: `<div class="prompt">${i}</div>`,
        visible: true,
        events: {
          close() {}
        }
      });
    }
    this.windows = windows;
    this.markers = markers;
  },
  components: {},

  computed: {},

  mounted: function() {},

  methods: {}
};
</script>
<style lang='scss' scoped>
.my-map {
  height: 100%;
  width: 100%;
  position: relative;
  .amap-demo {
    height: 100%;
    width: 100%;
    .amap-marker {
      width: 53px;
      height: 53px;
      background-image: url("../../assets/images/m1.png");
      text-align: center;
      line-height: 53px;
      background-position: 0px 0px;
      color: #fff;
      font-size: 12px;
      cursor: pointer;
      .marker-info {
        position: relative;
        left: -5px;
        top: -7px;
        span {
          position: absolute;
          top: 35%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 12px;
        }
      }
    }
  }
  .search-bar {
    display: flex;
    left: 50px;
    top: 50px;
    position: absolute;
    z-index: 100000;
    .search-inp .el-input__inner {
      border-radius: 4px 0 0 4px;
    }
    .el-button {
      border-radius: 0 4px 4px 0;
    }
  }
}
</style>
<style lang='scss'>
.my-map {
  .search-bar {
    .search-inp .el-input__inner {
      border-radius: 4px 0 0 4px;
    }
  }
  .prompt {
    background: white;
    width: 200px;
    height: 50px;
    text-align: center;
  }
  .amap-info-close {
    transition: all ease 0.1s;
  }
  .amap-info-close:hover {
    color: #409eff;
  }
}
</style>
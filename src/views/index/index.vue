<template>
    <div
        class="index"
        :class="isDrag?'noselect':''"
        @mousemove.prevent="mousemove"
        @mouseup="mouseup"
    >
        <div class="map-wrap" ref="map" :style="'height:'+mapH+'px;'">
            <div class="resize" @mousedown="mousedown"></div>
            <my-map></my-map>
        </div>
        <div class="table-wrap" :style="'height:'+tableH+'px;'">
            <my-table :tableData="tableData" @dblclick="dblclick"></my-table>
        </div>
    </div>
</template>

<script>
import myTable from "@/components/index/myTable";
import myMap from "@/components/index/myMap";
export default {
  data() {
    var _this = this;
    return {
      mapH: 400,
      mapT: 0,
      tableH: 0,
      tableT: 400,
      startY: 0,
      tableStartY: 0,
      windowH: 1000,
      navH: 76,
      isDrag: false,
      border: true,
      tableData: {
        url: "/ordersLine/select",
        // children: {
        //   url: "/ordersLine/select",
        //   lazy: true,
        //   param: "ordersHeadId",
        //   valueParam: "orderNumber",
        //   rowKey: "oId",
        //   msg: "该订单没有子订单"
        // },
        index: true,
        height: 0,
        formData: {
          searchParam: ""
        },
        cols: [
          { label: "订单明细号", param: "orderLineNO", width: 150 },
          { label: "箱号", param: "containerNo", width: 220 },
          { label: "票号", param: "ticketNumber", width: 150 },
          { label: "制票时间", param: "ticketTime", width: 120 },
          { label: "介质", param: "typeName", width: 120 },
          { label: "状态", param: "statusName", width: 120 },
          { label: "添加人", param: "addUser", width: 120 }
        ], //表格数据列表 label表头名称 param字段名
        done: function(data) {}
      }
    };
  },

  components: {
    myTable,
    myMap
  },

  computed: {},
  created() {
    var mapH = this.mapH,
      windowH = window.innerHeight,
      tableH;
    if (windowH < 600) {
      windowH = 750;
    }
    tableH = windowH - mapH - this.navH;
    this.tableH = tableH;
    this.windowH = windowH;
    var h = tableH - 40;
    this.tableData.height = h;
  },
  mounted: function() {},
  methods: {
    mousedown(e) {
      this.startY = e.y - this.mapH;
      this.isDrag = true;
    },
    mousemove(e) {
      var endY = e.y - this.startY,
        tableEndY = e.y - this.startTableY;
      if (this.isDrag) {
        if (endY >= this.windowH - this.navH) {
          endY = this.windowH - this.navH;
        }
        this.mapH = endY;
        this.tableH = this.windowH - endY - this.navH;
        var h = this.tableH - 40;
        if (h > 500) {
          h = 500;
        }
        this.tableData.height = h;
      }
    },
    mouseup(e) {
      this.isDrag = false;
    },
    dblclick(data) {}
  }
};
</script>
<style lang='scss' scoped>
.index {
  padding: 0 !important;
  .map-wrap {
    width: 100%;
    position: relative;
    overflow: hidden;
    .resize {
      position: absolute;
      bottom: 0;
      right: 0;
      background: url("../../assets/images/ui-icons.png") no-repeat;
      z-index: 10000;
      width: 16px;
      height: 16px;
      background-position: -64px -224px;
      cursor: se-resize;
    }
  }
  .table-wrap {
    width: 100%;
    position: relative;
    overflow: hidden;
    background: #fff;
    .el-table {
      height: 100%;
    }
  }
}
</style>
<style lang='scss'>
.index {
  margin: 1px;
  .my-table .pagination {
    position: absolute !important;
    width: 100% !important;
    left: 0;
    margin-left: 0;
    z-index: 1000;
  }
}
.index.noselect {
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
</style>
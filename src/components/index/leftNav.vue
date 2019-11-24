<template>
    <div :class="['left-nav',$store.state.skin]">
        <el-menu
            :default-active="menusIndex"
            class="el-menu-vertical-demo"
            text-color="#fff"
            :unique-opened="true"
            @open="handleOpen"
            @close="handleClose"
            @select="select"
        >
            <el-submenu v-for="(items,index) in list" :key="index" :index="''+index">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">{{items.title}}</span>
                </template>
                <el-menu-item
                    v-for="(item,index) in items.children"
                    :data-index="index"
                    :key="index"
                    :index="item.name"
                    :route="item"
                >{{item.title}}</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      list: [
        {
          name: "list",
          title: "基础信息",
          icon: "",
          children: []
        },
        {
          name: "order",
          title: "订单管理",
          icon: "",
          children: [
            {
              name: "orderList",
              title: "订单列表",
              icon: ""
            }
          ]
        },
        {
          name: "shipment",
          title: "装货委托",
          icon: "",
          children: [
            {
              name: "shipmentList",
              title: "装货委托",
              icon: ""
            },
            {
              name: "shipmentSelect",
              title: "装货委托查询",
              icon: ""
            }
          ]
        },
        {
          name: "",
          title: "发运委托",
          icon: "",
          children: []
        },
        {
          name: "",
          title: "卸货委托",
          icon: "",
          children: []
        },
        {
          name: "",
          title: "排空委托",
          icon: "",
          children: []
        }
      ],
      switchFlag: true
    };
  },

  components: {},

  computed: {
    ...mapState({
      menusIndex: state => {
        return state.menusIndex;
      }
    })
  },

  mounted: function() {},

  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    select(name, path) {
      var index = path[0];
      var obj = {},
        list = this.list;
      var data = list[index].children;
      data.forEach(ele => {
        if (ele.name == name) {
          obj.title = ele.title;
        }
      });
      obj.name = name;
      this.$store.commit("addMenu", obj);
    }
  }
};
</script>
<style lang='scss' scoped>
.left-nav {
  overflow: auto;
  height: 100%;
  .el-menu-vertical-demo {
    width: 160px;
  }
  .logo {
    text-align: center;
  }
}
.left-nav::-webkit-scrollbar {
  display: none;
}
</style>

<style lang='scss'>
.left-nav {
  .el-tooltip,
  .el-submenu .el-menu-item,
  .el-submenu__title {
    padding: 0 10px !important;
    min-width: 160px;
  }
  .el-menu {
    border: none;
    background: transparent;
  }
  .el-menu--inline {
    li.el-menu-item {
      padding-left: 39px !important;
    }
  }
  .el-submenu__title i {
    color: #fff;
  }
}
</style>
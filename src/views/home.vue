<template>
    <div class="home">
        <top-nav class="top-nav"></top-nav>
        <div class="leftNav" :class="!switchFlag?'active':''">
            <left-nav></left-nav>
        </div>
        <div class="main" :class="!switchFlag?'active':''">
            <div class="switch-btn" @click="switchFn">
                <i :class="switchFlag?'el-icon-s-fold':'el-icon-s-unfold'"></i>
            </div>
            <div class="mainIn" :class="this.$store.state.skin">
                <el-dropdown @command="handlePage" class="page-handle">
                    <span class="el-dropdown-link">
                        <i class="el-icon-magic-stick el-icon--left"></i>
                        页面操作
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-refresh-left" command="1">刷新当前</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-circle-close" command="2" divided>关闭其他</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-close" command="3" divided>关闭全部</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <!-- <tab-line/> -->
                <el-tabs
                    v-model="tabIndex"
                    type="card"
                    @tab-remove="removeTab"
                    @tab-click="clickTab"
                >
                    <el-tab-pane
                        v-for="(item, index) in this.$store.state.menus"
                        :key="item.name+index"
                        :label="item.title"
                        :name="item.name"
                        :closable="!!index"
                        lazy
                    >
                        <router-view
                            v-if="item.name != isShowPage.name || isShowPage.show "
                            class="view"
                            :name="item.name"
                            :params="params"
                        ></router-view>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import leftNav from "@/components/index/leftNav";
import topNav from "@/components/index/topNav";
import { setTimeout } from "timers";
import { localStore, preloading } from "@/tool/index";
export default {
  data() {
    return {
      switchFlag: true,
      lLeft: 0,
      mLeft: 160,
      isShowPage: {
        show: true,
        name: "index"
      },
      params: { id: 1 }
    };
  },
  components: {
    topNav,
    leftNav
  },
  created: function() {
    this.$store.commit("setSkin", localStore.get("skin"));
    window.addEventListener("beforeunload", e => {
      const { menus, menusIndex } = this.$store.state;
      localStore.set("menus", menus);
      localStore.set("menusIndex", menusIndex);
    });
    let menus = localStore.get("menus");
    let menusIndex = localStore.get("menusIndex");
    menus &&
      menus.map(menu => {
        this.$store.commit("addMenu", menu);
      });
    menusIndex && this.$store.commit("clickMenu", menusIndex);
    preloading();
  },
  computed: {
    tabIndex: {
      get: function() {
        return this.$store.state.menusIndex;
      },
      set: function(d) {
        return this.$store.state.menusIndex;
      }
    }
  },
  watch: {
    "$store.state.menus": function(newV, oldV) {
      ["shipmentList", "shipmentSelect"].includes(
        this.$store.state.menusIndex
      ) && this.refresh();
    }
  },
  mounted: function() {},
  methods: {
    clickTab: function({ name }) {
      this.$store.commit("clickMenu", name); //修改tab
      ["shipmentList", "shipmentSelect"].includes(name) && this.refresh();
    },
    removeTab: function(name) {
      this.$store.commit("removeMenu", name); //修改tab
    },
    addTab: function() {
      this.$store.commit("addMenu", d);
    },
    switchFn: function() {
      this.switchFlag = !this.switchFlag;
    },
    handlePage: function(command) {
      switch (command) {
        case "1":
          this.refresh();
          break;
        case "2":
          this.closeOther();
          break;
        case "3":
          this.closeAll();
          break;
      }
    },
    refresh: function() {
      this.isShowPage.name = this.$store.state.menusIndex;
      this.isShowPage.show = false;
      this.$nextTick(function() {
        this.isShowPage.show = true;
      });
    },
    closeOther: function() {
      this.$store.commit("removeOtherMenu"); //关闭全部
    },
    closeAll: function() {
      this.$store.commit("removeAllMenu"); //关闭全部
    }
  }
};
</script>
<style lang='scss' scoped>
@import "@/assets/css/common.scss";
.home {
  height: 100%;
  overflow: hidden;
  .leftNav {
    position: fixed;
    left: 0;
    top: 44px;
    z-index: 20;
    height: calc(100% - 45px);
    transition: all ease 0.3s;
  }
  .leftNav.active {
    left: -160px;
  }
  .top-nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
  }
  .main {
    position: absolute;
    transition: all ease 0.3s;
    right: 0;
    left: 160px;
    top: 45px;
    z-index: 30;
    height: calc(100% - 46px);
    .view {
      height: 100%;
      padding: 15px;
      padding-bottom: 39px;
      overflow: auto;
    }
    .switch-btn {
      position: absolute;
      top: 45px;
      left: 0;
      transform: translateY(-50%);
      cursor: pointer;
      height: 30px;
      width: 20px;
      line-height: 30px;
      color: #fff;
      background: #4a517b;
      text-align: center;
      line-height: 30px;
      z-index: 10;
      transition: all ease 0.1s;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
      i {
        font-size: 14px;
      }
    }
    .switch-btn:hover {
      background: #5f689c;
    }
    .mainIn {
      height: calc(100%);
      position: relative;
      el-dropdown {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
      }
    }
  }
  .main.active {
    left: 0;
  }
}
</style>
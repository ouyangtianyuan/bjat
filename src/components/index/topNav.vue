<template>
  <div :class="['top-nav',this.$store.state.skin]">
    <div class="left">
      <img class="logo" :src="logo" />
    </div>
    <div class="right">
      <div class="r-item skin" @click="setSkin">
        <i class="el-icon-orange"></i>
      </div>
      <div class="r-item">
        <el-badge :value="3" :max="9" class="item">
          <i class="el-icon-message-solid"></i>
        </el-badge>
        <span>预警信息</span>
      </div>
      <div class="r-item">
        <el-badge :value="3" :max="9" class="item">
          <i class="el-icon-message"></i>
        </el-badge>
        <span>消息通知</span>
      </div>
      <div class="r-item">
        <el-dropdown @command="handles">
          <span class="el-dropdown-link">
            <i class="admin-icon el-icon-user-solid"></i>
            admin
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <p>修改密码</p>
            <p>退出登录</p>-->
            <el-dropdown-item command="1">修改密码</el-dropdown-item>
            <el-dropdown-item command="2">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-drawer
      title="配色方案"
      :visible.sync="showSkinBox"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      append-to-body
      :modal="false"
      size="350"
      @mousemove.native="drawerOut"
    >
      <div class="demo-drawer__content">
        <div class="skins">
          <div
            class="aSkin"
            :class="[skin,isChecked === index ? 'active':'']"
            @click="checkSkin(skin)"
            v-for="(skin,index) in skins"
            :key="index"
          >
            <div class="aSkin_top"></div>
            <div class="aSkin_left"></div>
          </div>
        </div>
        <el-form :model="form"></el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: require("@/assets/images/logo_03.png"),
      showSkinBox: false,
      form: {},
      loading: false,
      skins: [
        "skin0",
        "skin1",
        "skin2",
        "skin3",
        "skin4",
        "skin5",
        "skin6",
        "skin7",
        "skin8"
      ],
      drawerCloseKey: false
    };
  },

  components: {},

  computed: {
    isChecked: function() {
      return this.skins.indexOf(this.$store.state.skin);
    }
  },
  created() {
    this.changeLogo();
  },
  updated() {
    this.changeLogo();
  },
  mounted: function() {},

  methods: {
    handles: function(e) {
      switch (e) {
        case "1":
          break;
        case "2":
          this.$router.push({ name: "login", params: { exit: "true" } });
          break;
      }
    },
    setSkin: function() {
      this.showSkinBox = true;
    },
    checkSkin: function(e) {
      this.$store.commit("setSkin", e);
    },
    drawerOut: function(e) {
      let key = e.path[0].getAttribute("role");
      if (key === null) {
        this.drawerCloseKey = true;
      }
      if (key === "document" && this.drawerCloseKey) {
        this.drawerCloseKey = false;
        this.$refs.drawer.closeDrawer();
      }
    },
    changeLogo() {
      var skin = this.$store.state.skin;
      if (skin == "skin6" || skin == "skin7" || skin == "skin8") {
        this.logo = require("@/assets/images/logo_04.png");
      } else {
        this.logo = require("@/assets/images/logo_03.png");
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.top-nav {
  display: flex;
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #eee;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .left img {
    height: 24px;
    margin-left: 30px;
  }
  .right {
    .r-item {
      display: inline-block;
      cursor: pointer;
      span {
        font-size: 12px;
        padding: 0 15px;
      }
      i {
        font-size: 18px;
        color: #666;
      }
      .el-dropdown-link {
        padding: 0 0 0 5px;
        margin-right: 20px;
      }
      .el-dropdown i {
        font-size: 14px;
      }
      .el-dropdown .admin-icon {
        font-size: 18px;
      }
    }
    .skin {
      margin-right: 10px;
      padding: 0 20px;
    }
  }
  el-dialog {
    width: 400px;
    height: 500px;
  }
}
</style>
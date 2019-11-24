<template>
    <div class="login">
        <img class="bg_img" :class="!active?'active':'fadin'" :src="url1">
        <img class="bg_img" :class="active?'active':'fadin'" :src="url4">
        <div class="login_box">
            <img class="logo" :src="logo">
            <el-form ref="form" status-icon :rules="rules" :model="form">
                <el-form-item prop="userName">
                    <el-input
                        v-model="form.userName"
                        placeholder="请输入用户名"
                        prefix-icon="el-icon-user"
                        :clearable="true"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="form.password"
                        placeholder="请输入密码"
                        prefix-icon="el-icon-lock"
                        type="password"
                        :show-password="true"
                    ></el-input>
                </el-form-item>
                <el-button type="primary" @click="login('form')">登 录</el-button>
                <div class="link">
                    <el-link type="primary" :underline="false">忘记密码</el-link>
                    <span>|</span>
                    <el-link class="regist" type="primary" :underline="false">注册</el-link>
                </div>
            </el-form>
            <span class="foot">CopyRight 深圳市中集智能科技有限公司</span>
        </div>
    </div>
</template>

<script>
import { setInterval } from "timers";
import Qs from "qs";
export default {
  data() {
    return {
      url1: require("@/assets/images/login_bg1.jpg"),
      url2: require("@/assets/images/login_bg2.png"),
      url3: require("@/assets/images/login_bg3.jpg"),
      url4: require("@/assets/images/login_bg4.jpg"),
      active: true,
      logo: require("@/assets/images/logo_03.png"),
      form: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  components: {},
  created: function() {
    if (this.$route.params.exit) {
      location.reload();
    }
    setInterval(function() {
      this.active = !this.active;
    }, 12000);
  },
  computed: {},
  mounted: function() {},

  methods: {
    login: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http("user/reLogin", {
            method: "post",
            baseURL: "http://47.95.8.179:8080/cimc-core/",
            data: { ...this.form }
          })
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
      this.$router.push("index");
    }
  }
};
</script>
<style lang='scss' scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .bg_img {
    width: 2400px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -1200px;
    margin-top: -750px;
  }
  .login_box {
    box-shadow: -5px 0px 15px rgb(1, 74, 153, 0.3),
      5px 0px 15px rgb(1, 74, 153, 0.3);
    position: absolute;
    right: 20%;
    top: 50%;
    transform: translateY(-50%);
    width: 360px;
    border-radius: 15px;
    border: 1px solid #fff;
    min-height: 400px;
    background: rgb(255, 255, 248);
    opacity: 0.9;
    z-index: 100;
    padding: 30px 40px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo {
      margin-top: 20px;
      height: 30px;
    }

    .small {
      color: rgb(1, 74, 153);
      font-weight: bold;
      font-size: 12px;
      text-align: left;
      width: 100%;
      font-style: italic;
    }
    .el-form {
      margin-top: 40px;
      width: 100%;
      font-size: 14px;
      .el-input__icon,
      .el-input__inner {
        height: 40px;
        line-height: 40px;
      }
      .link {
        margin-top: 15px;
        font-size: 12px;
        color: #409eff;
        text-align: center;
        span {
          margin: 0 10px;
        }
        .regist {
          border-bottom: 1px solid #409eff;
        }
      }
    }
    .foot {
      font-size: 12px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: flex-end;
    }
  }
}
</style>
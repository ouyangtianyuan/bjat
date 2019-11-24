<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang='scss' scoped>
@import "@/assets/css/common.scss";
@import "@/assets/css/computed.scss";
#app {
  height: 100%;
  overflow: hidden;
  background: $homeBackgroundColor;
}
</style>
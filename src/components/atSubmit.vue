<template>
    <div class="at-submit">
        <el-button type="success" @click="draft">保存草稿</el-button>
        <el-button type="success" @click="submit">{{text}}</el-button>
    </div>
</template>

<script>
export default {
  props: {
    text: String,
    draft: Function,
    submit: Function
  },
  data() {
    return {};
  },
  components: {},
  computed: {},
  mounted: function() {},
  methods: {}
};
</script>
<style lang='scss' >
.at-submit {
  position: absolute;
  right: 30px;
  top: 10px;
}
</style>
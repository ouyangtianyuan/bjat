<template>
  <div class="entrust">
    <el-dialog
      :title="title"
      :width="width||'75%'"
      top="15vh"
      @close="close"
      :visible.sync="flag"
      :modal-append-to-body="false"
      :destroy-on-close="true"
    >
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane
          v-for="(item, index) in tabList"
          :key="index"
          :label="item.label"
          :name="item.name"
        ></el-tab-pane>
      </el-tabs>
      <my-table ref="myTable" :tableData="data"></my-table>
    </el-dialog>
  </div>
</template>

<script>
import myTable from "@/components/index/myTable";
export default {
  props: ["diaoflag", "tableData", "entrustData"],
  data() {
    return {
      title: this.entrustData.title,
      tabList: this.entrustData.tabList,
      width: this.entrustData.width,
      flag: false,
      activeName: "ZH"
    };
  },
  components: {
    myTable
  },
  watch: {
    diaoflag(n, o) {
      this.flag = n;
    }
  },
  created() {},

  mounted() {},

  updated() {},

  computed: {
    data() {
      return this.tableData;
    }
  },

  methods: {
    close() {
      this.$emit("close");
    },
    tabClick() {
      this.$emit("tabClick", this.activeName);
    },
    reload() {
      setTimeout(() => {
        this.$refs.myTable.reload();
      }, 100);
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
<style lang='scss'>
.entrust {
  .el-dialog__wrapper .my-table .pagination {
    position: relative;
    width: 100%;
    margin: 0;
    border: none;
    padding: 10px 0;
  }
  .el-dialog__wrapper .my-table .tableSearch .form-btn .el-col-16 {
    width: 100%;
  }
  .el-dialog__wrapper .my-table .btn-item {
    display: none;
  }
  .el-tabs__nav-wrap {
    margin-bottom: 20px;
  }
  .el-dialog__body {
    padding: 10px 20px;
  }
}
</style>
<template>
    <div class="at-select-table">
        <el-table
            :data="data"
            :border="true"
            ref="atTable"
            @row-dblclick="rowDblclick"
            highlight-current-row
        >
            <el-table-column align="center" label="序号" type="index"></el-table-column>
            <el-table-column
                :key="index"
                v-for="(col,index) in cols"
                :property="col.property"
                :width="col.width"
                :label="col.label"
                :formatter="col.formatter || defaultFormatter"
                align="center"
            ></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  props: {
    cols: Array,
    data: Array,
    callBack: Function
  },
  data() {
    return {};
  },
  watch: {},
  components: {},
  computed: {},
  mounted: function() {},
  methods: {
    defaultFormatter(row, column, cellValue, index) {
      return cellValue || "--";
    },
    rowDblclick: function(row, column, event) {
      this.callBack(row);
    }
  }
};
</script>
<style lang='scss'>
.at-select-table {
  width: 100%;
  height: 100%;
}
</style>
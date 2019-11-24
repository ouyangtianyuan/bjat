<template>
    <div class="at-cascade-supplier">
        <el-dialog
            title=""
            :visible.sync="isDialogVisible"
            @closed="closed"
            :modal-append-to-body="false"
            width="1200px"
            custom-class="at-dialog"
        >
            <div class="block">
                <span class="demonstration">选择供应商合同:</span>
                <el-cascader :props="props" filterable @change="change"></el-cascader>
            </div>
            <at-select-table :data="data" :cols="cols" :callBack="select"></at-select-table>
        </el-dialog>
    </div>
</template>

<script>
import atSelectTable from "@/components/atSelectTable";
export default {
  props: {
    show: Boolean,
    closed: Function,
    callBack: Function
  },
  components: { atSelectTable },
  data() {
    let that = this;
    return {
      data: [],
      value: {},
      isDialogVisible: false,
      supplier: {},
      cols: [
        { property: "supplierName", label: "供应商名称" },
        { property: "typeName", label: "介质" },
        { property: "placeFactory", label: "装卸货工厂" },
        { property: "siteName", label: "站点" },
        {
          property: "billingMode",
          label: "计费方式",
          formatter: this.billingModeFormatter
        }
      ],
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level, value } = node;
          if (level === 0) {
            that.$http.get("loadingOrderHead/getSupplierList").then(res => {
              const nodes = res.map(item => ({
                value: item,
                label: item,
                leaf: level == 1
              }));
              resolve(nodes);
            });
          }
          if (level === 1) {
            that.$http
              .get("loadingOrderHead/getSupplierContract?supplierName=" + value)
              .then(res => {
                const nodes = res.map(item => ({
                  value: item,
                  label: item.supplierNo,
                  leaf: level < 2
                }));
                resolve(nodes);
              });
          }
        }
      }
    };
  },
  watch: {
    show: function(newV, oldV) {
      this.isDialogVisible = newV;
    }
  },
  computed: {},
  mounted: function() {},
  methods: {
    change: function(e) {
      this.supplier = e[1];
      this.$http
        .get("loadingOrderHead/getSupplierRoute?supplierContractId=" + e[1].id)
        .then(res => {
          res &&
            res.map(d => {
              d.supplierName = e[0];
            });
          this.data = res;
        });
    },
    billingModeFormatter(row, column, cellValue, index) {
      const arr = ["按吨", "按箱"];
      return arr[cellValue] || "--";
    },
    select: function(data) {
      this.isDialogVisible = false;

      this.$parent.unitName = data.billingMode + "";

      data.supplierRouteId = data.id;
      data.stationSiteId = data.stationId;
      data = { ...data, ...this.supplier };
      data.jurisdictionId = data.jurisdiction;
      this.callBack(data);
    }
  }
};
</script>
<style lang='scss' >
.at-cascade-supplier {
  .block {
    margin-bottom: 20px;
  }
  .demonstration {
    margin: 20px;
  }
  .el-input {
    min-width: 500px;
  }
  .at-dialog {
    min-height: 500px;
  }
}
</style>
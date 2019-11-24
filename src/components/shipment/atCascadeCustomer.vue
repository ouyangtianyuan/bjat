<template>
    <div class="at-cascade-customer">
        <el-dialog
            title=""
            :visible.sync="isDialogVisible"
            @closed="closed"
            :modal-append-to-body="false"
            width="1200px"
            custom-class="at-dialog"
        >
            <div class="block">
                <span class="demonstration">选择客户合同:</span>
                <el-cascader :props="props" filterable @change="change"></el-cascader>
            </div>
            <at-select-table :data="data" :cols="cols" :callBack="selectCustomer"></at-select-table>
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
      customer: {},
      cols: [
        { property: "customerName", label: "客户名称", width: "240px" },
        { property: "typeName", label: "介质" },
        { property: "landingPlace", label: "装货工厂", width: "240px" },
        { property: "destination", label: "卸货工厂", width: "240px" },
        {
          property: "goodsTransportType",
          label: "运输方式",
          formatter: this.goodsTransportTypeFormatter
        },
        {
          property: "billingMode",
          label: "计费方式",
          formatter: this.billingModeFormatter
        }
      ],
      isDialogVisible: false,
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level, value } = node;
          if (level === 0) {
            that.$http.get("loadingOrderHead/getCustomerList").then(res => {
              const nodes = res.map(item => ({
                value: item.customerName,
                label: item.customerName,
                leaf: level == 1
              }));
              resolve(nodes);
            });
          }
          if (level === 1) {
            that.$http
              .get("loadingOrderHead/getCustomerContract?customerName=" + value)
              .then(res => {
                const nodes = res.map(item => ({
                  value: item,
                  label: item.contractNo,
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
      this.customer = e[1];
      this.$http
        .get("loadingOrderHead/getCustomerRoute?customerContractId=" + e[1].id)
        .then(res => {
          res &&
            res.map(d => {
              d.customerName = e[0];
            });
          this.data = res;
        });
    },
    goodsTransportTypeFormatter(row, column, cellValue, index) {
      const obj = {
        MM: "门到门",
        MD: "门到站",
        DD: "站到站",
        DM: "站到门"
      };
      return obj[cellValue] || "--";
    },
    billingModeFormatter(row, column, cellValue, index) {
      const arr = ["按吨", "按箱"];
      return arr[cellValue] || "--";
    },
    selectCustomer: function(data) {
      data.customerId = this.customer.customerId;
      data.loadingFactoryName = data.landingPlace;
      this.isDialogVisible = false;
      data.ordersHead = { ...this.customer, orderNumber: "" };

      this.callBack(data);
    }
  }
};
</script>
<style lang='scss' >
.at-cascade-customer {
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
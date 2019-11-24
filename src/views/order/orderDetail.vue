<template>
    <div class="orderDetail">
        <my-table :tableData="data" @dblclick="dblclick"></my-table>
    </div>
</template>

<script>
import myTable from "@/components/index/myTable";
import { selectAjax, localStore } from "@/tool/index";
export default {
  data() {
    return {
      tableData: {
        url: "/ordersLine/select",
        showBtn: {
          add: false,
          edit: false,
          del: false
        },
        cols: [
          { label: "订单明细号", param: "orderLineNO", width: 150 },
          {
            label: "箱号",
            param: "containerNo",
            width: 100
          },
          { label: "介质", param: "typeName", width: 100 },
          { label: "装货工厂", param: "startPlaceFactoryName", width: 150 },
          { label: "委托装货数量", param: "authorizedQuantity", width: 120 },
          { label: "已经完成数量", param: "completedQuantity", width: 120 },
          { label: "执行状态", param: "statusName", width: 120 },
          { label: "添加人", param: "addUser", width: 100 },
          { label: "添加日期", param: "addTime", width: 180 },
          { label: "装货委托兑现日期", param: "deliveryDate", width: 180 }
        ], //表格数据列表 label表头名称 param字段名
        formData: {
          ordersHeadId: null
        },
        done: function(data) {}
      }
    };
  },

  components: {
    myTable
  },

  computed: {
    data() {
      return this.tableData;
    }
  },
  created() {
    var searchBar = this.tableData.searchBar;
    var ordersHeadId = localStore.get("tableData").oId;
    this.tableData.formData.ordersHeadId = ordersHeadId;
    selectAjax({
      url: "/loadingOrderHead/getCustomerContract",
      label: "customerName",
      value: "id",
      done: function(res) {
        searchBar.select[0].data = res;
      }
    }); //客户
    this.searchBar = searchBar;
    console.log(this.tableData);
  },
  mounted: function() {},
  methods: {
    dblclick(data) {}
  }
};
</script>
<style lang='scss' scoped>
</style>
<template>
    <div class="orderList">
        <at-table :tableData="tableData" @dblclick="dblclick" @operateClick="operateClick"></at-table>
        <entrust
            ref="entrust"
            @close="close"
            :diaoflag="diaoflag"
            :tableData="tableData1"
            :entrustData="entrustData"
            @tabClick="tabClick"
        ></entrust>
    </div>
</template>

<script>
import atTable from "@/components/atTable";
import entrust from "@/components/order/entrust";
import { localStore, Session } from "@/tool/index";
export default {
  data() {
    return {
      diaoflag: false,
      entrustData: {
        title: "订单委托明细",
        tabList: [
          {
            label: "装货委托",
            name: "ZH"
          },
          {
            label: "发运委托",
            name: "FY"
          },
          {
            label: "卸货委托",
            name: "XH"
          },
          {
            label: "排空委托",
            name: "PK"
          }
        ]
      },
      tableData: {
        url: "/ordersHead/select",
        showBtn: {
          add: false,
          edit: false,
          del: false
        },
        operate: {
          width: 110,
          btn: [
            {
              label: "查看委托",
              event: "detail",
              type: "success"
            }
          ]
        },
        type: true,
        cols: [
          { label: "订单号", param: "orderNumber", width: 180 },
          {
            label: "客户名称",
            param: "customerName",
            width: 250
          },
          { label: "介质", param: "typeName" },
          { label: "装货工厂", param: "startPlaceFactoryName" },
          { label: "委托装货数量", param: "authorizedQuantity" },
          { label: "已经完成数量", param: "completedQuantity" },
          { label: "执行状态", param: "statusName" },
          { label: "添加人", param: "addUser" },
          { label: "添加日期", param: "addTime", width: 160 },
          { label: "装货委托兑现日期", param: "deliveryDate", width: 160 }
        ], //表格数据列表 label表头名称 param字段名
        search: [
          {
            placeholder: "请输入订单号",
            param: "searchParam",
            type: "input"
          },
          {
            placeholder: "请选择客户",
            data: Session.get("customer"),
            param: "customerId",
            type: "select"
          },
          {
            placeholder: "请选择执行状态",
            data: Session.get("ZHstatus"),
            param: "statusId",
            type: "select"
          },
          {
            placeholder: "请选择介质",
            data: Session.get("typeName"),
            param: "mediumTypeId",
            type: "select"
          },
          {
            placeholder: "请输入装货工厂",
            param: "startPlaceFactoryName",
            type: "input"
          }
        ],
        done: function(data) {}
      },
      tableData1: {
        height: 350,
        url: "/ordersHead/selectWt",
        showBtn: {
          add: false,
          edit: false,
          del: false
        },
        cols: [
          { label: "装货委托号", param: "orderLineNo", width: 150 },
          {
            label: "客户名称",
            param: "customerId",
            width: 250
          },
          { label: "介质", param: "mediumTypeId", width: 150 },
          { label: "装货工厂", param: "loadingFactoryName", width: 120 },
          { label: "委托装货数量", param: "authorizedQuantity", width: 120 },
          { label: "已经完成数量", param: "completedQuantity", width: 120 },
          { label: "执行状态", param: "statusId", width: 120 },
          { label: "添加人", param: "userName", width: 120 },
          { label: "添加日期", param: "addTime", width: 180 },
          { label: "装货委托兑现日期", param: "deliveryDate", width: 180 }
        ], //表格数据列表 label表头名称 param字段名
        formData: {
          oId: null,
          searchParam: "ZH"
        },
        done: function(data) {}
      } //委托明细表格数据
    };
  },

  components: {
    atTable,
    entrust
  },

  computed: {},
  mounted: function() {},
  methods: {
    dblclick(data) {
      localStore.set("tableData", data);
      this.$store.commit("addMenu", {
        name: "orderDetail",
        title: "订单明细"
      });
    },
    close() {
      this.diaoflag = false;
    },
    tabClick(val) {
      this.tableData1.formData.searchParam = val;
      setTimeout(() => {
        this.$refs.entrust.reload();
      }, 100);
    },
    operateClick(event, row) {
      this.diaoflag = true;
      this.tableData1.formData.oId = row.oId;
      setTimeout(() => {
        this.$refs.entrust.reload();
      }, 100);
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
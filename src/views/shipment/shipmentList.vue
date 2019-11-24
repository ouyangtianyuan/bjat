<template>
    <div class="shipmentList">
        <at-table
            :tableData="tableData"
            @dblclick="dblclick"
            @cellClick="cellClick"
            @add="add"
            @edit="edit"
            @del="del"
        ></at-table>
    </div>
</template>

<script>
import atTable from "@/components/atTable";
import { selectAjax, Session } from "@/tool/index";
export default {
  data() {
    return {
      tableData: {
        url: "/loadingOrderHead/getLoadingOrderHeadList",
        cols: [
          { label: "装货委托号", param: "loadOrderNo", width: 150 },
          { label: "客户名称", param: "customerName", width: 250 },
          { label: "介质", param: "mediumName", width: 100 },
          { label: "装货工厂", param: "loadingFactoryName", width: 250 },
          { label: "委托装货数量", param: "authorizedQuantity", width: 100 },
          {
            label: "已经完成数量",
            param: "completedQuantity",
            width: 100
          },
          {
            label: "执行状态",
            param: "statusName",
            width: 120,
            formatter: this.stateFormatter
          },
          { label: "添加人", param: "addUser", width: 120 },
          { label: "添加日期", param: "addTime", width: 180 },
          { label: "装货委托兑现日期", param: "deliveryDate", width: 180 }
        ], //表格数据列表 label表头名称 param字段名
        type: true,
        search: [
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
            placeholder: "请选择装货工厂",
            data: Session.get("factoryName"),
            param: "loadingFactoryName",
            type: "select"
          },
          {
            placeholder: "请选择发站",
            data: Session.get("siteName"),
            param: "stationSiteId",
            type: "select"
          },
          {
            param: "deliveryDate",
            placeholder: "装货委托兑现日期",
            type: "date"
          }
        ]
      }
    };
  },

  components: {
    atTable
  },
  computed: {},
  mounted: function() {},
  methods: {
    dblclick(data) {
      Session.set("tableData", data);
      this.$store.commit("addMenu", {
        name: "shipmentDetail",
        title: "装货委托详情"
      });
    },
    add() {
      this.$store.commit("addMenu", {
        name: "shipmentAdd",
        title: "新增装货委托"
      });
    },
    edit(data) {
      Session.set("tableData", data);
      this.$store.commit("addMenu", {
        name: "shipmentEdit",
        title: "修改装货委托"
      });
    },
    del(data) {
      const { ordersHeadId, loId } = data;
      this.$http
        .post("/loadingOrderHead/deleteLoad_Order", {
          ordersHeadId,
          loId,
          updateUser: "admin"
        })
        .then(res => {
          if (res) {
            if (res.code == 200) {
              this.$message({
                message: res.message,
                type: "success"
              });

              this.$parent.$parent.$parent.refresh();
            } else if (res.code == -1) {
              this.$message.error(res.message);
            }
          }
        });
    },
    cellClick(event, row) {},
    stateFormatter: function(cellValue) {
      return cellValue || "--";
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
<template>
    <div class="shipment-add shipment-edit">
        <at-form ref="atForm"></at-form>
        <at-image-upload ref="atImage" v-if="!isDetail"></at-image-upload>
        <at-add-table ref="atTable"></at-add-table>
        <at-submit v-if="!isDetail" text="发送装货委托" :draft="draft" :submit="submit"></at-submit>
    </div>
</template>

<script>
const moment = require("moment");
import atForm from "@/components/shipment/atForm";
import atAddTable from "@/components/shipment/atAddTable";
import atSubmit from "@/components/atSubmit";
import atImageUpload from "@/components/atImageUpload";
import { autoGenerate, Session } from "@/tool/index";
import { setTimeout } from "timers";
export default {
  props: {
    type: String
  },
  data() {
    return {
      urls: {
        add: {
          draft: "loadingOrderHead/creatLoad_Order",
          submit: "loadingOrderHead/sendLoad_Order"
        },
        edit: {
          draft: "loadingOrderHead/updateLoad_Order",
          submit: "loadingOrderHead/sendLoad_Order"
        }
      },
      isDetail: ["detail", "selectDetail"].includes(this.type)
    };
  },
  components: {
    atForm,
    atAddTable,
    atImageUpload,
    atSubmit
  },
  created: function() {
    if (this.type === "add") {
      setTimeout(() => {
        this.$refs.atForm.atForm.orderNumber = autoGenerate("orderNumber");
      }, 400);
    }
    if (this.type === "edit" || this.isDetail) {
      const tableData = Session.read("tableData");
      if (tableData) {
        tableData.landingPlace = tableData.loadingFactoryName;
        tableData.typeName = tableData.mediumName;
        tableData.unitName = tableData.unitName + "";
        tableData.oId = tableData.ordersHeadId;
        tableData.ordersHead = { ...tableData };
        this.$http
          .post("loadingOrderLine/getLoadOrderLineList", {
            keyWord: tableData.loId
          })
          .then(res => {
            setTimeout(() => {
              this.$refs.atTable.tableRows.unitName = tableData.unitName + "";
              this.$refs.atForm.atForm = tableData;
              res.data.map(d => {
                d.unitName += "";
              });
              res.data.map(d => {
                d.orderQuantity = d.authorizedQuantity;
                d.oId = d.lodId;
              });
              this.$refs.atTable.tableData = res.data;
            }, 400);
          });
      }
    }
  },
  computed: {},
  mounted: function() {},
  methods: {
    draft: function() {
      this.submit("draft");
    },
    submit: function(btn) {
      if (btn != "draft") {
        btn = "submit";
      }
      let post_data = {
        ...this.$refs.atForm.atForm,
        attachmentPath: this.$refs.atImage.attachmentPath
      };
      post_data.ordersLineList = [
        ...this.$refs.atTable.tableData,
        ...this.$refs.atTable.deleteData
      ];
      if (this.type === "edit") {
        //   if(this.$refs.atTable.dedeleteData)
        // console.log(this.$refs.atTable.dedeleteData);
      }
      if (post_data.ordersHead && post_data.orderNumber) {
        post_data.ordersHead["orderNumber"] = post_data.orderNumber;
      } else {
        post_data.ordersHead = {
          orderNumber: post_data.orderNumber
        };
      }
      if (
        "Invalid date" !=
        moment(post_data.deliveryDate).format("YYYY-MM-DD HH:mm:ss")
      ) {
        post_data.deliveryDate = moment(post_data.deliveryDate).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }

      post_data.addUser = "admin";
      if (btn === "submit") {
        const verify = [
          "customerId",
          "supplierRouteId",
          "supplierContractId",
          "supplierId",
          "loadingTransportTypeId",
          "mediumTypeId",
          "loadingFactoryName",
          "stationSiteId",
          "deliveryDate",
          "authorizedQuantity",
          "unitName",
          "addUser",
          "jurisdictionId",
          "statusId"
        ];
        let isVerify = true;
        this.print(post_data);
        verify.map(d => {
          if (!post_data[d]) {
            isVerify = false;
          }
        });
        if (post_data.deliveryDate === "Invalid date") {
          this.$message.error("请选择装货委托兑现日期");
          return;
        }
        if (!isVerify) {
          this.$message.error("您有未填写的项目");
          return;
        }
      }
      let pageName = {
        add: "shipmentAdd",
        edit: "shipmentEdit",
        detail: "shipmentDetail"
      };
      this.$http.post(this.urls[this.type][btn], post_data).then(res => {
        if (res.code === 200) {
          this.$message.success(res.message);
          this.$store.commit("removeMenu", pageName[this.type]);
        } else {
          this.$message.error(res.message);
        }
      });
    }
  }
};
</script>
<style lang='scss' >
.shipment-add {
  .at-form {
    padding-left: 15px;
    .el-form-item {
      margin-bottom: 0px;
    }

    .el-form {
      max-width: 72%;
    }
    .el-input-group {
      margin-top: 5px;
    }
    .el-input__inner[type="number"] {
      padding-right: 0px;
    }
  }
  .at-add-table {
    margin-top: 15px;
  }
}
</style>
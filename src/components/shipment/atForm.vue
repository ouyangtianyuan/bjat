<template>
    <div class="at-form">
        <el-form ref="form" :inline="true" :model="atForm" :disabled="disabled">
            <el-form-item
                v-for="(item,index) in config.items"
                :key="index"
                :prop="item.name"
                :status-icon="true"
            >
                <el-tooltip
                    class="item"
                    effect="dark"
                    :content="item.label"
                    placement="right"
                    :open-delay="1500"
                >
                    <el-input
                        v-model="atForm[item.name]"
                        :disabled="item.disabled"
                        v-if="item.type === 'input'"
                        :placeholder="item.label"
                        :prefix-icon="item.prefixIcon"
                    ></el-input>
                    <el-input
                        v-model="atForm[item.name]"
                        v-if="item.type === 'check'"
                        :placeholder="item.label"
                        disabled
                        :prefix-icon="item.prefixIcon"
                    >
                        <div slot="append" v-if="!disabled" @click="item.click">选择</div>
                        <div slot="append" v-if="disabled">选择</div>
                    </el-input>
                    <el-input
                        type="textarea"
                        v-model="atForm[item.name]"
                        :disabled="item.disabled"
                        v-if="item.type === 'textarea'"
                        :placeholder="item.label"
                        :prefix-icon="item.prefixIcon"
                        rows="1"
                    ></el-input>
                    <el-input
                        v-model="atForm[item.name]"
                        :disabled="item.disabled"
                        type="number"
                        v-if="item.type === 'number'"
                        :placeholder="item.label"
                        :min="item.min"
                        :max="item.max"
                        @change="rowsChange"
                    >
                        <el-select
                            slot="append"
                            v-if="item.name ==='authorizedQuantity'"
                            v-model="atForm.unitName"
                            class="unit"
                            @change="unitChange"
                        >
                            <el-option label="箱" value="1"></el-option>
                            <el-option label="吨" value="0"></el-option>
                        </el-select>
                    </el-input>
                    <el-select
                        :placeholder="'选择'+item.label"
                        v-if="item.type === 'select'"
                        :disabled="item.disabled"
                        v-model="atForm[item.name]"
                        filterable
                    >
                        <el-option
                            v-for="option in item.selectItems"
                            :key="option.value"
                            :label="option.label"
                            :value="option.value"
                        ></el-option>
                    </el-select>
                    <el-date-picker
                        v-model="atForm[item.name]"
                        type="date"
                        v-if="item.type === 'date'"
                        :placeholder="'选择'+item.label"
                    ></el-date-picker>
                </el-tooltip>
            </el-form-item>
        </el-form>
        <at-cascade-customer
            :callBack="selectCustomer"
            :show="isCustomerDialogVisitable"
            :closed="hideChooseCustomerDialog"
        ></at-cascade-customer>
        <at-cascade-supplier
            :callBack="selectSupplier"
            :show="isSupplierDialogVisitable"
            :closed="hideChooseSupplierDialog"
        ></at-cascade-supplier>
    </div>
</template>

<script>
import atCascadeCustomer from "@/components/shipment/atCascadeCustomer";
import atCascadeSupplier from "@/components/shipment/atCascadeSupplier";
import { autoGenerate } from "@/tool/index";
export default {
  data() {
    return {
      config: {
        items: [
          {
            label: "订单号",
            type: "input",
            name: "orderNumber",
            disabled: true
          },
          {
            label: "项目类型",
            type: "select",
            selectItems: [
              {
                label: "植物油",
                value: "1"
              },
              {
                label: "基础化工",
                value: "2"
              },
              {
                label: "精细化工",
                value: "3"
              }
            ],
            name: "loadingTransportTypeId",
            disabled: false
          },
          {
            label: "装货委托兑现日期",
            type: "date",
            name: "deliveryDate",
            disabled: false
          },
          {
            label: "客户",
            type: "check",
            name: "customerName",
            disabled: true,
            click: this.showChooseCustomerDialog
          },
          {
            label: "装货工厂",
            type: "input",
            name: "landingPlace",
            disabled: true
          },
          {
            label: "介质",
            type: "input",
            name: "typeName",
            disabled: true
          },
          {
            label: "装货供应商",
            type: "check",
            name: "supplierName",
            disabled: true,
            click: this.showChooseSupplierDialog
          },
          {
            label: "发站",
            type: "input",
            name: "siteName",
            disabled: true
          },
          {
            label: "装货委托数量",
            type: "number",
            name: "authorizedQuantity",
            disabled: false,
            min: 0
          },
          {
            label: "备注",
            type: "textarea",
            name: "remark",
            disabled: false
          }
        ]
      },
      atForm: {
        customerId: "",
        supplierRouteId: "",
        supplierContractId: "",
        supplierId: "",
        loadingTransportTypeId: "",
        mediumTypeId: "",
        loadingFactoryName: "",
        stationSiteId: "",
        deliveryDate: "",
        authorizedQuantity: 1,
        unitName: "1",
        addUser: "",
        jurisdictionId: "",
        statusId: "",
        orderNumber: autoGenerate("orderNumber"),
        routeId: "",
        contractId: "",
        contractNo: "",
        projectType: "",
        jurisdictionId: "",
        statusId: "",
        startPlaceFactoryName: "",
        destinationFactoryName: ""
      },
      //   ordersHead: {
      //     orderNumber: "",
      //     routeId: "",
      //     contractId: "",
      //     contractNo: "",
      //     projectType: "",
      //     jurisdictionId: "",
      //     statusId: "",
      //     startPlaceFactoryName: "",
      //     destinationFactoryName: ""
      //   },
      isCustomerDialogVisitable: false,
      isSupplierDialogVisitable: false
    };
  },
  computed: {
    disabled: function() {
      return this.$parent.isDetail;
    }
  },
  created: function() {},
  components: {
    atCascadeCustomer,
    atCascadeSupplier
  },
  methods: {
    showChooseCustomerDialog: function() {
      this.isCustomerDialogVisitable = true;
    },
    hideChooseCustomerDialog: function() {
      this.isCustomerDialogVisitable = false;
    },
    selectCustomer: function(data) {
      this.atForm = { ...this.atForm, ...data };
    },
    selectSupplier: function(data) {
      data.unitName = data.billingMode + "";
      this.atForm = { ...this.atForm, ...data };
      this.$parent.$refs.atTable.tableRows.unitName = data.billingMode + "";
    },
    showChooseSupplierDialog: function() {
      this.isSupplierDialogVisitable = true;
    },
    hideChooseSupplierDialog: function() {
      this.isSupplierDialogVisitable = false;
    },
    rowsChange: function(e) {
      let tableData = this.$parent.$refs.atTable.tableData;
      let tableRows = this.$parent.$refs.atTable.tableRows;
      if (tableData.length > e) {
        let deleteData = tableData.slice(e);
        this.$parent.$refs.atTable.addDeleteData(deleteData);
        tableData.splice(e, tableData.length - e);
      } else {
        while (e > tableData.length) {
          tableData.push(JSON.parse(JSON.stringify(tableRows)));
        }
      }
    },
    unitChange: function(e) {
      this.$parent.$refs.atTable.tableRows.unitName = e + "";
    }
  },
  mounted: function() {}
};
</script>
<style lang='scss'>
.at-form {
  .el-input-group__append {
    background: #fff;
    color: #333;
  }
  .el-textarea {
    margin: 5px 0;
  }
}

@media (min-width: 1400px) {
  .shipment-add .at-form {
    .el-input {
      width: 320px !important;
    }

    .el-textarea {
      width: 980px;
    }
  }
  .at-image-upload {
    .upload-demo,
    .el-upload-dragger {
      width: 980px;
    }
  }
}

@media (max-width: 1400px) {
  .shipment-add .at-form {
    .el-input {
      width: 240px !important;
    }

    .el-textarea {
      width: 740px;
    }
  }
  .at-image-upload {
    .el-upload-dragger,
    .upload-demo {
      width: 740px;
    }
  }
}

.shipment-add .at-form .unit {
  .el-input {
    width: 100px !important;
  }
}
</style>
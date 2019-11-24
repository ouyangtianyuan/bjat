<template>
    <div class="at-add-table">
        <el-table ref="table" :data="this.tableData" :border="true" :row-class-name="deleteClass">
            <el-table-column type="index" label="序号" :key="-1" width="60px"></el-table-column>
            <el-table-column
                :prop="col.prop"
                :label="col.label"
                v-for="(col,index) in cols"
                :width="col.width"
                :key="index"
                v-if="!col.hide"
            >
                <template slot-scope="scope">
                    <div v-if="!disabled">
                        <el-input v-if="!col.type" v-model="scope.row[col.prop]"></el-input>
                        <el-select
                            v-if="col.prop ==='unitName'"
                            v-model="scope.row.unitName"
                            class="unit"
                        >
                            <el-option label="箱" value="1"></el-option>
                            <el-option label="吨" value="0"></el-option>
                        </el-select>
                    </div>
                    <div v-if="disabled">
                        <span
                            v-if="show(scope.row[col.prop],col.prop)!='待装货'"
                        >{{show(scope.row[col.prop],col.prop)}}</span>
                        <el-button
                            v-if="show(scope.row[col.prop],col.prop)==='待装货'"
                            @click="shipment(scope)"
                            type="text"
                            size="small"
                        >{{show(scope.row[col.prop],col.prop)}}</el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150px" v-if="!disabled">
                <div slot-scope="scope" class="rightButtonBox">
                    <el-upload :action="imageUrl" :on-success="success" :show-file-list="false">
                        <el-button type="text" size="small">上传</el-button>
                    </el-upload>
                    <el-button @click="handleClick(scope)" type="text" size="small">查看</el-button>
                    <!-- <el-button @click="deleteRow(scope)" type="text" size="small">删除</el-button> -->
                </div>
            </el-table-column>
        </el-table>
        <at-cascade-driver
            :callBack="selectCustomer"
            :show="isCustomerDialogVisitable"
            :closed="hideChooseCustomerDialog"
        ></at-cascade-driver>
    </div>
</template>

<script>
import atCascadeDriver from "@/components/shipment/atCascadeDriver";
import { imageUrl } from "@/tool/index.js";
export default {
  data() {
    return {
      cols: [
        {
          label: "装货委托子订单号",
          prop: "loadingOrderLineNo",
          hide: this.$parent.type === "add"
        },
        { label: "委托数量", prop: "orderQuantity", width: "100px" },
        { label: "单位", prop: "unitName", width: "100px", type: "select" },
        {
          label: "箱号",
          prop: "containerNo"
        },
        { label: "备注", prop: "remark" },
        {
          label: "状态",
          prop: "statusName",
          hide: this.$parent.type != "selectDetail"
        }
      ],
      tableRows: {
        transportTypeId: "",
        orderLineNO: "",
        orderQuantity: "1",
        unitName: "1",
        containerNo: "",
        remark: "",
        isDelete: 0
      },
      tableData: [
        {
          transportTypeId: "",
          orderLineNO: "",
          orderQuantity: "1",
          unitName: "1",
          containerNo: "",
          remark: "",
          isDelete: 0
        }
      ],
      deleteData: [],
      imageUrl,
      isCustomerDialogVisitable: false
    };
  },
  components: { atCascadeDriver },
  computed: {
    disabled: function() {
      return this.$parent.isDetail;
    }
  },
  mounted: function() {},
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
    handleClick: function(e) {
      console.log(e);
    },
    deleteRow: function(e) {
      //   this.tableData[e.$index].isDelete = 1;
      //   this.$set(this.tableData, e.$index, this.tableData[e.$index]);
    },
    deleteClass: function(e) {
      //   if (e.row.isDelete) {
      //     return "is-delete";
      //   }
      return "";
    },
    show: function(d, i) {
      if (i === "unitName") {
        return ["吨", "箱"][d];
      } else {
        return d;
      }
    },
    addDeleteData: function(data) {
      data.filter(d => {
        return d.oId;
      });
      let arr = [];
      data.map(d => {
        d.isDelete = 1;
        arr.push(d);
      });
      this.deleteData = [...this.deleteData, ...arr];
    },
    success: function(response, file, fileList) {
      const { code, data, message } = response;
      console.log(response, file, fileList);
      if (code === 200) {
        this.$message.success("上传成功");
      } else {
        this.$message.error(message);
      }
    },
    shipment: function(data) {
      //   console.log(data);
      this.showChooseCustomerDialog();
      console.log(this.isCustomerDialogVisitable);
    }
  }
};
</script>
<style lang='scss'>
.at-add-table {
  i {
    display: none;
  }
  margin: 15px;
  .cell {
    text-align: center;
    padding: 0 !important;
    .el-input__inner {
      border: none;
      text-align: center;
      background-color: transparent;
      padding-right: 15px;
    }
    .el-button {
      padding: 7px 0px;
    }
    .rightButtonBox {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      button {
        padding: 0 5px;
      }
    }
  }
  .is-delete {
    background: red;
  }
}
@media (min-width: 1400px) {
  .at-add-table .el-table {
    width: 980px;
  }
}

@media (max-width: 1400px) {
  .at-add-table .el-table {
    width: 740px;
  }
}
</style>
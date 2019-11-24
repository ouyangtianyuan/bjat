<template>
    <div class="my-table" @keyup.enter="onSubmit">
        <div class="tableSearch" :class="stretchFlag?'active':''" v-if="searchBar">
            <div class="form-btn">
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="17">
                        <el-form ref="form" :model="formData" label-width="80px">
                            <div class="col-item">
                                <el-row :gutter="20">
                                    <el-col :xs="24" :sm="16" :md="18">
                                        <el-row :gutter="10">
                                            <el-col
                                                :xs="12"
                                                :sm="8"
                                                v-for="(item,index) in searchBar.input"
                                                :key="'a'+index"
                                            >
                                                <el-tooltip
                                                    class="item"
                                                    effect="dark"
                                                    :content="item.placeholder"
                                                    placement="top"
                                                    :open-delay="1000"
                                                >
                                                    <el-input
                                                        v-model="formData[item.param]"
                                                        :placeholder="item.placeholder"
                                                    ></el-input>
                                                </el-tooltip>
                                            </el-col>
                                            <el-col
                                                :xs="12"
                                                :sm="8"
                                                v-for="(item,index) in searchBar.select"
                                                :key="'d'+index"
                                            >
                                                <el-tooltip
                                                    class="item"
                                                    effect="dark"
                                                    :content="item.placeholder"
                                                    placement="top"
                                                    :open-delay="1000"
                                                >
                                                    <el-select
                                                        v-model="formData[item.param]"
                                                        :placeholder="item.placeholder"
                                                        filterable
                                                    >
                                                        <el-option
                                                            v-for="(i,n) in item.data"
                                                            :key="'e'+n"
                                                            :label="i.label"
                                                            :value="i.value"
                                                        ></el-option>
                                                    </el-select>
                                                </el-tooltip>
                                            </el-col>
                                            <el-col
                                                :xs="12"
                                                :sm="8"
                                                v-for="(item,index) in searchBar.datePicker"
                                                :key="'b'+index"
                                            >
                                                <el-tooltip
                                                    class="item"
                                                    effect="dark"
                                                    :content="item.placeholder"
                                                    placement="top"
                                                    :open-delay="1000"
                                                >
                                                    <el-date-picker
                                                        v-model="formData[item.param]"
                                                        value-format="yyyy-MM-dd"
                                                        :placeholder="item.placeholder"
                                                    ></el-date-picker>
                                                </el-tooltip>
                                            </el-col>
                                            <el-col
                                                :xs="12"
                                                :sm="8"
                                                v-for="(item,index) in searchBar.datePickerRange"
                                                :key="'c'+index"
                                            >
                                                <el-tooltip
                                                    class="item"
                                                    effect="dark"
                                                    :content="item.sPlaceholder"
                                                    placement="top"
                                                    :open-delay="1000"
                                                >
                                                    <el-date-picker
                                                        v-model="formData[item.param]"
                                                        value-format="yyyy-MM-dd"
                                                        type="daterange"
                                                        range-separator="至"
                                                        start-placeholder="开始时间"
                                                        end-placeholder="结束时间"
                                                    ></el-date-picker>
                                                </el-tooltip>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                    <el-col :xs="24" :sm="8" :md="6">
                                        <el-button type="primary" @click="onSubmit">查询</el-button>
                                        <el-button @click="resetForm">重置</el-button>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-form>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="7">
                        <div class="btn-item">
                            <span v-for="(item,index) in btnBar" :key="index">
                                <el-button
                                    class="btn"
                                    type="primary"
                                    v-if="showBtn[item.event]"
                                    @click="handleBtn(item.event,selectData)"
                                >
                                    <i :class="item.icon"></i>
                                    {{item.label}}
                                </el-button>
                            </span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="stretch-btn" :class="stretchFlag?'active':''" @click="stretch">
                <i class="el-icon-arrow-up"></i>
            </div>
        </div>
        <div class="table">
            <el-table
                :data="data"
                :height="index?countHeight:height"
                v-loading="loading"
                element-loading-text="拼命加载中"
                :lazy="children.lazy"
                :row-key="children.rowKey"
                border=""
                :load="load"
                style="width: 100%"
                :row-class-name="rowClassName"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                :row-style="rowStyle"
                @row-dblclick="dblclick"
                @selection-change="handleSelect"
                @row-click="rowClick"
                :default-sort="{prop: 'id', order: 'descending'}"
            >
                <el-table-column
                    v-if="selection"
                    :type="selection?'selection':''"
                    width="55"
                    align="center"
                ></el-table-column>
                <el-table-column
                    v-if="type"
                    align="center"
                    label="序号"
                    :type="type?'index':''"
                    width="50"
                ></el-table-column>
                <el-table-column
                    align="center"
                    v-for="(item,index) in datas.cols"
                    :key="index"
                    :fixed="item.fixed"
                    :label="item.label"
                    :min-width="item.width||'100px'"
                    :sortable="item.sort"
                    :formatter="item.formatter || defaultFormatter"
                >
                    <template slot-scope="scope">
                        <span
                            class="temp"
                            :class="item.template?'active':''"
                            @click="cellClick(item.param,scope.row)"
                        >{{ item.formatter ? item.formatter(scope.row[item.param]):defaultFormatter(scope.row[item.param]) }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="datas.operate"
                    :fixed="datas.operate.fixed"
                    :label="datas.operate.label||'操作'"
                    align="center"
                    :width="datas.operate.width || 80"
                >
                    <template slot-scope="scope">
                        <el-button
                            v-for="(item,index) in datas.operate.btn"
                            :key="index"
                            @click.stop="operateClick(item.event,scope.row)"
                            :type="item.type"
                            size="mini"
                        >{{item.label}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="limits"
                :page-size="limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["tableData"],
  data() {
    return {
      data: [], //表格数据
      btnBar: [
        {
          label: "新增",
          type: "primary",
          event: "add",
          icon: "el-icon-plus"
        },
        { label: "编辑", type: "success", event: "edit", icon: "el-icon-edit" },
        {
          label: "删除",
          type: "danger",
          event: "del",
          icon: "el-icon-delete"
        }
      ], //按钮栏
      type: this.tableData.type,
      loading: false, //是否显示loading
      searchBar: this.tableData.searchBar, //搜索栏
      index: this.tableData.index,
      formData: {},
      height: this.tableData.height,
      children: this.tableData.children || {},
      showBtn: {
        add: true,
        edit: true,
        del: true
      }, //默认显示新增，编辑，删除按钮
      selectData: [], //选中时数据
      selection: this.tableData.selection, //是否显示复选框
      sendData: {},
      limits: this.tableData.limits || [10, 20, 50, 100], //表格条数/页数组
      limit: this.tableData.limit || 10, //默认显示10条数据每页
      currentPage: 1, //默认第一页
      total: 0, //表格总条数
      stretchFlag: false,
      getIndex: 0,
      className: "",
      initH: 500,
      lastTime: 0,
      classNameFlag: false
    };
  },

  components: {},

  computed: {
    countHeight() {
      return this.tableData.height;
    },
    datas() {
      return this.tableData;
    }
  },
  created() {
    var showBtn = this.showBtn,
      searchBar = this.searchBar,
      formData = {};
    if (!this.tableData.formData) {
      for (var key in searchBar) {
        var list = searchBar[key];
        list.forEach(ele => {
          formData[ele.param] = "";
        });
      }
      this.formData = formData;
    } else {
      this.formData = this.tableData.formData;
    }
    this.sendData = this.formData;
    Object.assign(showBtn, this.tableData.showBtn || {});
    this.showBtn = showBtn;
    this.reload();
    if (!this.height) {
      this.height = this.initH;
    }
  },
  mounted: function() {},
  methods: {
    handleSizeChange(val) {
      this.limit = val;
      this.reload();
    }, //条数/页改变时
    handleCurrentChange(val) {
      this.currentPage = val;
      this.reload();
    }, //页码改变时
    handleBtn(event, row) {
      var firstTime = new Date().getTime(),
        lastTime = this.lastTime;
      if (firstTime - lastTime < 1000) {
        return false;
      }
      lastTime = firstTime;
      this.lastTime = lastTime;
      switch (event) {
        case "add":
          this.add();
          break;
        case "edit":
          this.edit(row);
          break;
        case "del":
          this.del(row);
      }
    }, //新增，编辑删除表格
    add() {
      this.$emit("add");
    }, //新增
    edit(row) {
      if (row.length == 0) {
        this.$message({
          message: "请选择一条数据",
          type: "warning"
        });
        return false;
      }
      if (row && row.length > 1) {
        this.$message({
          message: "只能选择一条数据",
          type: "warning"
        });
        return false;
      }
      this.$emit("edit", row[0]);
    }, //编辑
    del(row) {
      if (row.length == 0) {
        this.$message({
          message: "请选择一条数据",
          type: "warning"
        });
        return false;
      }
      if (row.length == 1 && !this.selection) {
        row = row[0];
      }
      this.$confirm("确认删除该条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$emit("del", row);
        })
        .catch(() => {});
    }, //删除
    stretch() {
      this.stretchFlag = !this.stretchFlag;
      if (this.stretchFlag) {
        if (this.tableData.height) {
          this.height = this.tableData.height + 60;
        } else {
          this.height = this.initH + 60;
        }
      } else {
        if (this.tableData.height) {
          this.height = this.tableData.height;
        } else {
          this.height = this.initH;
        }
      }
    }, //搜索栏伸缩
    dblclick(row, column, event) {
      this.$emit("dblclick", row);
    }, //双击表格
    handleSelect(data) {
      this.selectData = data;
    }, //复选框选择表格
    rowClick(row, column, event) {
      if (!this.selection) {
        if (this.getIndex == row.index) {
          this.classNameFlag = !this.classNameFlag;
        } else {
          this.classNameFlag = true;
        }
        if (this.classNameFlag) {
          this.className = "active";
          this.selectData = [row];
        } else {
          this.className = "";
          this.selectData = [];
        }
        this.getIndex = row.index;
      }
    }, //单击选择表格
    cellClick(row, event) {
      this.$emit("cellClick", event, row);
    }, //单击表格单元格
    rowClassName({ row, rowIndex }) {
      if (!this.selection) {
        if (this.getIndex == rowIndex) {
          return this.className;
        }
      }
    }, //单击表格时的类名设置
    rowStyle({ row, rowIndex }) {
      row.index = rowIndex;
    }, //设置表格的index值
    reload() {
      this.loading = true;
      var data = { pageIndex: this.currentPage, pageSize: this.limit };
      var sendData = this.sendData;
      data = Object.assign(sendData, data);
      for (var key in data) {
        if (Array.isArray(data[key])) {
          if (data[key].length) {
            data[key] = data[key].join(" ");
          } else {
            delete data[key];
          }
        }
        if (data[key] === "") {
          delete data[key];
        }
      }
      this.sendData = data;
      var url = this.tableData.url;
      this.$http
        .post(url, data)
        .then(res => {
          this.loading = false;
          var parseData = this.parseData(res);
          var data = parseData.data;
          if (data && data.length) {
            data.forEach(ele => {
              if (this.children.lazy) {
                ele.hasChildren = true;
              }
            });
          }
          this.data = data;
          this.total = parseData.count || 0;
          this.tableData.done(data);
        })
        .catch(err => {
          this.loading = false;
        });
    }, //获取数据加载表格
    onSubmit() {
      this.sendData = this.formData;
      this.reload();
    }, //搜索提交
    resetForm() {
      var data = this.formData;
      for (var key in data) {
        data[key] = "";
      }
      this.formData = data;
    }, //重置
    parseData(res) {
      if (this.tableData.parseData) {
        return this.tableData.parseData(res);
      }
      return {
        code: res.code, //解析接口状态
        msg: res.message, //解析提示文本
        count: res.count, //解析数据长度
        data: res.data //解析数据列表
      };
    },
    load(tree, treeNode, resolve) {
      var children = this.children,
        url = children.url,
        data = {};
      data[children.param] = tree[children.valueParam];
      this.$http
        .post(url, data)
        .then(res => {
          var parseData = this.parseData(res);
          var data = parseData.data;
          if (data.length) {
            resolve(data);
          } else {
            this.$message({
              message: children.message,
              type: "warning"
            });
          }
        })
        .catch(err => {});
    }, //懒加载子节点
    operateClick(event, row) {
      this.$emit("operateClick", event, row);
    }, //操作按钮点击
    defaultFormatter(cellValue) {
      return cellValue || "--";
    }
  }
};
</script>
<style lang='scss' scoped>
@import "@/assets/css/computed.scss";
.my-table {
  width: 100%;
  height: 100%;
  position: relative;
  .table {
    overflow: auto;
    .temp.active {
      color: #3039b4;
      text-decoration: underline;
      cursor: pointer;
    }
    .cell .el-button {
      height: 20px;
      line-height: 20px;
      padding: 0 8px;
      display: inline-block;
    }
  }
  .pagination {
    position: fixed;
    width: calc(100% - #{$leftNavW});
    bottom: 0;
    margin-left: -15px;
    background: #fff;
    z-index: 100;
    box-sizing: border-box;
    padding: 4px 8px;
    border-top: 1px solid #e4e7ed;
  }
  .tableSearch.active {
    .form-btn {
      transform: rotateX(90deg);
      height: 20px;
    }
  }
  .tableSearch {
    margin-bottom: 10px;
    position: relative;
    transition: ease all 0.3s;
    .form-btn {
      transform: rotateX(0deg);
      position: relative;
      overflow: hidden;
      transition: ease all 0.3s;
      .el-button {
        margin: 0;
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
    .stretch-btn {
      position: absolute;
      right: 0;
      top: 0;
      height: 30px;
      line-height: 30px;
      text-align: center;
      width: 30px;
      font-size: 14px;
      cursor: pointer;
      transition: all ease 0.3s;
    }
    .stretch-btn:hover {
      color: #409eff;
    }
    .stretch-btn.active {
      transform: rotate(180deg);
    }
  }
  .col-item {
    display: inline-block;
  }
  .btn-item {
    text-align: right;
    padding-right: 30px;
    span {
      display: inline-block;
      button {
        margin-right: 5px;
        margin-bottom: 10px;
        transition: all ease 0.2s;
      }
    }
  }
  .el-input,
  .el-select {
    width: 100%;
  }
  .el-range-editor.el-input__inner {
    width: 100%;
  }
  .item {
    margin-bottom: 10px;
  }
}
</style>
<style lang='scss'>
.el-table__body tr.active:hover > td,
.el-table__body tr.active {
  background: #dbe2f7 !important;
}
.el-range-editor.el-input__inner,
.el-input__inner,
.el-table .cell {
  font-size: 13px !important;
}
</style>
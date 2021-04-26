<template>
  <div class="dataplatform-container">
    <Header></Header>
    <div class="dataplatform-container">
      <div
        :class="['dataplatform-box', toolShow ? '' : 'dataplatform-box-large']"
      >
        <!-- 表格容器 -->
        <div class="dataplatform-table-box">
          <!-- 表格 -->
          <el-table
            :data="searchResArray"
            class="dataplatform-table"
            height="calc(100vh - 150px)"
            stripe
            border
          >
            <el-table-column
              v-for="(item, i) in tableCurrentColumns.length > 0
                ? tableCurrentColumns
                : tableColumns"
              :key="i"
              :prop="item.prop"
              :label="item.label"
              :fixed="item.fixed || false"
              :width="item.width || 120"
              :sortable="item.isSort"
              :align="item.align || 'center'"
              v-show="item.isShow"
            >
              <template slot="header">
                <div v-if="item.isTools">
                  {{ item.label }}
                  <el-button
                    type="text"
                    class="el-icon-refresh"
                    @click="resetTable"
                  ></el-button>
                </div>
              </template>
              <template slot-scope="scope">
                <div v-if="item.isTools">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                  >
                    编辑
                  </el-button>
                  <el-popconfirm
                    style="margin-left: 10px"
                    confirm-button-text="确认"
                    @confirm="handleDelete(scope.$index, scope.row)"
                    cancel-button-text="取消"
                    icon="el-icon-warning"
                    icon-color="red"
                    title="确定删除这一条数据？"
                  >
                    <el-button size="mini" type="danger" slot="reference">
                      删除
                    </el-button>
                  </el-popconfirm>
                </div>
                <div v-else>{{ scope.row[item.prop] }}</div>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="10"
            background
          ></el-pagination>
        </div>
      </div>
      <div :class="['tools-box', toolShow ? '' : 'toolHide']">
        <div class="toggle-btn" @click="toolShow = !toolShow">
          <i
            :class="[toolShow ? 'el-icon-arrow-right' : 'el-icon-arrow-left']"
          ></i>
        </div>
        <div class="tools-content">
          <div class="search-box">
            <el-input
              size="small"
              v-model="dataSearch"
              prefix-icon="el-icon-search"
              placeholder="请输入关键词搜索"
            ></el-input>
            <el-button type="primary" size="small" @click="searchTable">
              搜索
            </el-button>
          </div>
          <div class="screen-box">
            <div class="top-label">
              <p>
                筛选
                <i class="el-icon-caret-bottom"></i>
              </p>
              <el-button type="primary" size="mini" @click="confirmScreen">
                确认
              </el-button>
              <el-button type="success" size="mini" @click="resetScreen">
                重置
              </el-button>
            </div>
            <div class="screen-content">
              <el-checkbox
                class="checkAll"
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="checkAllChange"
              >
                全选
              </el-checkbox>
              <el-checkbox-group
                class="checkbox-list"
                v-model="isCheckedofLabelList"
                @change="checkedBoxChange"
              >
                <el-checkbox
                  class="checkbox"
                  v-for="item in checkOption"
                  :key="item.label"
                  :label="item.label"
                ></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="link-box"></div>
        </div>
      </div>
    </div>
    <!-- dialog -->
    <el-dialog title="编辑" :visible.sync="editDialogShow" width="45%">
      <el-form
        class="edit-form"
        ref="editRef"
        :model="editForm"
        label-width="100px"
        :rules="editRules"
      >
        <el-form-item
          class="edit-form-item"
          v-for="(item, key) in editCurrentObj"
          :key="key"
          :prop="item.prop"
        >
          <span slot="label">{{ editFormLabel(item.prop) }}</span>
          <el-input
            class="edit-input"
            size="small"
            type="text"
            v-model="editForm[item.prop]"
            :inline-message="true"
            :status-icon="true"
            :hide-required-asterisk="true"
            :disabled="getIsDisabled(item.prop)"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEditDialog">取 消</el-button>
        <el-button type="primary" @click="submitEdit">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Header from '@/components/header';
import { tableColumns } from './table';
import { queryWaterMeterCopyRecords } from '@/api/dataplatform';
export default {
  components: {
    Header,
  },
  data() {
    return {
      /* 状态 */
      // 右侧工具栏显示与隐藏
      toolShow: true,
      // 筛选全选
      checkAll: true,
      // 全选按钮是否半选
      isIndeterminate: false,
      // 编辑Dialog显示
      editDialogShow: false,
      /* 数据对象 */
      // 表格UI渲染对象
      tableColumns: [],
      // 表格当前渲染数组
      tableCurrentColumns: [],
      // 表格数据
      data: [],
      // 搜索后的数组
      searchResArray: [],
      // 搜索内容
      dataSearch: '',
      // 筛选复选框中文显示数组
      isCheckedofLabelList: [],
      // 筛选结果(用于接口)
      isCheckedofPropList: [],
      // 筛选复选框所有选项
      checkOption: [],
      // 编辑的当前数据对象
      editCurrentObj: {},
      // 编辑的表单对象
      editForm: {},
      // 编辑的表单校验对象
      editRules: {},
      /* 分页 */
      // 当前页码数
      currentPage: 1,
      /* 配置 */
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    };
  },
  computed: {},
  created() {
    // 表格数据预处理
    this.tableColumns = tableColumns; // 表格渲染对象
    this.tableCurrentColumns = this._.cloneDeep(tableColumns);
    // 复选框选项预处理
    // 将表格渲染对象中的prop和label传给一个对象
    this.tableColumns.forEach((item) => {
      if (item.label != '序号' && item.label != '操作') {
        this.checkOption.push({
          prop: item.prop,
          label: item.label,
        });
      }
    });
    this.checkOption.forEach((item) => {
      this.isCheckedofLabelList.push(item.label);
      this.isCheckedofPropList.push(item.prop);
    });
    this.queryWaterMeterCopyRecords();
  },
  methods: {
    // 获取编辑表单的label
    editFormLabel(key) {
      const cur = this.tableColumns.filter((item) => item.prop == key);
      return cur[0].label;
    },
    // 修改表格渲染对象实现某列隐藏
    tableColumnsHide() {
      if (this.isCheckedofPropList.length === 0) {
        this.$message.warning('请至少选择一项数据！');
        return;
      }
      this.tableCurrentColumns = [];
      this.tableColumns.forEach((item) => {
        if (item.label === '操作' || item.label === '序号') {
          this.tableCurrentColumns.push(item);
        } else {
          this.isCheckedofPropList.filter((ele) => {
            if (ele == item.prop) {
              this.tableCurrentColumns.push(item);
            }
          });
        }
      });
    },
    // 根据条件查询水表抄收数据
    async queryWaterMeterCopyRecords() {
      let loading = this.$loading({
        lock: true,
        text: '查询中...'
      });
      let fields = [];
      this.checkOption.forEach((item) => {
        fields.push(item.prop);
      });
      const params = {
        condition: this.dataSearch,
        fields: fields,
      };
      const { data, code, msg } = await queryWaterMeterCopyRecords(params);
      // let loading = this.$loading({
      //   locak: true,
      // })
      if (code == 1) {
        this.data = data;
        // console.log(data);
        this.searchResArray = this._.cloneDeep(this.data);
        loading.close();
      } else if (code == -1) {
        console.error(msg);
        loading.close();
      }
    },
    // 全选按钮change事件
    checkAllChange(val) {
      if (val) {
        this.checkOption.forEach((item) => {
          this.isCheckedofLabelList.push(item.label);
          this.isCheckedofPropList.push(item.prop);
        });
      } else {
        this.isCheckedofLabelList = [];
        this.isCheckedofPropList = [];
      }
      this.isIndeterminate = false;
      // this.columnsShow(this.screenCheckedList);
    },
    // 复选框change事件
    checkedBoxChange(isCheckedList) {
      this.isCheckedofPropList = [];
      isCheckedList.forEach((item) => {
        this.checkOption.forEach((ele) => {
          if (ele.label === item) {
            this.isCheckedofPropList.push(ele.prop);
          }
        });
      });
      let checkedCount = isCheckedList.length;
      this.checkAll = checkedCount === this.checkOption.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.checkOption.length;
    },
    // 筛选区域
    // 筛选 确认按钮 事件
    confirmScreen() {
      this.tableColumnsHide();
    },
    resetScreen() {
      this.checkOption.forEach((item) => {
        this.isCheckedofLabelList.push(item.label);
        this.isCheckedofPropList.push(item.prop);
      });
      this.checkAll = true;
      this.isIndeterminate = false;
      this.tableColumnsHide();
    },
    columnsShow() {},
    // 表格搜索
    searchTable() {
      this.queryWaterMeterCopyRecords();
    },
    // 重置表格数据为初始无条件状态
    resetTable() {
      this.dataSearch = '';
      this.queryWaterMeterCopyRecords();
    },
    // 表格行工具栏
    // 编辑
    handleEdit(index, row) {
      this.setRules();
      this.editCurrentObj = this.tableColumns.filter(
        (item) => item.label !== '操作'
      );
      this.editForm = this._.cloneDeep(row);
      this.editDialogShow = true;
    },
    // 删除
    handleDelete() {},
    // 分页事件方法
    // 每页条数变化事件
    handleSizeChange() {},
    // 当前页码变化事件
    handleCurrentChange() {},
    // 编辑Dialog相关事件方法
    closeEditDialog() {
      // 关闭弹窗
      this.editDialogShow = false;
      // 清空编辑表单的校验对象
      this.$refs.editRef.clearValidate();
      // 清空dialog中的当前编辑对象
      this.editCurrentObj = {};
    },
    // 提交编辑
    submitEdit() {
      this.$refs.editRef.validate((val) => {
        if (!val) {
          return;
        }
        // 调取接口
      });
      // console.log(this.editForm, 'editForm');
      this.editDialogShow = false;
    },
    // 设置编辑表单的校验规则
    setRules() {
      this.tableColumns.forEach((item) => {
        if (!item.disabled && item.label !== '操作') {
          const { label, prop } = item;
          this.editRules[prop] = [
            {
              required: true,
              message: `${label}不能为空`,
              trigger: 'blur',
            },
          ];
        }
      });
    },
    // 设置编辑Dialog中的表单的某些字段输入是禁止输入的
    getIsDisabled(key) {
      const columns = this.tableColumns;
      for (const i in columns) {
        if (key === columns[i].prop) {
          return columns[i].disabled || false;
        }
      }
    },
  },
};
</script>

<style lang="less">
.dataplatform-container {
  height: 100%;
  width: 100%;
  background-color: #f9f9f9;
  .dataplatform-container {
    width: 100%;
    height: calc(100% - 55px);
    .dataplatform-box {
      z-index: 1;
      width: calc(100% - 300px);
      height: 100%;
      float: left;
      box-sizing: border-box;
      padding: 10px 5px;
      .dataplatform-table-box {
        margin: 10px;
        height: 100%;
        overflow: auto;
        transition: box-shadow 0.2s;
        .pagination {
          height: 35px;
          padding-left: 30px;
          background-color: #fff;
        }
      }
    }
    .toolHide {
      width: 20px !important;
      position: relative;
      left: 20px;
    }
    .dataplatform-box-large {
      width: calc(100% - 20px) !important;
    }
    .tools-box {
      width: 300px;
      height: 100%;
      float: left;
      background-color: #fff;
      box-shadow: -2px 1px 2px rgba(0, 0, 0, 0.2);
      .toggle-btn {
        width: 20px;
        height: 100px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        position: relative;
        left: -20px;
        top: 50%;
        transform: translate(0, -50%);
        z-index: 10;
        box-shadow: -2px 1px 2px rgba(0, 0, 0, 0.5);
        text-align: center;
        float: left;
        background-color: #fff;
        cursor: pointer;
        i {
          margin-top: 50px;
          transform: translate(0, -50%);
          font-weight: 700;
        }
      }
      .tools-content {
        width: calc(100% - 20px);
        height: 100%;
        z-index: 1;
        position: relative;
        float: left;
        .search-box {
          width: 100%;
          height: 50px;
          box-sizing: border-box;
          padding-top: 15px;
          .el-input {
            width: 75%;
            float: left;
          }
          .el-button {
            float: left;
            margin-left: 5px;
          }
        }
        .screen-box {
          width: 100%;
          height: calc(100% - 50px);
          padding: 20px 0;
          box-sizing: border-box;
          .top-label {
            height: 40px;
            padding-left: 10px;
            p {
              font-size: 18px;
              height: 100%;
              float: left;
              width: 70px;
              margin-right: 15px;
            }
            .el-button {
              width: 80px;
              float: left;
              margin-left: 5px;
              margin-top: 16px;
            }
            .el-button::before {
              font-size: 16px;
            }
          }
          .screen-content {
            clear: both;
            height: 90%;
            .checkAll {
              width: 30%;
              padding-left: 15px;
              box-sizing: border-box;
            }
            .checkbox-list {
              width: 100%;
              .checkbox {
                width: 80px;
                margin: 5px 5px 0 15px;
              }
            }
          }
        }
      }
    }
  }
}
.edit-form {
  width: 100%;
  height: 300px;
  overflow: auto;
  .edit-form-item {
    margin: 7px 0;
    padding: 0 20px 0 0;
  }
}
.el-table__fixed-right {
  right: 0 !important;
}
</style>

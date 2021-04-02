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
              <span class="title">筛选</span>
              <el-button type="success" size="mini">确定</el-button>
            </div>
            <div class="screen-content">
              <el-checkbox
                class="checkAll"
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
              >
                全选
              </el-checkbox>
              <el-checkbox-group
                class="checkbox-list"
                v-model="screenCheckedList"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox
                  class="checkbox"
                  v-for="item in checkOption"
                  :key="item"
                  :label="item"
                ></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="link-box"></div>
        </div>
      </div>
    </div>
    <!-- dialog -->
    <el-dialog title="提示" :visible.sync="editDialogShow" width="45%">
      <el-form
        class="edit-form"
        ref="editRef"
        :model="editForm"
        label-width="80px"
        :rules="editRules"
      >
        <el-form-item
          class="edit-form-item"
          v-for="(value, key, i) in editCurrentObj"
          :key="key"
          :prop="key"
        >
          <template slot="label">{{ screenCheckedList[i] }}</template>
          <el-input
            class="edit-input"
            size="small"
            v-model="editForm[key]"
            :disabled="getIsDisabled(key)"
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
import { data1 } from './data';
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
      // 筛选复选框
      screenCheckedList: [],
      // 筛选结果
      screenResult: '',
      // 筛选复选框选项
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
  created() {
    // 表格数据预处理
    this.tableColumns = tableColumns; // 表格渲染对象
    this.tableCurrentColumns = this._.cloneDeep(tableColumns);
    this.data = data1;
    this.searchResArray = this._.cloneDeep(this.data);
    // 复选框选项预处理
    const checkItems = tableColumns.filter((item) => {
      return item.label != '序号' && item.label != '操作';
    });
    checkItems.forEach((item) => {
      this.checkOption.push(item.label);
    });
    this.screenCheckedList = this.checkOption;
  },
  methods: {
    handleCheckAllChange(val) {
      // 全选按钮change事件
      this.screenCheckedList = val ? this.checkOption : [];
      this.isIndeterminate = false;
      this.columnsShow(this.screenCheckedList);
    },
    handleCheckedCitiesChange(value) {
      // 复选框change事件
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checkOption.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.checkOption.length;
      this.columnsShow(this.screenCheckedList);
    },
    columnsShow(curChekedList) {
      // 复选框控制表格显示
      for (const i in curChekedList) {
        for (const j in this.tableColumns) {
          if (curChekedList[i] == this.tableColumns[j].label) {
            this.tableCurrentColumns.isShow = true;
          }
        }
      }
    },
    searchTable() {
      // 表格搜索
      const searchResArray = this.data.filter((item) => {
        for (const i in item) {
          const sub = item[i];
          if (
            sub
              .toString()
              .toLowerCase()
              .includes(this.dataSearch.toLowerCase())
          ) {
            return item;
          }
        }
      });
      if (searchResArray.length && searchResArray.length != 0) {
        this.searchResArray = searchResArray;
      } else {
        //
        this.$message({
          message: '未检索到该条件的数据！',
          type: 'error',
        });
      }
    },
    resetTable() {
      // 重置表格数据为初始无条件状态
      this.dataSearch = '';
      this.searchResArray = this._.cloneDeep(this.data);
      this.screenCheckedList = this._.cloneDeep(this.checkOption);
    },
    // 表格行工具栏
    handleEdit(index, row) {
      // 编辑
      this.editDialogShow = true;
      this.editCurrentObj = this._.cloneDeep(row);
      delete this.editCurrentObj.serials;
      this.editForm = this._.cloneDeep(this.editCurrentObj);
      this.setRules();
      console.log(this.editRules, 'editRules');
      console.log(this.editForm, 'this.editForm');
    },
    handleDelete() {
      // 删除
    },
    // 分页事件方法
    handleSizeChange() {
      // 每页条数变化事件
    },
    handleCurrentChange() {
      // 当前页码变化事件
    },
    // 编辑Dialog相关事件方法
    closeEditDialog() {
      // 关闭弹窗
      this.editDialogShow = false;
      // 清空编辑表单的校验对象
      this.$refs.editRef.clearValidate();
      // 清空dialog中的当前编辑对象
      this.editCurrentObj = {};
    },
    submitEdit() {
      // 提交编辑
      this.$refs.editRef.validate((val) => {
        if (!val) {
          return;
        }
        // 调取接口
        
      });
      console.log(this.editForm, 'editForm');
      this.editDialogShow = false;
    },
    setRules() {
      // 设置编辑表单的校验规则
      // const requiredTrueList = ['task_code', 'user_code', 'equipment_code'];
      this.screenCheckedList.forEach((item) => {
        const columns = this.tableColumns;
        for (const i in columns) {
          //
          if (item === columns[i].label) {
            const { label, prop } = columns[i];
            this.editRules[prop] = [
              {
                required: true,
                message: `${label}不能为空！`,
                trigger: 'blur',
              },
            ];
          }
        }
      });
    },
    getIsDisabled (key) {
      const columns = this.tableColumns;
      for (const i in columns) {
        if (key === columns[i].prop) {
          return columns[i].disabled || false;
        }
      }
    }
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
            .title {
              width: 50px;
              padding-left: 15px;
              font-size: 20px;
              float: left;
            }
            .el-button {
              margin-left: 120px;
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

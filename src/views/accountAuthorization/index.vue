<template>
  <div class="accountAuthorization-container">
    <Header></Header>
    <div class="accountAuthorization-box">
      <div class="accountAuthorization-table-header"></div>
      <div class="accountAuthorization-table-box">
        <el-table
          ref="tableRef"
          class="accountAuthorization-table"
          :data="tableData"
          height="88%"
          :row-key="getRowKey"
          :expand-row-keys="expands"
          @row-click="clickRow"
          @expand-change="expandChange"
        >
          <el-table-column
            align="center"
            v-for="(item, key) in tableColumns.filter((item) => !item.isExpand)"
            :key="key"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
          >
            <template slot-scope="scope">
              <span v-if="item.prop == 'auth'">
                <span v-if="scope.row[item.prop] == '1'">
                  <el-tag type="primary" effect="dark">普通账户</el-tag>
                </span>
                <span v-else-if="scope.row[item.prop] == '0'">
                  <el-tag type="success" effect="dark">管理员账户</el-tag>
                </span>
              </span>
              <span v-else-if="item.prop == 'enabled'">
                <b v-if="scope.row[item.prop] == '0'" style="color:#67C23A">
                  启用
                </b>
                <b
                  v-else-if="scope.row[item.prop] == '1'"
                  style="color:#F56C6C"
                >
                  禁用
                </b>
                <b></b>
              </span>
              <span v-else>{{ scope.row[item.prop] }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" type="expand">
            <template>
              <el-form class="table-expand" label-position="left" inline>
                <el-form-item
                  v-for="(formItem, i) in tableColumns"
                  :key="i"
                  :label="formItem.label"
                >
                  <span v-if="formItem.prop == 'auth'">
                    <span v-if="curRowForm[formItem.prop] == '1'">
                      <b style="color:#409EFF">普通账户</b>
                    </span>
                    <span v-else-if="curRowForm[formItem.prop] == '0'">
                      <b style="color:#67C23A">管理员账户</b>
                    </span>
                  </span>
                  <span v-else-if="formItem.prop == 'enabled'">
                    <b
                      v-if="curRowForm[formItem.prop] == '1'"
                      style="color:#F56C6C"
                    >
                      禁用
                    </b>
                    <b
                      v-else-if="curRowForm[formItem.prop] == '0'"
                      style="color:#67C23A"
                    >
                      启用
                    </b>
                  </span>
                  <span v-else>{{ curRowForm[formItem.prop] }}</span>
                </el-form-item>
                <el-form-item class="edit-form-buttons">
                  <el-button size="mini" type="warning" @click="editDalogShow">
                    编辑
                  </el-button>

                  <el-popconfirm
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    icon="el-icon-info"
                    icon-color="red"
                    title="确定删除该用户吗？"
                    @confirm="deleteUserInfo"
                  >
                    <el-button slot="reference" size="mini" type="danger">
                      删除
                    </el-button>
                  </el-popconfirm>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="accountAuthorization-pagination"></el-pagination>
      </div>
    </div>
    <el-dialog title="修改其他用户信息" :visible.sync="dialogShow">
      <el-form
        :model="editForm"
        class="edit-dialog-form"
        :rules="editRules"
        inline
      >
        <el-form-item
          v-for="(item, i) in tableColumns"
          :key="i"
          :label="item.label"
        >
          <el-input
            class="edit-dialog-form-item"
            v-if="item.inputType == 'input'"
            v-model="editForm[item.prop]"
            size="mini"
          ></el-input>
          <span v-if="item.inputType == 'switch'">
            <el-switch
              v-model="editForm[item.prop]"
              active-color="#13ce66"
              :active-value="0"
              :inactive-value="1"
              inactive-color="#ff4949"
            ></el-switch>
            <b v-if="editForm[item.prop] == '1'">禁用</b>
            <b v-else-if="editForm[item.prop] == '0'">启用</b>
          </span>
          <div v-if="item.inputType == 'radio'">
            <el-radio v-model="editForm[item.prop]" size="mini" :label="0">
              管理员账户
            </el-radio>
            <el-radio v-model="editForm[item.prop]" size="mini" :label="1">
              普通账户
            </el-radio>
          </div>
          <span v-if="!item.inputType">{{ editForm[item.prop] }}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogShow = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="editUserInfo">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Header from '@/components/header';
import { tableColumns } from './table';
export default {
  components: {
    Header,
  },
  data() {
    return {
      //
      tableColumns: [],
      expands: [],
      tableData: [],
      userInfo: {},
      curRowForm: {},
      editForm: {},
      getRowKey(row) {
        return row.user_serials || '0';
      },
      dialogShow: false,
      editRules: {},
      popoverShow: false,
    };
  },
  created() {
    this.tableColumns = tableColumns;

    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.getOtherUserInfoList();
  },
  methods: {
    // 获取其他所有账户信息(只获取该账户所属公司下的账户)
    async getOtherUserInfoList() {
      const params = {
        code: this.userInfo.code,
        auth: this.userInfo.auth,
      };
      const { data, code } = await this.$http.post(
        '/users/queryOtherUsersInfo',
        this.$qs.stringify(params)
      );
      if (code == 1) {
        // console.log(data, 'data');
        this.$nextTick(() => {
          this.tableData = data;
          this.expands = [];
        });
      }
    },
    // 展开行切换只允许保留一行展开
    expandChange(row, expandedRows) {
      this.expands = [];
      if (expandedRows.length > 0) {
        row ? this.expands.push(row.user_serials) : '';
      }
    },
    // 点击行展开
    clickRow(row) {
      this.$refs.tableRef.toggleRowExpansion(row);
      this.curRowForm = row;
    },
    // 编辑弹窗的显示
    editDalogShow() {
      this.dialogShow = true;
      this.editForm = this._.cloneDeep(this.curRowForm);
      this.setRules();
    },
    // 编辑弹窗编辑按钮
    async editUserInfo() {
      const userInfo = this._.cloneDeep(this.editForm);
      userInfo.enabled = this.editForm.enabled ? 1 : 0;
      const { code, msg } = await this.$http.put(
        '/users/editUserInfo',
        this.$qs.stringify({ userInfo })
      );
      if (code == 1) {
        this.$message({
          type: 'success',
          message: msg,
          duration: 1500,
        });
        this.getOtherUserInfoList();
        this.dialogShow = false;
      } else {
        this.$message({
          type: 'error',
          message: msg,
          duration: 1500,
        });
      }
    },
    // 删除用户
    deleteUserInfo() {},
    // 设置弹窗dialog中form表单的校验规则
    setRules() {
      this.tableColumns.forEach((item) => {
        if (item.required) {
          this.editRules[item.prop] = [
            {
              required: true,
              message: `${item.label}不能为空`,
              trigger: 'blur',
            },
          ];
        }
      });
    },
  },
};
</script>

<style lang="less">
.accountAuthorization-container {
  width: 100%;
  height: 100%;
  .accountAuthorization-box {
    width: 90%;
    height: 600px;
    margin: 30px auto 5px;
    box-sizing: border-box;
    .accountAuthorization-table-header {
      width: 100%;
      height: 55px;
      border-radius: 5px;
      background: cadetblue;
    }
    .accountAuthorization-table-box {
      width: 100%;
      margin-top: 10px;
      height: calc(100% - 65px);
      border-radius: 5px;
      background: cadetblue;
      padding: 10px;
      box-sizing: border-box;
      .accountAuthorization-table {
        .table-expand {
          label {
            width: 90px;
            color: #99a9bf;
          }
          .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 50%;
            .noEdit {
              .noEdit-text {
                width: 70%;
                text-align: center;
                display: inline-block;
              }
            }
            .el-form-item__content {
              width: calc(80% - 120px);
            }
          }
          .edit-form-buttons {
            text-align: right;
            padding-right: 100px;
            height: 50px;
            padding-top: 20px;
            width: 100%;
            .el-button {
              margin-right: 15px;
            }
          }
        }
      }
      .accountAuthorization-pagination {
        width: 100%;
        margin-top: 10px;
        height: 45px;
      }
    }
  }
  .edit-dialog-form {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    font-size: 12px;
    .el-form-item {
      line-height: 50px;
      width: 50%;
      margin: 0;
      box-sizing: border-box;
      label {
        width: 90px;
        text-align: left;
      }
      .el-form-item__content {
        line-height: 50px;
      }
      .el-switch {
        margin-right: 10px;
      }
    }
  }
}
</style>

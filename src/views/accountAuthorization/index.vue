<template>
  <div class="accountAuthorization-container">
    <Header></Header>
    <div class="accountAuthorization-box">
      <div class="accountAuthorization-table-header">
        <div class="accountAuthorization-header-screen-box">
          <el-form inline>
            <el-form-item :model="form" label="企业代码">
              <el-select
                v-model="form.code"
                placeholder="企业代码"
                size="small"
                v-if="code == '000'"
                @change="changeSelect('code', form.code)"
              >
                <el-option
                  v-for="item in codeSelectOptions"
                  :key="item.code"
                  :label="`${item.name}---[${item.code}]`"
                  :value="item.code"
                ></el-option>
              </el-select>
              <el-input v-else v-model="code" size="small" disabled></el-input>
            </el-form-item>
            <el-form-item label="账户权限">
              <el-select
                v-model="form.auth"
                placeholder="账户权限"
                size="small"
                @change="changeSelect('auth', form.auth)"
              >
                <el-option label="管理员账户" :value="0"></el-option>
                <el-option label="普通账户" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="禁用状态">
              <el-select
                v-model="form.enabled"
                placeholder="禁用状态"
                size="small"
                @change="changeSelect('enabled', form.enabled)"
              >
                <el-option label="启用" :value="1"></el-option>
                <el-option label="禁用" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="success"
                size="small"
                class="el-icon-refresh"
                round
                @click="resetSelect"
              >
                重置
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="accountAuthorization-header-buttons-box">
          <el-button
            type="primary"
            class="el-icon-plus"
            size="small"
            @click="addDialogShow = true"
          >
            添加账户
          </el-button>
        </div>
      </div>
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
                <b v-if="scope.row[item.prop] == '1'" style="color:#67C23A">
                  启用
                </b>
                <b
                  v-else-if="scope.row[item.prop] == '0'"
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
                      v-if="curRowForm[formItem.prop] == '0'"
                      style="color:#F56C6C"
                    >
                      禁用
                    </b>
                    <b
                      v-else-if="curRowForm[formItem.prop] == '1'"
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
                    placement="top"
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
    <el-dialog title="修改账户" :visible.sync="editDialogShow">
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
              :active-value="1"
              :inactive-value="0"
              inactive-color="#ff4949"
            ></el-switch>
            <b v-if="editForm[item.prop] == '0'">禁用</b>
            <b v-else-if="editForm[item.prop] == '1'">启用</b>
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
        <el-button size="mini" @click="editDialogShow = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="editUserInfo">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加账户"
      width="650px"
      :visible.sync="addDialogShow"
      @close="addDialogClose"
    >
      <el-form
        ref="addFormRef"
        class="add-dialog-form"
        :model="addForm"
        :rules="addFormRules"
        inline-message
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            size="small"
            v-model="addForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input
            size="small"
            v-model="addForm.account"
            placeholder="请输入账户"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input
            type="password"
            size="small"
            v-model="addForm.pwd"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPwd">
          <el-input
            type="password"
            size="small"
            v-model="addForm.checkPwd"
            placeholder="请再输入一次密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属企业" prop="code">
          <el-select
            size="small"
            placeholder="请选择所属企业"
            v-model="addForm.code"
            v-if="code === '000'"
          >
            <el-option
              v-for="item in codeSelectOptions"
              :key="item.code"
              :label="`${item.name}---[${item.code}]`"
              :value="item.code"
            ></el-option>
          </el-select>
          <el-input
            v-else
            v-model="addForm.code"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="账户权限" prop="auth">
          <el-radio-group v-model="addForm.auth">
            <el-radio :label="0">管理员账户</el-radio>
            <el-radio :label="1">普通用户</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="addDialogShow = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addUser">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Header from '@/components/header';
import { tableColumns } from './table';
import {
  queryOtherUsersInfo,
  queryUserInfoByConditions,
  editUserInfo,
  deleteUserInfo,
  createUserInfo,
  queryAllEnterpriseCode,
} from '@/api/accountAuthorization';
export default {
  components: {
    Header,
  },
  data() {
    var validatePass = (rule, value, cb) => {
      if (value === '') {
        cb(new Error('请再次输入密码'));
      } else if (value !== this.addForm.pwd) {
        cb(new Error('两次输入密码不一致!'));
      } else {
        cb();
      }
    };
    return {
      // 顶部select change 事件筛选数组
      queryArray: [
        {
          key: 'code',
          value: '',
        },
        {
          key: 'auth',
          value: '',
        },
        {
          key: 'enabled',
          value: '',
        },
      ],
      code: '',
      tableColumns: [],
      expands: [],
      tableData: [],
      userInfo: {},
      curRowForm: {},
      editForm: {},
      getRowKey(row) {
        return row.user_serials || '0';
      },
      // dialog show status
      editDialogShow: false,
      addDialogShow: false,
      editRules: {},
      popoverShow: false,
      // 企业代码选项数组
      codeSelectOptions: [],
      // header form
      form: {},
      addForm: {},
      confirmPwd: '',
      // 添加用户dialog form的检验规则
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名！', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度应在3到10个字符之间',
            trigger: 'blur',
          },
        ],
        account: [
          { required: true, message: '请输入账户！', trigger: 'blur' },
          {
            min: 5,
            max: 12,
            message: '用户名的长度应在5到12个字符之间',
            trigger: 'blur',
          },
        ],
        pwd: [
          { required: true, message: '请输入密码！', trigger: 'blur' },
          {
            min: 6,
            max: 12,
            message: '密码的长度应在6到12个字符之间',
            trigger: 'blur',
          },
        ],
        checkPwd: [{ validator: validatePass, trigger: 'blur' }],
        code: [
          { required: true, message: '请选择所属企业！', trigger: 'change' },
        ],
        auth: [
          { required: true, message: '请选择账户权限', trigger: 'change' },
        ],
      },
    };
  },
  created() {
    const { code } = JSON.parse(localStorage.getItem('userInfo'));
    if (code === '000') {
      this.queryAllEnterpriseCode();
      this.code = code;
    } else {
      this.code = code;
      this.addForm.code = code;
    }
    this.tableColumns = tableColumns;

    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.getOtherUserInfoList();
  },
  methods: {
    // select 选择框change筛选
    changeSelect(condition, value) {
      this.queryArray.filter((item) => {
        item.value = item.key === condition ? value : item.value;
      });
      this.queryUserInfoByCondition();
    },
    async queryUserInfoByCondition() {
      let loading = this.$loading({
        lock: true,
        text: '查询中...',
      });
      const params = {
        code: this.code,
        auth: JSON.parse(localStorage.getItem('userInfo')).auth,
        conditions: this.queryArray,
      };
      const { data, code, msg } = await queryUserInfoByConditions(params);
      if (code === 1) {
        this.$nextTick(() => {
          this.tableData = data;
          loading.close();
        });
      } else {
        loading.close();
        this.$message({
          type: 'error',
          message: msg,
        });
      }
    },
    // 重置select
    resetSelect() {
      this.queryArray.forEach((item) => {
        item.value = '';
      });
      this.queryUserInfoByCondition();
      this.form = {};
      this.form.code = this.code == '000' ? '' : this.code;
    },
    // 获取其他所有账户信息(只获取该账户所属公司下的账户)
    async getOtherUserInfoList() {
      let loading = this.$loading({
        lock: true,
        text: '获取中...',
      });
      const params = {
        code: this.userInfo.code,
        auth: this.userInfo.auth,
      };
      const { data, code, msg } = await queryOtherUsersInfo(params);
      if (code == 1) {
        this.$nextTick(() => {
          this.tableData = data;
          this.expands = [];
          loading.close();
        });
        if (data.length == 0) {
          loading.close();
          this.$message({
            type: 'warning',
            message: msg,
            duration: 4000,
          });
        }
      } else {
        this.$message({
          type: 'error',
          message: msg,
          duration: 2000,
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
      this.editDialogShow = true;
      this.editForm = this._.cloneDeep(this.curRowForm);
      this.setRules();
    },
    // 编辑弹窗编辑按钮
    async editUserInfo() {
      let loading = this.$loading({
        lock: true,
        text: '提交中...',
      });
      const userInfo = this._.cloneDeep(this.editForm);
      userInfo.enabled = this.editForm.enabled ? 1 : 0;
      const { code, msg } = await editUserInfo({ userInfo });
      if (code == 1) {
        loading.close();
        this.$message({
          type: 'success',
          message: msg,
          duration: 1500,
        });
        this.editDialogShow = false;
        this.getOtherUserInfoList();
      } else {
        loading.close();
        this.$message({
          type: 'error',
          message: msg,
          duration: 1500,
        });
      }
    },
    // 删除用户
    async deleteUserInfo() {
      let loading = this.$loading({
        lock: true,
        text: '删除中...',
      });
      const params = {
        account: this.curRowForm.account,
      };
      const { code, msg } = await deleteUserInfo(params);
      if (code === 1) {
        loading.close();
        this.$message({
          type: 'success',
          message: msg,
          duration: 2000,
        });
        this.getOtherUserInfoList();
      } else {
        loading.close();
        this.$message({
          type: 'error',
          message: msg,
          duration: 2000,
        });
      }
    },
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
    async queryAllEnterpriseCode() {
      const { data, code, msg } = await queryAllEnterpriseCode();
      if (code == 1) {
        this.$nextTick(() => {
          this.codeSelectOptions = data;
        });
      } else {
        console.log(msg);
      }
    },
    addDialogClose() {
      // 添加弹窗的关闭回调
      this.addForm = {
        code: this.code,
      };
      this.addForm = this.code === '000' ? {} : { code: this.code };
      this.$refs.addFormRef.resetFields();
    },
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          let loading = this.$loading({
            lock: true,
            text: '添加中...',
          });
          const params = {
            userInfo: this.addForm,
          };
          const { code, msg } = await createUserInfo(params);
          if (code === 1) {
            loading.close();
            this.$message({
              type: 'success',
              message: msg,
            });
            this.addDialogShow = false;
            this.getOtherUserInfoList();
          } else {
            loading.close();
            this.$message({
              type: 'error',
              message: msg,
              duration: 2000,
            });
          }
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
  background-color: #f9f9f9;
  .accountAuthorization-box {
    width: 90%;
    height: 600px;
    margin: 30px auto 5px;
    box-sizing: border-box;
    .accountAuthorization-table-header {
      width: 100%;
      height: 55px;
      border-radius: 5px;
      background: #d9ecff;
      padding-left: 15px;
      box-sizing: border-box;
      .accountAuthorization-header-screen-box {
        width: 92%;
        float: left;
        height: 100%;
        .el-form {
          margin-top: 5px;
        }
      }
      .accountAuthorization-header-buttons-box {
        width: 8%;
        float: left;
        height: 100%;
        .el-button {
          margin-top: 10px;
        }
      }
    }
    .accountAuthorization-table-box {
      width: 100%;
      margin-top: 10px;
      height: calc(100% - 65px);
      box-sizing: border-box;
      border: 3px solid #d9ecff;
      border-radius: 5px;
      .accountAuthorization-table {
        border-radius: 5px;
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
  .add-dialog-form {
    margin: 0 auto;
    height: auto;
    overflow: auto;
    .el-form-item {
      box-sizing: border-box;
      margin: 0;
      label {
        width: 90px;
      }
      .el-input {
        width: calc(80% - 90px);
        .el-input__inner {
          margin-top: 5px;
        }
      }
      .el-select {
        width: calc(80% - 90px);
        .el-input {
          width: 100%;
        }
      }
    }
  }
}
</style>

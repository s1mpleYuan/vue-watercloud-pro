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
          ></el-table-column>
          <el-table-column align="center" type="expand">
            <template>
              <el-form class="table-expand" label-position="left" inline>
                <el-form-item
                  v-for="(formItem, i) in tableColumns"
                  :key="i"
                  :label="formItem.label"
                >
                  <span>{{ curRowForm[formItem.prop] }}</span>
                </el-form-item>
                <el-form-item class="edit-form-buttons" v-if="isEdit">
                  <el-button size="mini" @click="cancelEdit">取消</el-button>
                  <el-button type="primary" size="mini">提交</el-button>
                </el-form-item>
                <el-form-item class="edit-form-buttons" v-else-if="!isEdit">
                  <el-button size="mini" type="warning" @click="startEdit">
                    编辑
                  </el-button>
                  <el-button size="mini" type="danger" @click="deleteUser">
                    删除
                  </el-button>
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
          <el-switch
            v-if="item.inputType == 'switch'"
            v-model="editForm[item.prop]"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
          <span v-if="!item.inputType">{{ editForm[item.prop] }}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogShow = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogShow = false">
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
      tableColumns: [],
      expands: [],
      tableData: [],
      userInfo: {},
      curRowForm: {},
      editForm: {},
      isEdit: false,
      getRowKey(row) {
        return row.user_serials;
      },
      dialogShow: false,
      editRules: {},
    };
  },
  created() {
    this.tableColumns = tableColumns;

    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.getOtherUserInfoList();
  },
  methods: {
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
        this.tableData = data;
      }
    },
    expandChange(row, expandedRows) {
      this.expands = [];
      if (expandedRows.length > 0) {
        row ? this.expands.push(row.user_serials) : '';
      }
    },
    clickRow(row) {
      this.$refs.tableRef.toggleRowExpansion(row);
      this.curRowForm = this._.cloneDeep(row);
    },
    cancelEdit() {},
    startEdit() {
      this.dialogShow = true;
      this.editForm = this._.cloneDeep(this.curRowForm);
      this.setRules();
    },
    deleteUser() {},
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
    }
  }
}
</style>

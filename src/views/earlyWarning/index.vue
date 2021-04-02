<template>
  <div class="earlyWarning-container">
    <Header></Header>
    <div class="earlyWarning-main">
      <!-- 左侧预警警示信息数据表格 -->
      <div class="earlyWarning-main-left">
        <div class="earlyWarning-list-box">
          <div class="top-panel-box"></div>
          <el-table
            class="earlyWarning-table"
            :data="warningInfoData"
            height="500px"
          >
            <el-table-column
              v-for="(item, i) in warningInfoTable"
              :key="i"
              :label="item.label"
              align="center"
              :width="item.width"
              :empty-text="item.emptyText"
              :resizable="false"
              :prop="item.prop"
              :sortable="item.isSort || false"
            >
            <template slot-scope="scope">
              <div v-if="item.label == '操作'">
                <el-button type="text" style="width: 70%;height: 100%" class="el-icon-arrow-right"></el-button>
              </div>
              <div v-else-if="item.label == '类型'">
                <el-tag v-if="scope.row[item.prop] == '0'" type="primary">已解决</el-tag>
                <el-tag v-else-if="scope.row[item.prop] == '1'" type="info">普通</el-tag>
                <el-tag v-else-if="scope.row[item.prop] == '2'" type="warning">警告</el-tag>
                <el-tag v-else-if="scope.row[item.prop] == '3'" type="danger">紧急</el-tag>
              </div>
              <div v-else-if="item.label == '执行人'">
                <span v-if="scope.row[item.prop] == ''" style="color:red">未执行，需要处理</span>
                <span v-else style="font-weight:600">{{ scope.row[item.prop] }}</span>
              </div>
              <div v-else>
                {{ scope.row[item.prop] }}
              </div>
            </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            background
          ></el-pagination>
        </div>
      </div>
      <!-- 右侧系统消息、其他平台入口面板 -->
      <div class="earlyWarning-main-right">
        <!-- 消息面板 -->
        <div class="message-box">
          <div class="content-box">
            <!-- 搜索框 -->
            <div class="search-box">
              <h1>
                消息&nbsp;
                <i class="el-icon-caret-bottom"></i>
              </h1>
              <el-input
                class="search"
                size="mini"
                placeholder="关键字搜索"
              ></el-input>
            </div>
            <!-- 消息列表数据显示区域 -->
            <div class="msg-list-box">
              <div class="msg-list">
                <div
                  :class="[
                    'msg-row',
                    item['status'] == '1' ? 'processed-row' : 'pending-row',
                  ]"
                  v-for="(item, i) in msgList"
                  :key="i"
                >
                  <div
                    class="msg-item"
                    :style="{
                      textAlign: 'center',
                      width: uiItem.width ? uiItem.width : '80px',
                    }"
                    v-for="(uiItem, j) in messageList"
                    :key="j"
                  >
                    <i
                      class="el-icon-caret-left"
                      v-if="uiItem.prop == 'type' && item[uiItem.prop] == '0'"
                    >
                      接收
                    </i>
                    <i
                      class="el-icon-caret-right"
                      v-else-if="
                        uiItem.prop == 'type' && item[uiItem.prop] == '1'
                      "
                    >
                      发送
                    </i>
                    <i
                      class="el-icon-warning"
                      v-else-if="
                        uiItem.prop == 'status' && item[uiItem.prop] == '0'
                      "
                    >
                      未处理
                    </i>
                    <i
                      class="el-icon-success"
                      v-else-if="
                        uiItem.prop == 'status' && item[uiItem.prop] == '1'
                      "
                    >
                      已处理
                    </i>
                    <span v-else>
                      {{ item[uiItem.prop] }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 功能按钮区域 -->
            <div class="button-list-box">
              <el-button
                type="primary"
                size="mini"
                class="el-icon-plus item"
                circle
              ></el-button>
              <el-badge class="item" :value="pendingNum">
                <el-button type="danger" size="mini" class="" round>
                  待处理
                </el-button>
              </el-badge>
              <el-badge class="item" :value="processedNum">
                <el-button type="success" size="mini" round>已处理</el-button>
              </el-badge>
              <el-button class="item" type="info" size="mini" round>
                查看所有
              </el-button>
            </div>
          </div>
        </div>
        <!-- 其他平台入口 -->
        <div class="earlyWaring-paltform-box">
          <el-button
            type="primary"
            class="platform"
            size="small"
            @click="goOtherPlatform('/dataPlatform')"
            round
          >
            <i class="el-icon-data-analysis"></i>
            &nbsp;列表数据平台
            <i class="el-icon-caret-right"></i>
          </el-button>
          <el-button
            type="success"
            class="platform"
            size="small"
            @click="goOtherPlatform('/chartManagement')"
            round
          >
            <i class="el-icon-pie-chart"></i>
            &nbsp;图表数据平台
            <i class="el-icon-caret-right"></i>
          </el-button>
          <el-button
            type="warning"
            class="platform"
            size="small"
            @click="goOtherPlatform('/warningRecord')"
            round
          >
            <i class="el-icon-document"></i>
            &nbsp;数据日志平台
            <i class="el-icon-caret-right"></i>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 组件
import Header from '@/components/header';
// 其他数据
import { messageList, warningInfoTable } from './table';
import { msgData, warningInfoData } from './data';

export default {
  name: 'EarlyWarning',
  components: {
    Header,
  },
  data() {
    return {
      // 消息处理状态
      pendingNum: '0',
      processedNum: '0',
      // 消息列表渲染对象
      messageList: {},
      // 消息列表数据
      msgList: [],
      // 预警、警示信息表格渲染对象
      warningInfoTable: {},
      // 预警、警示信息表格数据数组
      warningInfoData: [],
      // 预警、警示信息表格分页模块相关对象数据
      currentPage: 1, // 当前页数
    };
  },
  created() {
    this.messageList = messageList;
    this.msgList = msgData;
    this.warningInfoTable = warningInfoTable;
    this.warningInfoData = warningInfoData;
    this.getMessageList();
  },
  methods: {
    getRowClassName(rowObj) {
      console.log();
      switch (rowObj.row.type) {
        case '0':
          return 'primary-row';
        case '1':
          return 'info-row';
        case '2':
          return 'warning-row';
        case '3':
          return 'danger-row';
        default:
          break;
      }
    },
    goOtherPlatform(routerUrl) {
      // 跳转其他业务平台事件
      this.$router.push(routerUrl);
    },
    getMessageList() {
      // 获取右侧消息列表接口数据
      // 接口
      const processed = this.msgList.filter((item) => item.status == '0');
      const pending = this.msgList.filter((item) => item.status == '1');
      this.processedNum = processed.length || 0;
      this.pendingNum = pending.length || 0;
    },
    handleSizeChange() {
      // 当前页显示数量改变事件
    },
    handleCurrentChange() {
      // 页码改变事件
    },
  },
};
</script>

<style lang="less">
.earlyWarning-container {
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  z-index: 1;
  .earlyWarning-main {
    height: calc(100% - 55px);
    width: 100%;
    .earlyWarning-main-left {
      width: 80%;
      height: 100%;
      float: left;
      padding: 15px 10px;
      box-sizing: border-box;
      .earlyWarning-list-box {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        background-color: #fff;
        padding: 5px 10px;
        box-sizing: border-box;
        .top-panel-box {
          height: 80px;
          width: 100%;
        }
        .earlyWarning-table {
          width: 100%;
        }
        .table-header-class { 
          background-color: #F2F6FC;
        }
      }
    }
    .earlyWarning-main-right {
      width: 20%;
      height: 100%;
      float: left;
      padding-right: 5px;
      box-sizing: border-box;
      .message-box {
        width: 100%;
        height: 60%;
        padding: 15px 0;
        .content-box {
          width: 100%;
          height: 100%;
          border-radius: 6px;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          background-color: #fff;
          display: flex;
          flex-direction: column;
          padding: 0 10px;
          box-sizing: border-box;
          .search-box {
            height: 40px;
            width: 100%;
            box-sizing: border-box;
            h1 {
              width: 60px;
              float: left;
              font-size: 16px;
              line-height: 20px;
              font-weight: 600;
              color: #c0c4cc;
              padding-left: 5px;
            }
            .el-input,
            .el-input__inner {
              width: 70%;
              margin-left: 10px;
              float: left;
              margin-top: 3px;
              border-radius: 20px;
            }
          }
          .msg-list-box {
            flex: 1;
            overflow: auto;
            border-radius: 5px;
            border: 1px solid #c0c4cc;
            padding: 5px 0;
            .msg-list {
              width: 100%;
              height: 100%;
              .msg-row {
                width: calc(100% - 10px);
                height: 28px;
                margin-left: 5px;
                clear: both;
                margin-top: 2px;
                box-sizing: border-box;
                border-radius: 3px;
                cursor: pointer;
                .msg-item {
                  height: 100%;
                  float: left;
                  position: relative;
                  font-size: 12px;
                  line-height: 28px;
                }
              }
            }
          }
          .button-list-box {
            height: 50px;
            width: 100%;
            padding: 0 5px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .item {
              display: inline-block;
              sup {
                top: 2px;
                right: 16px;
              }
            }
          }
        }
      }
      .earlyWaring-paltform-box {
        width: 100%;
        height: 40%;
        padding: 20px 15px;
        box-sizing: border-box;
        .platform {
          width: 100%;
          margin: 15px 0;
          font-size: 16px;
        }
      }
    }
  }
}
.processed-row {
  background-color: #f0f9eb;
  border: 1px solid #67c23a;
  color: #67c23a;
}
.processed-row:hover {
  background-color: #67c23a;
  color: #fff;
}
.pending-row {
  background-color: #f0f9eb;
  border: 1px solid #f56c6c;
  color: #f56c6c;
}
.pending-row:hover {
  background-color: #f56c6c;
  color: #fff;
}
.platform:hover {
  position: relative;
  bottom: 1px;
  right: 1px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}

</style>

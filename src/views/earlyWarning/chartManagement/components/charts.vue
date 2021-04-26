<template>
  <div class="charts-container">
    <!-- <div class="mask" v-show="maskShow">
      <el-button type="text">
        <i class="el-icon-refresh"></i>
        &nbsp;已更改配置，请重新生成！
      </el-button>
    </div> -->
    <div class="chart-box">
      <div id="chart" class="chart-content" v-if="isInit"></div>
      <div class="chart-content" v-else>
        <i class="el-icon-info"></i>
        <span>请选择图表生成配置数据</span>
      </div>
    </div>
    <div class="detail-box">
      <div class="history-box">
        <el-tooltip
          class="item"
          effect="dark"
          content="图表生成历史记录"
          placement="left"
        >
          <el-button type="text" class="el-icon-document"></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="清除历史记录"
          placement="left"
        >
          <el-button type="text" class="el-icon-delete"></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="图表生成报表"
          placement="left"
        >
          <el-button type="text" class="el-icon-data-analysis"></el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import {
  barOption,
  pieOption,
  setPieChart,
  setBarChart,
} from '../chartOptions';
export default {
  props: ['chartdata'],
  data() {
    return {
      // chart是否生成
      isInit: false,
      maskShow: false,
      chart_data: {},
      dataUnit: 'day',
    };
  },
  watch: {
    chartdata: function(val) {
      if (val !== '') {
        //
        this.isInit = true;
        const { chartType } = val;
        if (chartType === 'bar' || chartType === 'line') {
          this.updateCharts(barOption, val);
        } else if (chartType === 'pie') {
          this.updateCharts(pieOption, val);
        }
      }
    },
  },
  created() {},
  methods: {
    initCharts(option, val) {
      return new Promise((resolve) => {
        const { chartType, dataUnit } = val;
        if (chartType === 'pie') {
          setPieChart(option, val);
        } else {
          setBarChart(option, val);
          this.dataUnit = dataUnit;
        }
        resolve(option);
      });
    },
    async updateCharts(option, data) {
      await this.initCharts(option, data).then((initOption) => {
        let chartDom = document.getElementById('chart');
        this.echarts.init(chartDom).clear();
        this.echarts.init(chartDom).setOption(initOption);
      });
    },
  },
};
</script>

<style lang="less">
.charts-container {
  width: 100%;
  height: 80%;
  box-sizing: border-box;
  padding: 10px 0 0 0;
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(255, 255, 255, 0.7);
    .el-button {
      font-size: 18px;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .chart-box {
    width: calc(100% - 53px);
    // width: 60%;
    float: left;
    margin: 0 auto;
    height: 100%;
    padding: 10px 15px;
    box-sizing: border-box;
    .chart-content {
      margin: 0 auto;
      width: 100%;
      max-width: 900px;
      height: 100%;
      padding: 25px 10px 0;
      box-sizing: border-box;
      border-radius: 6px;
      background: #fff;
      box-shadow: 0 0px 5px rgba(0, 0, 0, 0.3) inset;
      i {
        width: 50px;
        text-align: center;
        font-size: 24px;
        color: red;
        display: block;
        margin: 150px auto 0;
      }
      span {
        display: block;
        width: 50%;
        text-align: center;
        font-size: 20px;
        margin: 10px auto 0;
      }
    }
  }
  .detail-box {
    width: 38px;
    margin-right: 15px;
    height: 100%;
    float: right;
    padding: 5px 2px;
    box-sizing: border-box;
    .history-box {
      margin: 0 0 5px;
      min-height: 100px;
      width: 100%;
      background: #000;
      border-radius: 5px;
      .item {
        width: 100%;
        color: #fff;
        margin-top: 5px;
        font-size: 17px;
      }
      .el-button + .el-button {
        margin-left: 0;
      }
    }
  }
}
</style>

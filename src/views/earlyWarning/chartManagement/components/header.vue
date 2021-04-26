<template>
  <div class="charts-header-container">
    <div class="region-box">
      <span class="label-span">
        <span v-if="code === '000'">区域选择</span>
        <span v-else>管辖区域</span>
        <i class="el-icon-caret-right"></i>
      </span>
      <el-form class="region-form" :model="regionForm" inline>
        <el-form-item label="">
          <span class="region-label" v-if="curLevel >= 1">
            省/直辖市：
            <b>{{ region.province }}</b>
          </span>
          <el-select
            v-model="regionForm.province"
            v-else
            size="mini"
            placeholder="请选择省/直辖市"
            @change="changeRegion(regionForm.province, 'city')"
          >
            <el-option
              v-for="item in region.provinces"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <span class="region-label" v-if="curLevel >= 2">
            地级市：
            <b>{{ region.city }}</b>
          </span>
          <el-select
            v-else
            size="mini"
            v-model="regionForm.city"
            placeholder="请选择地级市"
            @change="changeRegion(regionForm.city, 'country')"
          >
            <el-option
              v-for="item in region.citys"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <span class="region-label" v-if="curLevel >= 3">
            区/县：
            <b>{{ region.country }}</b>
          </span>
          <el-select
            v-else
            size="mini"
            v-model="regionForm.country"
            placeholder="请选择区/县"
            @change="changeRegion(regionForm.country, 'company')"
          >
            <el-option
              v-for="item in region.countrys"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <span class="region-label" v-if="curLevel == 4">
            小区/供水公司：
            <b>{{ region.company }}</b>
          </span>
          <el-select
            v-else
            v-model="regionForm.company"
            size="mini"
            placeholder="请选择小区/供水公司"
            @change="changeRegion(regionForm.company)"
          >
            <el-option
              v-for="item in region.companys"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="chart-options-box">
      <span class="label-span">
        图表配置
        <i class="el-icon-caret-right"></i>
      </span>

      <el-tooltip class="chart-option-toggle" effect="dark" placement="bottom">
        <div slot="content">
          <span v-if="model === 1">切换为水表使用数据图表模式</span>
          <span v-else>切换为水表设备数据图表模式</span>
        </div>
        <el-button
          type="text"
          :class="[model === 0 ? 'el-icon-s-platform' : 'el-icon-s-marketing']"
          size="mini"
          @click="toggleChartModel"
        >
          <b v-if="model === 0">水表使用</b>
          <b v-else>水表设备</b>
        </el-button>
      </el-tooltip>
      <el-divider class="vertical-divider" direction="vertical"></el-divider>

      <el-form :model="chartForm" class="chart-form-box" inline>
        <el-form-item label="数据内容">
          <el-select
            size="mini"
            placeholder="请选择数据内容"
            v-model="chartForm.dataContent"
          >
            <el-option
              v-show="model === 0"
              value="Settled_traffic"
              label="结算流量"
            ></el-option>
            <el-option
              v-show="model === 0"
              value="Cumulative_traffic"
              label="累计流量"
            ></el-option>
            <el-option
              v-show="model === 0"
              value="Last_used"
              label="上月使用"
            ></el-option>
            <el-option
              v-show="model === 1"
              value="Voltage"
              label="电压"
            ></el-option>
            <el-option
              v-show="model === 1"
              value="Signal_strength"
              label="信号强度"
            ></el-option>
            <el-option
              v-show="model === 1"
              value="Consumption"
              label="电耗"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图表类型" v-if="model === 0">
          <el-radio-group size="mini" v-model="chartForm.chartType">
            <el-radio-button label="bar">柱状/折线图</el-radio-button>
            <el-radio-button label="pie">
              饼图
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="设备编码" v-else>
          <el-select
            v-model="chartForm.equipment_code"
            size="mini"
            placeholder="请选择设备编码"
          >
            <el-option value="1125434"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间范围">
          <el-date-picker
            size="mini"
            v-model="chartForm.dateValue"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="generateCharts">
            <i class="el-icon-pie-chart"></i>
            &nbsp;生成
          </el-button>
          <el-button
            v-show="code === '000'"
            type="info"
            size="mini"
            @click="clearRegionForm"
          >
            <i class="el-icon-delete"></i>
            &nbsp;清空
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  getRegionBranch,
  getChildRegionById,
  getGenerateChartsData,
} from '@/api/chartManagement';

export default {
  data() {
    return {
      // 区域
      region: {},
      regionForm: {
        province: '',
        city: '',
        country: '',
        company: '',
      },
      curLevel: 4,
      code: '',
      // 图标配置UI对象
      model: 0, // 0 为 水表使用数据 如结算流量等   1 为水表设备数据 如设备电压等
      chartForm: {}, // 图表 form
    };
  },
  created() {
    this.setDefaultForm();
    // this.generateCharts();
    let { region, code } = JSON.parse(localStorage.getItem('userInfo'));
    this.code = code;
    if (code === '000') {
      this.curLevel = 0;
    }
    if (region === '1') {
      this.getChildRegionById(region, 'province');
      this.changeRegion('370000', 'city');
    } else {
      this.getRegionBranch(region);
    }
  },
  methods: {
    // 设置默认表单值
    setDefaultForm() {
      let now = new Date();
      this.regionForm = {
        province: '370000',
      };
      this.chartForm = {
        model: this.model,
        dataContent: this.model === 0 ? 'Settled_traffic' : 'Signal_strength',
        equipment_code: '',
        chartType: 'bar',
        dateValue: [
          this.$dayjs(now).format('YYYY-MM-01 00:00:00'),
          this.$dayjs(now).format('YYYY-MM-DD 00:00:00'),
        ],
      };
    },
    // form blur 事件
    checkForm() {
      const { province } = this.regionForm;
      const {
        dataContent,
        chartType,
        equipment_code,
        dateValue,
      } = this.chartForm;
      if (!province) {
        this.$notify.error({
          title: '提示',
          message: '请至少选择一个区域进行查看数据!',
          duration: 2000,
        });
        return;
      }
      if (!dataContent) {
        this.$notify.error({
          title: '提示',
          message: '请选择数据内容!',
          duration: 2000,
        });
        return;
      } else if (!dateValue) {
        this.$notify.error({
          title: '提示',
          message: '请选择时间范围!',
          duration: 2000,
        });
        return;
      }
      if (this.model === 0) {
        if (!chartType) {
          this.$notify.error({
            title: '提示',
            message: '请选择图表类型!',
            duration: 2000,
          });
          return;
        }
      } else {
        if (!equipment_code) {
          this.$notify.error({
            title: '提示',
            message: '请选择水表设备编码!',
            duration: 2000,
          });
          return;
        }
      }
    },
    // 切换图表显示模式
    toggleChartModel() {
      this.model = this.model === 0 ? 1 : 0;
      this.setDefaultForm();
    },
    // 生成图表
    async generateCharts() {
      this.checkForm();
      //

      const { dateValue } = this.chartForm;
      this.chartForm.dateValue[0] = this.$dayjs(dateValue[0]).format(
        'YYYY-MM-DD HH:mm:ss'
      );
      this.chartForm.dateValue[1] = this.$dayjs(dateValue[1]).format(
        'YYYY-MM-DD HH:mm:ss'
      );
      const params = {
        region: this.regionForm,
        chartOptions: {
          model: this.model,
          dateUnit: 'day',
          ...this.chartForm,
        },
      };
      const { data, code, msg } = await getGenerateChartsData(params);
      if (code == 1) {
        this.$nextTick(() => {
          this.$emit('chartDataGet', data);
        });
      } else {
        console.error(msg);
      }
      //
      this.$store.commit('CHART_OPTIONS', this.chartForm);
    },
    // 根据id获取该id的行政区域下属的行政区域
    async getChildRegionById(id, selectType) {
      const params = {
        id,
      };
      const { data, code, msg } = await getChildRegionById(params);
      if (code === 1) {
        // console.log(data);
        this.$set(this.region, `${selectType}s`, data);
      } else {
        console.error(msg);
      }
    },
    // select change事件
    changeRegion(val, selectType) {
      this.$set(this.regionForm, selectType, '');
      if (!selectType) {
        //
      } else {
        //
        this.getChildRegionById(val, selectType);
      }
    },
    // 重置区域select表单
    clearRegionForm() {
      this.curLevel = 0;
      this.region.citys = [];
      this.region.countrys = [];
      this.region.companys = [];
      this.regionForm = {
        province: '',
        city: '',
        country: '',
        company: '',
      };
    },
    // 根据行政区域编码id获取整个分支
    async getRegionBranch(id) {
      const params = {
        id,
      };
      const { data, code, msg } = await getRegionBranch(params);
      if (code === 1) {
        this.$nextTick(() => {
          let length = data.length;
          switch (length) {
            case 0:
              break;
            case 1:
              this.clearRegionForm();
              this.$set(this.region, 'province', data[0].name);
              this.regionForm.province = data[0].name;
              this.$set(this.region, 'citys', data[0].children);
              break;
            case 2:
              this.clearRegionForm();
              this.$set(this.region, 'province', data[0].name);
              this.regionForm.province = data[0].name;
              this.$set(this.region, 'city', data[1].name);
              this.regionForm.city = data[1].name;
              this.$set(this.region, 'countrys', data[1].children);
              break;
            case 3:
              this.clearRegionForm();
              this.$set(this.region, 'province', data[0].name);
              this.regionForm.province = data[0].name;
              this.$set(this.region, 'city', data[1].name);
              this.regionForm.city = data[1].name;
              this.$set(this.region, 'country', data[2].name);
              this.regionForm.country = data[2].name;
              this.$set(this.region, 'companys', data[2].children);
              break;
            case 4:
              this.clearRegionForm();
              this.$set(this.region, 'province', data[0].name);
              this.regionForm.province = data[0].name;
              this.$set(this.region, 'city', data[1].name);
              this.regionForm.city = data[1].name;
              this.$set(this.region, 'country', data[2].name);
              this.regionForm.country = data[2].name;
              this.$set(this.region, 'company', data[3].name);
              this.regionForm.company = data[3].name;
              break;
            default:
              break;
          }
          this.curLevel = length;
        });
      } else {
        console.error(msg);
      }
    },
  },
};
</script>

<style lang="less">
.charts-header-container {
  width: 100%;
  height: 20%;
  padding: 5px 15px;
  box-sizing: border-box;
  border-radius: 6px;
  .region-box {
    width: 100%;
    height: 45%;
    background: rgb(228, 228, 228);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) inset;
    border-radius: 6px;
    .region-form {
      width: 90%;
      box-sizing: border-box;
      float: left;
      position: relative;
      top: 50%;
      transform: translate(0, -50%);
      .el-form-item {
        width: 18%;
        padding: 0 15px;
        box-sizing: border-box;
        margin: 0;
        .region-label {
          text-align: center;
          display: inline-block;
        }
      }
    }
  }
  .chart-options-box {
    margin-top: 10px;
    height: 50%;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) inset;
    background: rgb(228, 228, 228);
    border-radius: 6px;
    .chart-option-toggle {
      // width: 35px;
      color: #000;
      position: relative;
      top: 50%;
      transform: translate(0, -50%);
      float: left;
    }
    .chart-form-box {
      position: relative;
      top: 50%;
      transform: translate(0, -50%);
      float: left;
      .el-form-item {
        margin: 0 5px;
      }
    }
  }
  .vertical-divider {
    float: left;
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    width: 2px;
  }
  .label-span {
    width: 7%;
    font-size: 14px;
    margin-left: 10px;
    font-weight: 600;
    color: #666;
    text-align: center;
    display: block;
    position: relative;
    top: 50%;
    float: left;
    transform: translate(0, -50%);
  }
}
</style>

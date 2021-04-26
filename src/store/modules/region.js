import { REGION_ID, CHART_OPTIONS, CHART_REGION_ID, CHART_DATA } from '../mutation-type';

const region = {
  namespace: true,
  state: {
    // 图表数据 当前选择的行政区域编码
    region_id: '',
    // 图表数据 当前选择的图表配置对象
    chart_options: {},
    // 图表数据 当前查看的图表数据所属的行政区域编码
    chart_region_id: '',
    // 图表数据 根据配置后获取的数据
    char_data: []
  },
  mutations: {
    [REGION_ID]: (state, value) => {
      state.region_id = value;
    },
    [CHART_OPTIONS]: (state, value) => {
      state.chart_options = value;
    },
    [CHART_REGION_ID]: (state, value) => {
      state.chart_region_id = value;
    },
    [CHART_DATA]: (state, value) => {
      state.char_data = value;
    }
  }
};

export default region;
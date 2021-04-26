<template>
  <div class="chartsIndex-container">
    <ChartsHeader @chartDataGet="chartDataGet"></ChartsHeader>
    <Charts :chartdata="chart_data"></Charts>
  </div>
</template>

<script>
import ChartsHeader from './header';
import Charts from './charts';
export default {
  components: {
    ChartsHeader,
    Charts,
  },
  data() {
    return {
      chart_data: [],
    };
  },
  created() {},
  methods: {
    chartDataGet(val) {
      this.chart_data = val;
    },
  },
};
</script>

<style lang="less">
.chartsIndex-container {
  width: 100%;
  height: 100%;
  padding: 10px 0;
  box-sizing: border-box;
}
</style>

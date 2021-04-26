var barOption = {
  title: {
    text: 'title text',
    left: '30px',
    textStyle: {
      fontSize: 16,
      fontWeight: 600
    }
  },
  xAxis: {
    name: 'xAxis name',
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value',
    name: 'xAxis name',
  },
  tooltip: {
    trigger: 'item',
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [{
    data: [],
    type: 'bar',
    showBackground: true,
    backgroundStyle: {
      color: 'rgba(180, 180, 180, 0.2)'
    },
    barMinWidth: 10,
    barMaxWidth: 30
  }]
};

var pieOption = {
  title: {
    text: 'title',
    left: '30%',
    textStyle: {
      fontSize: 16,
      fontWeight: 600
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : <b>{c}</b> ({d}%)'
  },
  legend: {
    //     type: 'scroll',
    //     orient: 'vertical',
    //     right: 10,
    //     top: 20,
    //     bottom: 20,
    //     data: [],
    //     selected: []
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: '',
      type: 'pie',
      // radius: '55%',
      // center: ['40%', '50%'],
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

export function setPieChart(option, chartData) {
  const {
    title,
    yAxisTitle,
    data } = chartData;
  console.log(chartData);
  let data2 = [];
  data.forEach(item => {
    data2.push({
      value: item.data,
      name: item.copy_time
    });
  });
  option.title.text = title;
  option.series[0].name = yAxisTitle;
  option.series[0].data = data2;
}

export function setBarChart(option, chartData) {
  const {
    title,
    xAxisTitle,
    yAxisTitle,
    chartType,
    data,
  } = chartData;
  option.xAxis.data = [];
  option.series[0].data = [];
  data.forEach((item) => {
    option.xAxis.data.push(item.copy_time);
    option.series[0].data.push(item.data);
  });
  option.title.text = title;
  option.series[0].type = chartType;
  option.xAxis.name = xAxisTitle;
  option.yAxis.name = yAxisTitle;
}

export {
  barOption,
  pieOption
};
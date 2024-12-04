import React, { useEffect } from "react";
import { useRef } from "react";
import * as echarts from "echarts";

const axisOptionBar = {
  xAxis: {
    type: "category",
    data: ['1%', '5%', '10%', '50%', '90%', '95%', '99%'],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
    },
  ],
  
};

const axisOptionSca = {
  xAxis: {
    name: 'epoch',
  },
  yAxis: {
    name: 'loss',
  },
  series: [
    {
      symbolSize: 20,
      data: [],
      type: 'scatter',
    },
  ],
  
}

const ECharts = ({ style, chartData, type }) => {
  const echartRef = useRef();
  let echartObj = useRef(null);
  useEffect(() => {
    let options;
    echartObj.current = echarts.init(echartRef.current);
    if (type === "bar") {
      axisOptionBar.xAxis.data = chartData.xData;
      axisOptionBar.series = chartData.series;
      axisOptionBar.title = chartData.title
      options = axisOptionBar;
      echartObj.current.setOption(options);
    } else {
      axisOptionSca.series = chartData.series;
      axisOptionSca.title = chartData.title
      options = axisOptionSca;
      echartObj.current.setOption(options);
    }
  }, [chartData, type]);

  return <div style={style} ref={echartRef}></div>;
};

export default ECharts;

import React from "react";
import { Line } from "@ant-design/plots";

// 封装
const MyLine = ({ values, title, yTitle }) => {
  const config = {
    title: {
      title: title,
      style: {
        titleFill: "black",
        align: "left",
      },
    },
    data: {
      value: values,
    },
    axis: {
      x: {
        line: true,
      },
      y: {
        line: true,
        title: yTitle
      },
    },
    xField: "x",
    yField: "value",
    sizeField: "value",
    shapeField: "trail",
    legend: { size: false },
    colorField: "name",
  };
  return <Line {...config} />;
};

export default MyLine;

import React from 'react';
import { Line } from "@ant-design/plots"

const DemoLine = ({ values }) => {
    const config = {
      data: {
        value: values,
      },
      xField: 'x',
      yField: 'value',
      sizeField: 'value',
      shapeField: 'trail',
      legend: { size: false },
      colorField: 'name',
    };
    return <Line {...config} />;
  };

export default DemoLine
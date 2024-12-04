import React, { useEffect, useState } from "react";
import { getIconByName } from "../../../config/header";

import "./title.css";
import { SearchOutlined } from "@ant-design/icons";
import { ConfigProvider, Input } from "antd";

const titleStyle = {
  paddingLeft: 16,
  paddingRight: 16,
  // width: 1536,
  margin: "auto",
  display: "flex",
  justifyContent: "space-between",
};

const PerfTitle = ({ title }) => {
  const [isSpinning, setIsSpinning] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSpinning(false);
    }, 1000); // 假设旋转一圈需要 1 秒
    return () => clearTimeout(timer);
  }, []);
  return (
    <div style={{ borderBottom: "1px solid #e5e7eb", height: 112 }}>
      <div style={titleStyle} className="width-resp">
        <div style={{ width: 512 }}>
          <h1 style={{ color: title.color[5] }}>
            {getIconByName(title.iconName, isSpinning)} {title.name}
          </h1>
          <p style={{ color: "rgb(107, 114, 128)", fontWeight: 600 }}>
            {title.desc}
          </p>
        </div>
        <div style={{ display: "flex" }}>
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  activeBorderColor: title.color[5],
                  hoverBorderColor: title.color[5],
                },
                Button: {
                  defaultHoverBorderColor: title.color[5],
                  defaultHoverColor: title.color[5],
                },
              },
              token: {
                colorPrimary: title.color[5],
                colorPrimaryHover: title.color[4],
              },
            }}
          >
            <Input
              placeholder={`搜索${title.name}`}
              // value={value}
              // onChange={handleChange}
              prefix={<SearchOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              style={{
                borderRadius: 16,
                width: 400,
                marginTop: "auto",
                marginBottom: 14,
              }}
              // size="large"
              allowClear
            />  
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default PerfTitle;

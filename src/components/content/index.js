import React from "react";

import { Layout } from "antd";
import { Outlet } from "react-router-dom";
const { Content } = Layout;
const contentStyle = {
  
  minHeight: "calc(100vh - 128px)",
  //   lineHeight: "120px",

  backgroundColor: "white",
  overflowY: "auto",
  borderBottom: "1px solid #e5e7eb",
  // height: "calc(100vh - 128px)",
};

const HomeContent = () => {
  return (
    <Content style={contentStyle}>
      <Outlet/>
    </Content>
  );
};

export default HomeContent;

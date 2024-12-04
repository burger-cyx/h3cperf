import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;

const footerStyle = {
  textAlign: "center",
  color: "black",
  backgroundColor: "white",
  height: 64,
//   position: "absolute"
};

const HomeFooter = () => {
  return (
    <Footer style={footerStyle}>
      <code>
        H3C Cloud AI ©{new Date().getFullYear()} Created by 云与大数据测试部
      </code>
    </Footer>
  );
};

export default HomeFooter;

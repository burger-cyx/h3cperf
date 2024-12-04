import React from "react";

import { Layout } from "antd";

import HomeFooter from "../components/footer";
import HomeHeader from "../components/header";
import HomeContent from "../components/content";

const layoutStyle = {
  //   borderRadius: 8,
  overflow: "hidden",
};
const Main = () => {
  return (
    <Layout style={layoutStyle}>
      <HomeHeader></HomeHeader>
      <HomeContent></HomeContent>
      <HomeFooter></HomeFooter>
    </Layout>
  );
};

export default Main;

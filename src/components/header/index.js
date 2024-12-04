import React, { useState } from "react";
import { Flex, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { buttonList, getIconByName } from "../../config/header";

const { Header } = Layout;

const headerStyle = {
  textAlign: "center",
  color: "black",
  height: 64,
  backgroundColor: "#fff",
  borderBottom: "1px solid #e5e7eb",
  padding: 0,
};

const navigateDiv = {
  paddingLeft: 16,
  paddingRight: 16,
  margin: "auto",
  display: "flex",
  justifyContent: "space-between",
};

const HomeHeader = () => {
  const navigate = useNavigate();
  // 按钮的 hover 初始状态
  const initHoverState = [false, false, false, false];
  const [isHovered, setHovered] = useState(initHoverState);
  const setHover = (index) => {
    const newHoverState = initHoverState.map((value, idx) => {
      if (idx === index) {
        return true;
      }
      return value;
    });
    setHovered(newHoverState);
  };
  const navigateTo = (btn) => {
    // 传递颜色给下一个路由页面
    navigate(btn.url);
  };
  return (
    <Header style={headerStyle}>
      <div style={navigateDiv} className="width-resp">
        <div>
          <span style={{ fontWeight: "bold", fontSize: 18 }}>
            H3C Cloud AI 测试平台
          </span>
        </div>
        <div>
          <Flex wrap gap={32}>
            {buttonList.map((btn, index) => (
              <span
                key={btn.name}
                style={{
                  color: isHovered[index] ? btn.color.primary : "black",
                  transition: "color 0.3s ease",
                  cursor: "pointer",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
                onMouseOver={() => setHover(index)}
                onMouseLeave={() => setHovered(initHoverState)}
                onClick={() => navigateTo(btn)}
              >
                {getIconByName(btn.iconName, false)} {btn.name}
              </span>
            ))}
          </Flex>
        </div>
      </div>
    </Header>
  );
};

export default HomeHeader;

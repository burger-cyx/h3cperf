import React, { useState } from "react";
import { Row, Col, Tag, Flex, Dropdown } from "antd";

import {
  EllipsisOutlined,
} from "@ant-design/icons";

import "./content.css";
import { useNavigate } from "react-router-dom";

const content = {
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 32,
  paddingBottom: 32,
  // width: 1536,
  margin: "auto",
  height: "calc(100% - 160px)",
};

const gradientStyle = (colors) => {
  return {
    background: `linear-gradient(to bottom right, ${colors[0]}, ${colors[1]})`,
    height: 160,
    padding: 16,
    borderRadius: 8,
  };
};

function getRandomPair(arr) {
  if (arr.length < 2) {
    throw new Error("Array must have at least two elements");
  }
  // 生成两个不重复的随机索引
  let index1 = Math.floor(Math.random() * arr.length);
  let index2 = index1;
  while (index2 === index1) {
    index2 = Math.floor(Math.random() * arr.length);
  }
  // 返回包含两个随机元素的数组
  return [arr[index1], arr[index2]];
}
const colorList = [
  "rgb(220, 38, 38)",
  "rgb(217, 119, 6)",
  "rgb(219, 39, 119)",
  "rgb(124, 58, 237)",
  "rgb(79, 70, 229)",
  "rgb(37, 99, 235)",
];
const formatDate = (rawDate) => {
  const date = new Date(rawDate);
  return date.toISOString().split("T")[0];
};
const statusIcon = (status) => {
  const IconMap = {
    FINISHED: (
      <Tag style={{ marginRight: 0 }} color="green">
        可用
      </Tag>
    ),
    RUNNING: (
      <Tag style={{ marginRight: 0 }} color="processing">
        下载中
      </Tag>
    ),
    FAILED: (
      <Tag style={{ marginRight: 0 }} color="default">
        不可用
      </Tag>
    ),
  };
  return IconMap[status];
};

const PerfContent = ({ data, title }) => {
  const navigate = useNavigate()
  // const [menuKey, setMenuKey] = useState("")
  const handleMenuClick = (e) => {
    // 记录激活的按钮的 key
    // console.log("e", e)
    // console.log("tplId", tplId && tplId)
    // console.log("tplName", tplName && tplName)
    // console.log("tplTag", tplTag && tplTag)
    // console.log("navi", "/task" + title.url + e.key + "?tpl_id=" + tplId + "&tpl_name=" + tplName + "&tpl_tag=" + tplTag)
    navigate("/task" + title.url + e.key + "?tpl_id=" + tplId + "&tpl_name=" + tplName + "&tpl_tag=" + tplTag)
  };
  const items = [
    {
      label: "创建任务",
      key: "/add",
    },
    {
      label: "查看任务",
      key: "/list",
    },
  ];
  const menu = {
    items,
    onClick: handleMenuClick,
  };
  const [tplId, setTplId] = useState(null);
  const [tplName, setTplName] = useState(null);
  const [tplTag, setTplTag] = useState(null);
  const handleVisibleChange = (visible, id, name, tag) => {
    if (visible) {
      setTplId(id);
      setTplName(name)
      setTplTag(tag)
    }
  };
  return (
    <div style={content} className="width-resp">
      <Row gutter={[16, 32]}>
        {data.items && data.items.map((item, index) => (
            <Col span={6} key={index}>
              <div>
                <div style={gradientStyle(getRandomPair(colorList))}>
                  <div
                    style={{
                      color: "white",
                      fontWeight: 600,
                      height: 16,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>{item.name}</span>
                      {/* 需要处理识别点击的是哪个模板的 dropdown  */}
                    <Dropdown 
                    key={item.id} 
                    menu={menu} 
                    onOpenChange={(visible) => handleVisibleChange(visible, item.id, item.name, item.tag)}
                    placement="bottomRight">
                      <EllipsisOutlined className="my-icon"/>
                    </Dropdown>
                  </div>
                  <div
                    style={{
                      height: 96,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {`${item.name}${title.name}专用模版`}
                    </span>
                  </div>
                  <div style={{ height: 16 }}></div>
                </div>

                <Flex
                  gap="4px 4px"
                  wrap
                  style={{ marginTop: 4 }}
                  justify="space-between"
                >
                  <Tag color="magenta">{formatDate(item.created_at)} 创建</Tag>
                  {statusIcon("FINISHED")}
                </Flex>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default PerfContent;

import React from "react";
import {
  Row,
  Col,
  Tag,
  Flex,
} from "antd";

import {
  DeleteOutlined,
} from "@ant-design/icons";

import "./content.css";

const content = {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    paddingBottom: 32,
    // width: 1536,
    margin: "auto",
    // height: "calc(100% - 160px)",
  };

  const gradientStyle = (colors) => {
    return {
      background: `linear-gradient(to bottom right, ${colors[0]}, ${colors[1]})`,
      height: 128,
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

const DataContent = ({ data }) => {
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
                      <DeleteOutlined className="my-icon" />
                    </div>
                    <div
                      style={{
                        height: 64,
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
                        {item.repo}
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
                    <Tag color="magenta">
                      {formatDate(item.created_at)} 创建
                    </Tag>
                    {statusIcon(item.status)}
                  </Flex>
                </div>
              </Col>
            ))}
          </Row>
        </div>
    )
}

export default DataContent
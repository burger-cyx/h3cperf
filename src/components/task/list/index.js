import React, { useEffect, useState } from "react";
import { getIconByName } from "../../../config/header";

import "./index.css";
import {
  DeleteOutlined,
  PlayCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Flex, Input, Pagination, Table } from "antd";
import getColumnPropsByType from "../../../config/task";
import { useNavigate } from "react-router-dom";


const titleStyle = {
  paddingLeft: 16,
  paddingRight: 16,
  // width: 1536,
  margin: "auto",
  display: "flex",
  justifyContent: "space-between",
};

const TaskListTitle = ({ title }) => {
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

const content = {
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 32,
  paddingBottom: 32,
  // width: 1536,
  margin: "auto",
  height: "calc(100% - 110px)",
};

const TaskListContent = ({ tplInfo, fetchTask, runTask, deleteTask, tableData, total }) => {
  const navigate = useNavigate();
  const openReport = (record) => {
    console.log("xxxxx", record);
    navigate("/report/" + tplInfo.tag +  "/get?report_id=" + record.id + "&tpl_id=" + tplInfo.id + "&tpl_name=" + tplInfo.name);
  };
  // 从 url 解析得到的模版名称筛选得到 对应任务列表的列结构
  // 基于实际数据修改列结构
  const basicColumn = getColumnPropsByType(tplInfo.tag, tplInfo.name)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const pageChange = (page) => {
    fetchTask(page);
  };
  const deleteSelected = (selected) => {
    // 删除任务后需要刷新勾选
    deleteTask(selected)
    setSelectedRowKeys([]);
  }
  const runSelected = (selected) => {
    // 启动任务后需要刷新勾选
    runTask(selected)
    setSelectedRowKeys([]);
  }
  const hasSelected = selectedRowKeys.length > 0;
  const actionColumn = [
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <>
          <Flex gap="small" wrap>
            <Button
              type="primary"
              size="small"
              onClick={() => openReport(record)}
              disabled={record.status !== "FINISHED"}
            >
              查看报告
            </Button>
          </Flex>
        </>
      ),
    },
  ];
  return (
    <div style={content} className="width-resp">
      <div style={{height: "calc(100% - 50px)"}}>
        <Flex gap="middle" vertical>
          <Table
            rowSelection={rowSelection}
            columns={[...basicColumn, ...actionColumn]}
            dataSource={tableData}
            rowKey="id"
            defaultColumn={{
              align: "center",
            }}
            pagination={false}
          />
        </Flex>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {hasSelected && (
              <Flex
                align="center"
                gap="middle"
                style={{
                  padding: 8,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "rgb(107, 114, 128)",
                  borderRadius: 10,
                  width: 350,
                  boxShadow: "2px 2px 10px  rgba(0, 0, 0, 0.3)",
                }}
              >
                <Button
                  type="primary"
                  onClick={() => deleteSelected(selectedRowKeys)}
                  disabled={!hasSelected}
                  danger
                  icon={<DeleteOutlined />}
                >
                  删除任务
                </Button>
                <Button
                  type="primary"
                  onClick={() => runSelected(selectedRowKeys)}
                  disabled={!hasSelected}
                  icon={<PlayCircleOutlined />}
                >
                  启动任务
                </Button>
                <span style={{ fontWeight: "bold" }}>
                  {hasSelected ? `选中 ${selectedRowKeys.length} 项` : null}
                </span>
              </Flex>
            )}
          </div>
          <Pagination
            style={{marginTop: 16}}
            total={total}
            showTotal={(total) => `共 ${total} 项`}
            defaultPageSize={10}
            defaultCurrent={1}
            onChange={pageChange}
          ></Pagination>
        </div>
    </div>
  );
};

export { TaskListTitle, TaskListContent };

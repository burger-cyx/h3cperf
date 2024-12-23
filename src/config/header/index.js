import React from "react";
import {
  BulbOutlined,
  ProjectOutlined,
  DatabaseOutlined,
  HourglassOutlined,
} from "@ant-design/icons";
import { orange, green, blue, volcano } from "@ant-design/colors";

const getIconByName = (name, isSpin) => {
  const icons = {
    ProjectOutlined: <ProjectOutlined spin={isSpin} />,
    DatabaseOutlined: <DatabaseOutlined spin={isSpin} />,
    BulbOutlined: <BulbOutlined spin={isSpin} />,
    HourglassOutlined: <HourglassOutlined spin={isSpin} />,
  };
  return icons[name];
};

const buttonList = [
  {
    name: "模型",
    url: "/model",
    className: "model",
    iconName: "ProjectOutlined",
    color: volcano,
    desc: "支持添加LLM大模型 & 传统模型; 支持HF远程模型 & 本地模型",
  },
  {
    name: "数据集",
    url: "/dataset",
    className: "dataset",
    iconName: "DatabaseOutlined",
    color: orange,
    desc: "支持添加HF远程数据集 & 本地数据集",
  },
  {
    name: "推理",
    url: "/infer",
    className: "infer",
    iconName: "BulbOutlined",
    color: green,
    desc: "支持常用LLM大模型 & 传统模型(yolo / resnet / bert) 推理性能验证",
  },
  {
    name: "训练",
    url: "/train",
    className: "train",
    iconName: "HourglassOutlined",
    color: blue,
    desc: "支持常用LLM大模型 & 传统模型(yolo / resnet / bert) 训练性能验证",
  },
];

const getBtnByName = (name) => {
  const button = buttonList.find((btn) => btn.name === name);
  return button || null; // 如果没有找到，返回null
};

const menuList = [
  {
    name: "推理任务列表",
    url: "/task/infer/list",
    className: "train",
    iconName: "BulbOutlined",
    color: green,
    desc: "推理性能测试 & 任务列表数据展示",
  },
  {
    name: "训练任务列表",
    url: "/task/train/list",
    className: "train",
    iconName: "HourglassOutlined",
    color: blue,
    desc: "推理性能测试 & 任务列表数据展示",
  },
  {
    name: "推理任务创建",
    url: "/task/infer/add",
    className: "infer",
    iconName: "BulbOutlined",
    color: green,
    desc: "创建性能测试任务",
  },
  {
    name: "训练任务创建",
    url: "/task/train/add",
    className: "train",
    iconName: "HourglassOutlined",
    color: blue,
    desc: "创建性能测试任务",
  },
  {
    name: "推理任务报告",
    url: "/task/infer/list",
    className: "infer",
    iconName: "BulbOutlined",
    color: green,
    desc: "推理性能测试数据 & 图表展示",
  },
  {
    name: "训练任务报告",
    url: "/task/train/list",
    className: "train",
    iconName: "HourglassOutlined",
    color: blue,
    desc: "训练性能测试数据 & 图表展示",
  },
]

const getMenuByName = (name) => {
  const button = menuList.find((btn) => btn.name === name);
  return button || null; // 如果没有找到，返回null
};



export { getIconByName, buttonList, getBtnByName, menuList, getMenuByName };

// 定义任务列表的列结构
import React from "react";
import {
  SyncOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";

const renderStatus = (status) => {
  const statusMap = {
    RUNNING: (
      <Tag  icon={<SyncOutlined spin />} color="processing">
        执行中
      </Tag>
    ),
    FINISHED: (
      <Tag icon={<CheckCircleOutlined />} color="success">
        已完成
      </Tag>
    ),
    FAILED: (
      <Tag  width={100} icon={<ExclamationCircleOutlined />} color="error">
        已失败
      </Tag>
    )
  };
  if (status === null) {
    return (
      <Tag icon={<InfoCircleOutlined />} color="warning">
        未执行
      </Tag>
    );
  } else {
    return statusMap[status];
  }
};

const getColumnPropsByType = (tplTag, tplName) => {
  const columns = {
    infer: {
      LLM: [
        {
          title: "任务名称",
          dataIndex: "name",
          key: "name",
          align: "center"
        },
        {
          title: "模型",
          dataIndex: "model",
          key: "model",
          align: "center"
        },
        {
          title: "数据集",
          dataIndex: "dataset",
          key: "dataset",
          align: "center"
        },
        {
          title: "测试时间",
          dataIndex: ["config", "max_seconds"],
          key: "max_seconds",
          align: "center"
        },
        {
          title: "请求策略",
          dataIndex: ["config", "rate_type"],
          key: "rate_type",
          align: "center"
        },
        {
          title: "最大请求速率",
          dataIndex: ["config", "max_rate"],
          key: "max_rate",
          align: "center"
        },
        {
          title: "精度",
          dataIndex: ["config", "dtype"],
          key: "dtype",
          align: "center"
        },
        {
          title: "部署方式",
          dataIndex: ["config", "distributed_type"],
          key: "distributed_type",
          align: "center"
        },
        {
          title: "显卡数量",
          dataIndex: ["config", "gpus"],
          key: "gpus",
          align: "center",
          render: (_, record) => (record.config.distributed_type === "单机单卡" ? "——" : record.config.gpus)
        },
        {
          title: "显存占比",
          dataIndex: ["config", "gpu_memory_ratio"],
          key: "gpu_memory_ratio",
          align: "center"
        },
        {
          title: "任务状态",
          dataIndex: "status",
          key: "status",
          render: (_, record) => (renderStatus(record.status)),
          align: "center"
        },
      ],
      Bert: [
        {
          title: "任务名称",
          dataIndex: "name",
          key: "name",
          align: "center"
        },
        {
          title: "模型",
          dataIndex: "model",
          key: "model",
          align: "center"
        },
        {
          title: "数据集",
          dataIndex: "dataset",
          key: "dataset",
          align: "center"
        },
        {
          title: "测试时间",
          dataIndex: ["config", "max_seconds"],
          key: "max_seconds",
          align: "center"
        },
        {
          title: "请求策略",
          dataIndex: ["config", "rate_type"],
          key: "rate_type",
          align: "center"
        },
        {
          title: "最大请求速率",
          dataIndex: ["config", "max_rate"],
          key: "max_rate",
          align: "center"
        },
        {
          title: "精度",
          dataIndex: ["config", "dtype"],
          key: "dtype",
          align: "center"
        },
        {
          title: "部署方式",
          dataIndex: ["config", "distributed_type"],
          key: "distributed_type",
          align: "center"
        },
        {
          title: "显卡数量",
          dataIndex: ["config", "gpus"],
          key: "gpus",
          align: "center",
          render: (_, record) => (record.config.distributed_type === "单机单卡" ? "——" : record.config.gpus)
        },
        {
          title: "显存占比",
          dataIndex: ["config", "gpu_memory_ratio"],
          key: "gpu_memory_ratio",
          align: "center"
        },
        {
          title: "任务状态",
          dataIndex: "status",
          key: "status",
          render: (_, record) => (renderStatus(record.status)),
          align: "center"
        },
      ],
      Resnet: [
        {
          title: "任务名称",
          dataIndex: "name",
          key: "name",
          align: "center"
        },
        {
          title: "模型",
          dataIndex: "model",
          key: "model",
          align: "center"
        },
        {
          title: "数据集",
          dataIndex: "dataset",
          key: "dataset",
          align: "center"
        },
        {
          title: "测试时间",
          dataIndex: ["config", "max_seconds"],
          key: "max_seconds",
          align: "center"
        },
        {
          title: "请求策略",
          dataIndex: ["config", "rate_type"],
          key: "rate_type",
          align: "center"
        },
        {
          title: "最大请求速率",
          dataIndex: ["config", "max_rate"],
          key: "max_rate",
          align: "center"
        },
        {
          title: "精度",
          dataIndex: ["config", "dtype"],
          key: "dtype",
          align: "center"
        },
        {
          title: "部署方式",
          dataIndex: ["config", "distributed_type"],
          key: "distributed_type",
          align: "center"
        },
        {
          title: "显卡数量",
          dataIndex: ["config", "gpus"],
          key: "gpus",
          align: "center",
          render: (_, record) => (record.config.distributed_type === "单机单卡" ? "——" : record.config.gpus)
        },
        {
          title: "显存占比",
          dataIndex: ["config", "gpu_memory_ratio"],
          key: "gpu_memory_ratio",
          align: "center"
        },
        {
          title: "任务状态",
          dataIndex: "status",
          key: "status",
          render: (_, record) => (renderStatus(record.status)),
          align: "center"
        },
      ],
      Yolo: [
        {
          title: "任务名称",
          dataIndex: "name",
          key: "name",
          align: "center"
        },
        {
          title: "模型",
          dataIndex: "model",
          key: "model",
          align: "center"
        },
        {
          title: "数据集",
          dataIndex: "dataset",
          key: "dataset",
          align: "center"
        },
        {
          title: "测试时间",
          dataIndex: ["config", "max_seconds"],
          key: "max_seconds",
          align: "center"
        },
        {
          title: "请求策略",
          dataIndex: ["config", "rate_type"],
          key: "rate_type",
          align: "center"
        },
        {
          title: "最大请求速率",
          dataIndex: ["config", "max_rate"],
          key: "max_rate",
          align: "center"
        },
        {
          title: "精度",
          dataIndex: ["config", "dtype"],
          key: "dtype",
          align: "center"
        },
        {
          title: "部署方式",
          dataIndex: ["config", "distributed_type"],
          key: "distributed_type",
          align: "center"
        },
        {
          title: "显卡数量",
          dataIndex: ["config", "gpus"],
          key: "gpus",
          align: "center",
          render: (_, record) => (record.config.distributed_type === "单机单卡" ? "——" : record.config.gpus)
        },
        {
          title: "显存占比",
          dataIndex: ["config", "gpu_memory_ratio"],
          key: "gpu_memory_ratio",
          align: "center"
        },
        {
          title: "任务状态",
          dataIndex: "status",
          key: "status",
          render: (_, record) => (renderStatus(record.status)),
          align: "center"
        },
      ],
      "Stable Diffusion": [
        {
          title: "任务名称",
          dataIndex: "name",
          key: "name",
          align: "center"
        },
        {
          title: "模型",
          dataIndex: "model",
          key: "model",
          align: "center"
        },
        {
          title: "数据集",
          dataIndex: "dataset",
          key: "dataset",
          align: "center"
        },
        {
          title: "测试时间",
          dataIndex: ["config", "max_seconds"],
          key: "max_seconds",
          align: "center"
        },
        {
          title: "请求策略",
          dataIndex: ["config", "rate_type"],
          key: "rate_type",
          align: "center"
        },
        {
          title: "最大请求速率",
          dataIndex: ["config", "max_rate"],
          key: "max_rate",
          align: "center"
        },
        {
          title: "精度",
          dataIndex: ["config", "dtype"],
          key: "dtype",
          align: "center"
        },
        {
          title: "部署方式",
          dataIndex: ["config", "distributed_type"],
          key: "distributed_type",
          align: "center"
        },
        {
          title: "显卡数量",
          dataIndex: ["config", "gpus"],
          key: "gpus",
          align: "center",
          render: (_, record) => (record.config.distributed_type === "单机单卡" ? "——" : record.config.gpus)
        },
        {
          title: "显存占比",
          dataIndex: ["config", "gpu_memory_ratio"],
          key: "gpu_memory_ratio",
          align: "center"
        },
        {
          title: "任务状态",
          dataIndex: "status",
          key: "status",
          render: (_, record) => (renderStatus(record.status)),
          align: "center"
        },
      ],
    },
    train: {
      LLM: [
        {
          title: "任务名称",
          dataIndex: "name",
          key: "name",
          align: "center",
        },
        {
          title: "模型",
          dataIndex: "model",
          key: "model",
          align: "center",
        },
        {
          title: "数据集",
          dataIndex: "dataset",
          key: "dataset",
          align: "center",
        },
        {
          title: "部署方式",
          dataIndex: ["config", "distributed_type"],
          key: "distributed_type",
          align: "center",
        },
        {
          title: "显卡数量",
          dataIndex: ["config", "gpus"],
          key: "gpus",
          align: "center",
          render: (_, record) => (record.config.distributed_type === "单机单卡" ? "——" : record.config.gpus)
        },
        {
          title: "混合精度",
          dataIndex: ["config", "mixed_precision"],
          key: "mixed_precision",
          align: "center",
        },
        {
          title: "训练阶段",
          dataIndex: ["config", "stage"],
          key: "stage",
          align: "center",
        },
        {
          title: "微调方式",
          dataIndex: ["config", "type"],
          key: "type",
          align: "center",
        },
        {
          title: "epochs",
          dataIndex: ["config", "epochs"],
          key: "epochs",
          align: "center",
        },
        {
          title: "deepspeed优化阶段",
          dataIndex: ["config", "zero_stage"],
          key: "zero_stage",
          align: "center",
          render: (_, record) => (record.config.distributed_type === "单机单卡" ? "——" : record.config.zero_stage)
        },
        {
          title: "任务状态",
          render: (_, record) => renderStatus(record.status),
          key: "status",
          align: "center",
        },
      ],
      Bert: [
        {
          title: "任务名称",
          dataIndex: "name",
          key: "name",
          align: "center",
        },
        {
          title: "模型",
          dataIndex: "model",
          key: "model",
          align: "center",
        },
        {
          title: "数据集",
          dataIndex: "dataset",
          key: "dataset",
          align: "center",
        },
        {
          title: "部署方式",
          dataIndex: ["config", "distributed_type"],
          key: "distributed_type",
          align: "center",
        },
        {
          title: "显卡数量",
          dataIndex: ["config", "gpus"],
          key: "gpus",
          align: "center",
          render: (_, record) => (record.config.distributed_type === "单机单卡" ? "——" : record.config.gpus)
        },
        {
          title: "混合精度",
          dataIndex: ["config", "mixed_precision"],
          key: "mixed_precision",
          align: "center",
        },
        {
          title: "epochs",
          dataIndex: ["config", "epochs"],
          key: "epochs",
          align: "center",
        },
        {
          title: "deepspeed优化阶段",
          dataIndex: ["config", "zero_stage"],
          key: "zero_stage",
          align: "center",
          render: (_, record) => (record.config.distributed_type === "单机单卡" ? "——" : record.config.zero_stage)
        },
        {
          title: "任务状态",
          render: (_, record) => renderStatus(record.status),
          key: "status",
          align: "center",
        },
      ],
      Resnet: [
        {
          title: "任务名称",
          dataIndex: "name",
          key: "name",
          align: "center",
        },
        {
          title: "模型",
          dataIndex: "model",
          key: "model",
          align: "center",
        },
        {
          title: "数据集",
          dataIndex: "dataset",
          key: "dataset",
          align: "center",
        },
        {
          title: "部署方式",
          dataIndex: ["config", "distributed_type"],
          key: "distributed_type",
          align: "center",
        },
        {
          title: "显卡数量",
          dataIndex: ["config", "gpus"],
          key: "gpus",
          align: "center",
          render: (_, record) => (record.config.distributed_type === "单机单卡" ? "——" : record.config.gpus)
        },
        {
          title: "混合精度",
          dataIndex: ["config", "mixed_precision"],
          key: "mixed_precision",
          align: "center",
        },
        {
          title: "epochs",
          dataIndex: ["config", "epochs"],
          key: "epochs",
          align: "center",
        },
        {
          title: "deepspeed优化阶段",
          dataIndex: ["config", "zero_stage"],
          key: "zero_stage",
          align: "center",
          render: (_, record) => (record.config.distributed_type === "单机单卡" ? "——" : record.config.zero_stage)
        },
        {
          title: "任务状态",
          render: (_, record) => renderStatus(record.status),
          key: "status",
          align: "center",
        },
      ],
      Yolo: [
        {
          title: "任务名称",
          dataIndex: "name",
          key: "name",
          align: "center",
        },
        {
          title: "模型",
          dataIndex: "model",
          key: "model",
          align: "center",
        },
        {
          title: "数据集",
          dataIndex: "dataset",
          key: "dataset",
          align: "center",
        },
        {
          title: "部署方式",
          dataIndex: ["config", "distributed_type"],
          key: "distributed_type",
          align: "center",
        },
        {
          title: "显卡数量",
          dataIndex: ["config", "gpus"],
          key: "gpus",
          align: "center",
          render: (_, record) => (record.config.distributed_type === "单机单卡" ? "——" : record.config.gpus)
        },
        {
          title: "epochs",
          dataIndex: ["config", "epochs"],
          key: "epochs",
          align: "center",
        },
        {
          title: "任务状态",
          render: (_, record) => renderStatus(record.status),
          key: "status",
          align: "center",
        },
      ],
    },
  };
  return columns[tplTag][tplName];
};

export default getColumnPropsByType;

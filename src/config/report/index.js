// 定义报告的列结构

const getReportColumnPropsByType = (tplTag, tplName) => {
  const columns = {
    infer: {
      LLM: [
        {
          title: "benchmark",
          dataIndex: "mode",
          key: "mode",
          align: "center",
          render: (_, record) => record.rate === null ? record.mode : record.mode + "@" + record.rate.toFixed(2)
      },
      {
        title: "平均请求数(rps)",
        dataIndex: "rps",
        key: "rps",
        align: "center",
        render: (_, record) => record.rps.toFixed(2)
      },
      {
        title: "平均请求时延(ms)",
        dataIndex: "latency",
        key: "latency",
        render: (_, record) => record.latency.toFixed(2),
        align: "center",
      },
      {
        title: "平均首Toekn时延(ms)",
        dataIndex: "ttft",
        key: "ttft",
        render: (_, record) => record.ttft.toFixed(2),
        align: "center",
      },
      {
        title: "平均Token间时延(ms)",
        dataIndex: "itl",
        key: "itl",
        render: (_, record) => record.itl.toFixed(2),
        align: "center",
      },
      {
        title: "吞吐率",
        dataIndex: "throughput",
        key: "throughput",
        render: (_, record) => record.throughput.toFixed(2),
        align: "center",
      },
      ],
      Bert: [
        {
          title: "benchmark",
          dataIndex: "mode",
          key: "mode",
          align: "center",
          render: (_, record) => record.rate === null ? record.mode : record.mode + "@" + record.rate.toFixed(2)
      },
      {
        title: "平均请求数",
        dataIndex: "rps",
        key: "rps",
        align: "center",
        render: (_, record) => record.rps.toFixed(2)
      },
      {
        title: "平均请求时延(s)",
        dataIndex: "latency",
        key: "latency",
        render: (_, record) => record.latency.toFixed(2),
        align: "center",
      },
      ],
      Resnet: [
        {
          title: "benchmark",
          dataIndex: "mode",
          key: "mode",
          align: "center",
          render: (_, record) => record.rate === null ? record.mode : record.mode + "@" + record.rate.toFixed(2)
      },
      {
        title: "平均请求数",
        dataIndex: "rps",
        key: "rps",
        align: "center",
        render: (_, record) => record.rps.toFixed(2)
      },
      {
        title: "平均请求时延(s)",
        dataIndex: "latency",
        key: "latency",
        render: (_, record) => record.latency.toFixed(2),
        align: "center",
      },
      ],
      Yolo: [
        {
          title: "benchmark",
          dataIndex: "mode",
          key: "mode",
          align: "center",
          render: (_, record) => record.rate === null ? record.mode : record.mode + "@" + record.rate.toFixed(2)
      },
      {
        title: "平均请求数",
        dataIndex: "rps",
        key: "rps",
        align: "center",
        render: (_, record) => record.rps.toFixed(2)
      },
      {
        title: "平均请求时延(s)",
        dataIndex: "latency",
        key: "latency",
        render: (_, record) => record.latency.toFixed(2),
        align: "center",
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
        },
      ],
    },
  };
  return columns[tplTag][tplName];
};

export default getReportColumnPropsByType;

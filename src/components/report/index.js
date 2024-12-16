import React, { useEffect, useState } from "react";
import { getIconByName } from "../../config/header";

import "./index.css";
import { Button, Col, Descriptions, Row, Table } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getTrainTaskById, inferReportGet, trainReportGet } from "../../api";
import ECharts from "../ECharts";
import getReportColumnPropsByType from "../../config/report/index"
import DemoLine from "../antdChart";
import { values } from "@ant-design/plots/es/core/utils";

const titleStyle = {
  paddingLeft: 16,
  paddingRight: 16,
  // width: 1536,
  margin: "auto",
  display: "flex",
  justifyContent: "space-between",
};

const ReportTitle = ({ title }) => {
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
  // height: "calc(100% - 110px)",
};
const env = [
  {
    key: "1",
    label: "GPU型号",
    children: "NVIDIA RTX 3080",
  },
  {
    key: "2",
    label: "GPU显存大小",
    children: "10GB",
  },
  {
    key: "3",
    label: "CPU型号",
    children: "Intel Core i9",
  },
  {
    key: "4",
    label: "内存大小",
    children: "64GB",
  },
  {
    key: "5",
    label: "操作系统版本",
    children: "Windows 10",
  },
  {
    key: "6",
    label: "Python版本",
    children: "3.8",
  },
];
const InferReportContent = () => {
  const [search] = useSearchParams();
  const tplId = search.get("tpl_id");
  const reportId = search.get("report_id");
  const tplName = search.get("tpl_name");

  const navigate = useNavigate();
  const backToTaskList = () => {
    navigate(
      "/task/infer/list?tpl_tag=infer&tpl_id=" + tplId + "&tpl_name=" + tplName
    );
  };

  useEffect(() => {
    // 初始化渲染
    inferReportGet(reportId).then(({ data }) => {
      // 新获取 template_id
      setResult(data)
      // 处理请求参数的展示数据
      const params = {
        total_count: "请求总数",
        ok_count: "成功数",
        rate: "请求速率",
        duration: "测试时长",
      };
      const res = Object.keys(params).map((key, index) => {
        const values = data[key] ? parseFloat(data[key].toFixed(2)) : data[key];
        return {
          key: (index + 1).toString(),
          label: params[key],
          children: values,
        };
      });
      setParam(res);
      // 重新构造图表结构
      const xField = ["1%", "5%", "10%", "50%", "90%", "95%", "99%"]
      const datas = data.flatMap(item => {
        // 使用空格分割data字符串，得到一个数组
        const dataValues = item.latency_p.split(",");
        // 构造新的对象数组
        return dataValues.map(dataValue => ({
          name: item.rate === null ? item.mode : item.mode + "@" + item.rate.toFixed(2),
          value: parseFloat(parseFloat(dataValue).toFixed(2)),
          x: xField[dataValues.indexOf(dataValue)]
        }));
      });
      console.log("datas", datas)
      setEchartData(datas)
      // setEchartData([
      //   {
      //     title: {
      //       text: "请求时延",
      //     },
      //     xData: ["1%", "5%", "10%", "50%", "90%", "95%", "99%"],
      //     series: {
      //       data: data.latency_p
      //         .split(",")
      //         .map((item) => parseFloat(item).toFixed(2)),
      //       type: "bar",
      //     },
      //   },
      //   {
      //     title: {
      //       text: "首Token时延",
      //     },
      //     xData: ["1%", "5%", "10%", "50%", "90%", "95%", "99%"],
      //     series: {
      //       data: data.ttft_p
      //         .split(",")
      //         .map((item) => parseFloat(item).toFixed(2)),
      //       type: "bar",
      //     },
      //   },
      //   {
      //     title: {
      //       text: "Token间时延",
      //     },
      //     xData: ["1%", "5%", "10%", "50%", "90%", "95%", "99%"],
      //     series: {
      //       data: data.itl_p
      //         .split(",")
      //         .map((item) => parseFloat(item).toFixed(2)),
      //       type: "bar",
      //     },
      //   },
      // ]);
    });
  }, [reportId]);
  const [echartData, setEchartData] = useState([]);
  const [result, setResult] = useState([]);
  const [param, setParam] = useState([]);
  //   const [tplId, setTplId] = useState("");
  // rps: "平均请求数",
  //       latency: "",
  //       ttft: "",
  //       itl: "平均 Token 间时延",
  //       throughput: "吞吐率",
 


  return (
    <div style={content} className="width-resp">
      <div style={{ height: "calc(100% - 50px)" }}>
        <Button type="primary" onClick={backToTaskList}>
          返回
        </Button>
        <div>
          <h1 style={{ color: "red" }}>测试结果</h1>
          {/* <Descriptions
            bordered
            items={result}
            labelStyle={{ fontWeight: "bold" }}
            size="small"
            width={1000}
          /> */}
         
          <Row gutter={32}>
      <Col span={6}> <Table
            columns={getReportColumnPropsByType("infer", tplName)}
            dataSource={result}
            rowKey="id"
            defaultColumn={{
              align: "center",
            }}
            pagination={false}
            size="small"
          /></Col>
      <Col span={18}><DemoLine values={echartData && echartData}/></Col>
    </Row>
        </div>
        <div style={{ marginTop: "40px" }}>
          {/* <Row gutter={40}>
            {echartData &&
              echartData.map((chart) => (
                <Col span={8}>
                  <ECharts
                    style={{ height: "400px", width: "400px" }}
                    chartData={chart}
                    type="bar"
                  />
                </Col>
              ))}
          </Row> */}
        </div>
        <div>
          <h1 style={{ color: "orange" }}>测试参数</h1>
          <Descriptions title="运行环境" bordered items={env} size="small" />
        </div>
        <div style={{ marginTop: "40px" }}>
          <Descriptions title="请求参数" bordered items={param} size="small" />
        </div>
      </div>
    </div>
  );
};

const TrainReportContent = () => {
  const [search] = useSearchParams();
  const tplId = search.get("tpl_id");
  const reportId = search.get("report_id");
  const tplName = search.get("tpl_name");
  const navigate = useNavigate();
  const backToTaskList = () => {
    navigate(
      "/task/train/list?tpl_tag=train&tpl_id=" + tplId + "&tpl_name=" + tplName
    );
  };

  useEffect(() => {
    trainReportGet(reportId).then(({ data }) => {
      const summary = data;
      // 处理测试结果的展示数据
      const result_filter = {
        duration: "训练时长",
        epoch: "epoch",
        load_timing: "模型加载时间",
        samples_per_second: "每秒样本数",
        tokens_per_second: "每秒token数",
        save_timing: "模型保存时间",
      };
      const table = Object.keys(result_filter).map((key, index) => {
        const values = summary[key]
          ? parseFloat(summary[key].toFixed(2))
          : summary[key];
        return {
          key: (index + 1).toString(),
          label: result_filter[key],
          children: values,
        };
      });
      console.log("table", table);
      setResult(table);

      setEchartData({
        title: {
          text: "train/loss",
        },
        series: {
          symbolSize: 20,
          data: data.loss["train/loss"].map((i) => {
            return [i.epoch, i.loss];
          }),
          type: "scatter",
        },
      });
    });

    getTrainTaskById(reportId).then(({ data }) => {
      console.log("getTrainTaskById", data);
      const params = {
        batch_size: "Batch Size",
        gradient_accumulation_steps: "Gradient Accumulation Steps",
        learning_rate: "Learning Rate",
        lr_scheduler_type: "Lr Scheduler Type",
      };
      const res = Object.keys(params).map((key, index) => {
        const values = data.config[key];
        return {
          key: (index + 1).toString(),
          label: params[key],
          children: values,
        };
      });
      setParam(res);
    });
  }, [reportId]);

  const [echartData, setEchartData] = useState({});
  const [result, setResult] = useState([]);
  const [param, setParam] = useState([]);
  return (
    <div style={content} className="width-resp">
      <Button type="primary" onClick={backToTaskList}>
        返回
      </Button>
      <div>
        <h1 style={{ color: "red" }}>测试结果：</h1>
        <Descriptions
          bordered
          items={result}
          labelStyle={{ fontWeight: "bold" }}
          size="small"
        />
      </div>
      <div style={{ marginTop: "40px" }}>
        <Row gutter={40}>
          <Col span={8}>
            <ECharts
              style={{ height: "400px", width: "500px" }}
              chartData={echartData}
            />
          </Col>
        </Row>
      </div>
      <div style={{ marginTop: "40px" }}>
        <h1 style={{ color: "orange" }}>测试参数</h1>
        <Descriptions title="超参" bordered items={param} size="small" />
        <Descriptions title="运行环境" bordered items={env} size="small" />
      </div>
    </div>
  );
};

export { ReportTitle, InferReportContent, TrainReportContent };

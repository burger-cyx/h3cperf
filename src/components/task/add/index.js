import React, { useEffect, useState } from "react";
import { getIconByName } from "../../../config/header";
import "./index.css";
import { Button, Card, Flex, Form, Input, Select } from "antd";
import {
  getDatasetList,
  getEnvList,
  getModelList,
  getTplById,
  inferTaskAdd,
  trainTaskAdd,
} from "../../../api";
import { useNavigate } from "react-router-dom";
import TaskFormItem from "../../myForm";
import FormRender, { useForm } from 'form-render';
import config from "../../../config/config.json"

const { Option } = Select;

const titleStyle = {
  paddingLeft: 16,
  paddingRight: 16,
  // width: 1536,
  margin: "auto",
  display: "flex",
  justifyContent: "space-between",
};

const TaskAddTitle = ({ title }) => {
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
  // height: "calc(100% - 160px)",
};

const InferTaskAddContent = ({ id, name }) => {
  const [form] = Form.useForm();
  const form1 = useForm()
  useEffect(() => {
    // 初始化渲染
    console.log("传入的模版id", id);
    getTplById(id).then(({ data }) => {
      const tpl_config = data;
      setTpl(tpl_config);
      console.log("tpl_config", tpl_config);
      //
      const config = {};
      tpl_config.model.forEach((element) => {
        config[element.name] = element.default;
      });
      tpl_config.request.forEach((element) => {
        config[element.name] = element.default;
      });
      const initialValue = {
        name: "",
        model_id: "",
        dataset_id: "",
        runtime_id: "",
        config: config,
      };
      form.setFieldsValue(initialValue);
    });
    const json = {
      page: 1,
      size: 12,
      filter: {},
      fuzzy: {},
      order: {},
    };
    // 获取模型列表
    getModelList(json).then(({ data }) => {
      const model = data.items.filter((i) => i.status === "FINISHED");
      console.log("model list: ", model);
      setModels(model);
    });
    // 获取数据集列表
    getDatasetList(json).then(({ data }) => {
      const dataset = data.items.filter((i) => i.status === "FINISHED");
      setDatasets(dataset);
    });
    // 获取运行环境列表
    getEnvList().then(({ data }) => {
      const env = data.items;
      setEnvs(env);
    });
  }, [id, form]);
  const [models, setModels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [envs, setEnvs] = useState([]);
  const [tpl, setTpl] = useState({});
  const navigate = useNavigate();
  const onFinish = (values) => {
    //创建任务并跳转到任务列表界面
    const defaultValue = {
      template_id: id,
    };
    console.log("推理任务表单数据 =>", { ...values, ...defaultValue });
    inferTaskAdd({ ...values, ...defaultValue }).then(() => {
      navigate(
        "/task/infer/list?tpl_tag=infer&tpl_id=" + id + "&tpl_name=" + name
      );
    });
  };
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  return (
    <div style={content} className="width-resp">
      {/* <FormRender
      form={form1}
      schema={config}
      labelWidth={200}
      maxWidth={400}
      
    /> */}
      <Form
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
        labelAlign="left"
      >
        <Card
          title="环境配置"
          bordered={true}
          style={{ width: 600, margin: "auto" }}
          hoverable
        >
          <Form.Item
            name="name"
            label="任务名称"
            rules={[{ required: true, message: "请输入任务名称!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="model_id"
            label="模型"
            rules={[{ required: true, message: "请选择模型!" }]}
          >
            <Select>
              {models.map((model) => (
                <Option key={model.name} value={model.id}>
                  {model.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="dataset_id"
            label="数据集"
            rules={[{ required: true, message: "请选择数据集!" }]}
          >
            <Select>
              {datasets.map((dataset) => (
                <Option key={dataset.name} value={dataset.id}>
                  {dataset.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="runtime_id"
            label="运行环境"
            rules={[{ required: true, message: "请选择运行环境!" }]}
          >
            <Select>
              {envs.map((env) => (
                <Option key={env.name} value={env.id}>
                  {env.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Card>
        <Card
          title="模型参数"
          bordered={true}
          style={{ width: 600, margin: "auto", marginTop: 40 }}
          hoverable
        >
          <TaskFormItem tplConf={tpl.model} />
        </Card>
        <Card
          title="请求参数"
          bordered={true}
          style={{ width: 600, margin: "auto", marginTop: 40 }}
          hoverable
        >
          <TaskFormItem tplConf={tpl.request} />
        </Card>
        <div style={{ width: 600, margin: "auto", marginTop: 20 }}>
          <Form.Item wrapperCol={{ span: 12 }}>
            <Flex gap="small" wrap>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Flex>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

const TrainTaskAddContent = ({ id, name }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    // 初始化渲染
    getTplById(id).then(({ data }) => {
      const tpl_config = data;
      setTpl(tpl_config);

      //
      const config = {};
      tpl_config.base.forEach((element) => {
        config[element.name] = element.default;
      });
      tpl_config.stage &&
        tpl_config.stage.forEach((element) => {
          config[element.name] = element.default;
        });
      tpl_config.type &&
        tpl_config.type.forEach((element) => {
          config[element.name] = element.default;
        });
      tpl_config.deepspeed &&
        tpl_config.deepspeed.forEach((element) => {
          config[element.name] = element.default;
        });
      console.log("tpl_config", config);
      const initialValue = {
        name: "",
        model_id: "",
        dataset_id: "",
        runtime_id: "",
        config: config,
      };
      form.setFieldsValue(initialValue);
    });
    // 获取模型列表
    const json = {
      page: 1,
      size: 12,
      filter: {},
      fuzzy: {},
      order: {},
    };
    getModelList(json).then(({ data }) => {
      const model = data.items.filter((i) => i.status === "FINISHED");
      setModels(model);
    });
    // 获取数据集列表
    getDatasetList(json).then(({ data }) => {
      const dataset = data.items.filter((i) => i.status === "FINISHED");
      setDatasets(dataset);
    });
    // 获取运行环境列表
    getEnvList().then(({ data }) => {
      const env = data.items;
      setEnvs(env);
    });
  }, [id, form]);
  const [models, setModels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [envs, setEnvs] = useState([]);
  const [tpl, setTpl] = useState({});
  const navigate = useNavigate();
  const onFinish = (values) => {
    //创建任务并跳转到任务列表界面
    const defaultValue = {
      template_id: id,
    };
    console.log("表单数据 =>", { ...values, ...defaultValue });
    trainTaskAdd({ ...values, ...defaultValue }).then(() => {
      navigate(
        "/task/train/list?tpl_tag=train&tpl_id=" + id + "&tpl_name=" + name
      );
    });
  };

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <div style={content} className="width-resp">
      <Form
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
        labelAlign="left"
      >
        <Card
          title="环境配置"
          bordered={true}
          style={{ width: 600, margin: "auto" }}
          hoverable
        >
          <Form.Item
            name="name"
            label="任务名称"
            rules={[{ required: true, message: "请输入任务名称!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="model_id"
            label="模型"
            rules={[{ required: true, message: "请选择模型!" }]}
          >
            <Select>
              {models.map((model) => (
                <Option key={model.name} value={model.id}>
                  {model.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="dataset_id"
            label="数据集"
            rules={[{ required: true, message: "请选择数据集!" }]}
          >
            <Select>
              {datasets.map((dataset) => (
                <Option key={dataset.name} value={dataset.id}>
                  {dataset.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="runtime_id"
            label="运行环境"
            rules={[{ required: true, message: "请选择运行环境!" }]}
          >
            <Select>
              {envs.map((env) => (
                <Option key={env.name} value={env.id}>
                  {env.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Card>
        <Card
          title="基础参数"
          bordered={true}
          style={{ width: 600, margin: "auto", marginTop: 40 }}
          hoverable
        >
          <TaskFormItem tplConf={tpl.base} />
        </Card>
        {tpl.stage && (
          <Card
            title="stage"
            bordered={true}
            style={{ width: 600, margin: "auto", marginTop: 40 }}
            hoverable
          >
            <TaskFormItem tplConf={tpl.stage} />
          </Card>
        )}
        {tpl.type && (
          <Card
            title="type"
            bordered={true}
            style={{ width: 600, margin: "auto", marginTop: 40 }}
            hoverable
          >
            <TaskFormItem tplConf={tpl.type} />
          </Card>
        )}
        {tpl.deepspeed && (
          <Card
            title="deepspeed"
            bordered={true}
            style={{ width: 600, margin: "auto", marginTop: 40 }}
            hoverable
          >
            <TaskFormItem tplConf={tpl.deepspeed} />
          </Card>
        )}
        <div style={{ width: 600, margin: "auto", marginTop: 20 }}>
          <Form.Item wrapperCol={{ span: 12 }}>
            <Flex gap="small" wrap>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Flex>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export { TaskAddTitle, InferTaskAddContent, TrainTaskAddContent };

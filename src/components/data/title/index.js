import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Flex,
  Input,
  ConfigProvider,
  Drawer,
  Form,
  Button,
} from "antd";
import { getIconByName } from "../../../config/header";
import { PlusCircleTwoTone, SearchOutlined } from "@ant-design/icons";
import debounce from "lodash/debounce";
import "./title.css";
import { datasetCheck, modelCheck } from "../../../api";

const titleStyle = {
  paddingLeft: 16,
  paddingRight: 16,
  // width: 1536,
  margin: "auto",
  display: "flex",
  justifyContent: "space-between",
};

const DataTitle = ({ title, addFunc, searchFunc }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };
  const confirm = (values) => {
    // 获取表单数据
    addFunc(values);
    // searchFunc(values.name);
    // 清空表单
    form.resetFields();
    // 关闭抽屉
    setOpen(false);
  };
  const [isSpinning, setIsSpinning] = useState(true);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    debouncedOnSearch(e.target.value);
  };
  // 使用debounce来避免频繁触发搜索
  const debouncedOnSearch = debounce((value) => {
    console.log("test debounce", value);
    // 定义搜索时间
    searchFunc(value);
  }, 1000);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSpinning(false);
    }, 1000); // 假设旋转一圈需要 1 秒
    return () => clearTimeout(timer);
  }, []);
  const checkUsername = async (value, name) => {
    const check = name === "模型" ? modelCheck : datasetCheck
    if (!value) {
      return Promise.reject(new Error("请输入别名"));
    }
    try {
      // 调用后端接口检查用户名是否存在
      const { data } = await check(value);
      if (data.content) {
        return Promise.reject(new Error("别名已存在"));
      }
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(new Error("校验失败"));
    }
  };
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
              value={value}
              onChange={handleChange}
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
            <PlusCircleTwoTone
              className="my-icon"
              style={{
                marginLeft: 16,
                fontSize: 32,
                marginTop: "auto",
                marginBottom: 14,
              }}
              twoToneColor={title.color[5]}
              onClick={showDrawer}
            />
            <Drawer
              title={`添加远程或者本地${title.name}`}
              width={720}
              onClose={onClose}
              open={open}
              styles={{
                body: {
                  paddingBottom: 80,
                },
              }}
            >
              <Form
                layout="vertical"
                onFinish={confirm}
                // 将 form 实例绑定到 Form 组件
                form={form}
              >
                <Row gutter={16}>
                  <Col span={18}>
                    <Form.Item
                      name="repo"
                      label={`${title.name}仓库`}
                      rules={[
                        {
                          required: true,
                          message: "不能为空",
                        },
                      ]}
                    >
                      <Input
                        placeholder={`请输入${title.name}远程仓库名或者本地仓库的绝对路径`}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name="name"
                      label={`${title.name}别名`}
                      validateDebounce={1000}
                      rules={[
                        {
                          required: true,
                          message: "不能为空",
                        },
                        {
                          validator: (_, value) => checkUsername(value, title.name),
                          validateTrigger: ["onChange"],
                        },
                      ]}
                      hasFeedback
                    >
                      <Input placeholder={`请输入${title.name}别名`} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item name="desc" label="描述">
                      <Input.TextArea rows={4} placeholder="请输入描述" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Flex gap="small" wrap>
                    <Button type="primary" htmlType="submit">
                      提交
                    </Button>
                    <Button onClick={onClose}>取消</Button>
                  </Flex>
                </Form.Item>
              </Form>
            </Drawer>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default DataTitle;

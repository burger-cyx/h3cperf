import React, { useState } from "react";
import { Form, Select, Input, Slider, InputNumber, Row, Col } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { setGpu, setStage } from "../../store";

const { Option } = Select;

const findObjectByName = (list, name) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].name === name) {
      return list[i];
    }
  }
  return null; // 如果没有找到匹配的对象，则返回null
};

// 自行封装表单项组件
const TaskFormItem = ({ tplConf, category, type, tplName }) => {
  // 通过部署方式的 selected 值来判断 GPUs,deepspeed 的隐藏状态
  const dispatch = useDispatch();
  const distributedTypeOnSelect = (selectedValue) => {
    console.log("selected", selectedValue);
    dispatch(setGpu(selectedValue === "单机多卡"));
  };
  const stageOnSelect = (selectedValue) => {
    console.log("selected", selectedValue);
    // dispatch(setStage(selectedValue === "dpo" | selectedValue === "kto"));
    setStage(selectedValue);
  };
  const ftOnSelect = (selectedValue) => {
    console.log("selected", selectedValue);
    // dispatch(setStage(selectedValue === "dpo" | selectedValue === "kto"));
    setFt(selectedValue);
  };
  const isGpu = useSelector((state) => state.isDisabled.gpu);
  const [stage, setStage] = useState("sft");
  const [ft, setFt] = useState("lora");
  // 处理 stage
  const showStage = (stage, stageValue) => {
    console.log("stage", stage);
    console.log("stageValue", stageValue[stage]);
    if (stage === "dpo") {
      return (
        <>
          <Col span={6} style={{ height: 32 }}>
            <Form.Item
              key={stageValue[stage][0].name}
              name={["config", stageValue[stage][0].name]}
              label={stageValue[stage][0].label}
              initialValue={stageValue[stage][0].default}
              rules={[
                {
                  required: true,
                  message: "请输入beta!",
                },
              ]}
            >
              <InputNumber step={0.1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={6} style={{ height: 32 }}>
            <Form.Item
              key={stageValue[stage][1].name}
              name={["config", stageValue[stage][1].name]}
              label={stageValue[stage][1].label}
              initialValue={stageValue[stage][1].default}
              rules={[
                {
                  required: true,
                  message: "请输入loss_type!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6} style={{ height: 32 }}>
            <Form.Item
              key={stageValue[stage][2].name}
              name={["config", stageValue[stage][2].name]}
              label={stageValue[stage][2].label}
              initialValue={stageValue[stage][2].default}
              rules={[
                {
                  required: true,
                  message: "请输入label_smoothing!",
                },
              ]}
            >
              <InputNumber step={0.1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </>
      );
    } else if (stage === "kto") {
      return (
        <>
          <Col span={6} style={{ height: 32 }}>
            <Form.Item
              key={stageValue[stage][0].name}
              name={["config", stageValue[stage][0].name]}
              label={stageValue[stage][0].label}
              initialValue={stageValue[stage][0].default}
              rules={[
                {
                  required: true,
                  message: "请输入desirable weight!",
                },
              ]}
            >
              <InputNumber step={0.1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={6} style={{ height: 32 }}>
            <Form.Item
              key={stageValue[stage][1].name}
              name={["config", stageValue[stage][1].name]}
              label={stageValue[stage][1].label}
              initialValue={stageValue[stage][1].default}
              rules={[
                {
                  required: true,
                  message: "请输入undesirable weight!",
                },
              ]}
            >
              <InputNumber step={0.1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </>
      );
    }
  };
  const showFt = (ft, ftValue) => {
    
    if (ft === "lora") {
      return (
        <>
          <Col span={6} style={{ height: 32 }}>
            <Form.Item
              key={ftValue[ft][0].name}
              name={["config", ftValue[ft][0].name]}
              label={ftValue[ft][0].label}
              initialValue={ftValue[ft][0].default}
              rules={[
                {
                  required: true,
                  message: "请输入lora_r!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={6} style={{ height: 32 }}>
            <Form.Item
              key={ftValue[ft][1].name}
              name={["config", ftValue[ft][1].name]}
              label={ftValue[ft][1].label}
              initialValue={ftValue[ft][1].default}
              rules={[
                {
                  required: true,
                  message: "请输入lora_alpha!",
                },
              ]}
            >
               <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={6} style={{ height: 32 }}>
            <Form.Item
              key={ftValue[ft][2].name}
              name={["config", ftValue[ft][2].name]}
              label={ftValue[ft][2].label}
              initialValue={ftValue[ft][2].default}
              rules={[
                {
                  required: true,
                  message: "请输入lora_dropout!",
                },
              ]}
            >
               <InputNumber step={0.1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </>
      );
    } 
  };

  if ((category === "model") & (type === "infer")) {
    return (
      <>
        <Row gutter={[16, 16]}>
          {tplConf && (
            <Col span={6} style={{ height: "32px" }}>
              <Form.Item
                key={tplConf[0].name}
                name={["config", tplConf[0].name]}
                label={tplConf[0].label}
                rules={[{ required: true, message: "请选择部署方式!" }]}
              >
                <Select
                  defaultValue={tplConf[0].default}
                  onSelect={distributedTypeOnSelect}
                >
                  {tplConf[0].option.map((option, index) => (
                    <Option key={index} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}
          {isGpu && tplConf && (
            <Col span={6} style={{ height: "32px" }}>
              <Form.Item
                key={tplConf[1].name}
                name={["config", tplConf[1].name]}
                label={tplConf[1].label}
                rules={[{ required: true, message: "请输入GPU数量!" }]}
                initialValue={tplConf[1].default}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          )}
          {tplConf && (
            <Col span={6} style={{ height: "32px" }}>
              <Form.Item
                key={tplConf[2].name}
                name={["config", tplConf[2].name]}
                label={tplConf[2].label}
                rules={[{ required: true, message: "请选择精度!" }]}
                initialValue={tplConf[2].default}
              >
                <Select defaultValue={tplConf[2].default}>
                  {tplConf[2].option.map((option, index) => (
                    <Option key={index} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}
          {tplConf && (
            <Col span={6} style={{ height: "32px" }}>
              <Form.Item
                key={tplConf[3].name}
                name={["config", tplConf[3].name]}
                label={tplConf[3].label}
                rules={[{ required: true, message: "请选择显存占比!" }]}
                initialValue={tplConf[3].default}
              >
                <Slider
                  min={tplConf[3].range[0]}
                  max={tplConf[3].range[1]}
                  step={tplConf[3].range[2]}
                  tooltip={{ open: true }}
                />
              </Form.Item>
            </Col>
          )}
        </Row>
      </>
    );
  } else if ((category === "request") & (type === "infer")) {
    return (
      <Row gutter={[16, 16]} style={{ height: 32 }}>
        {tplConf && (
          <Col span={6}>
            <Form.Item
              key={tplConf[0].name}
              name={["config", tplConf[0].name]}
              label={tplConf[0].label}
              rules={[{ required: true, message: "请输入测试时长!" }]}
              initialValue={tplConf[0].default}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        )}
        {tplConf && (
          <Col span={6}>
            <Form.Item
              key={tplConf[1].name}
              name={["config", tplConf[1].name]}
              label={tplConf[1].label}
              rules={[{ required: true, message: "请选择请求策略!" }]}
            >
              <Select defaultValue={tplConf[1].default}>
                {tplConf[1].option.map((option, index) => (
                  <Option key={index} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        )}
        {tplConf && (
          <Col span={6}>
            <Form.Item
              key={tplConf[2].name}
              name={["config", tplConf[2].name]}
              label={tplConf[2].label}
              rules={[{ required: true, message: "请输入最大请求速率!" }]}
              initialValue={tplConf[2].default}
            >
              <InputNumber step={0.1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        )}
      </Row>
    );
  } else if ((category === "base") & (type === "train") & (tplName !== "Yolo")) {
    return (
      <Row gutter={[16, 16]}>
        {tplConf && (
          <Col span={6} style={{ height: 32 }}>
            <Form.Item
              key={tplConf[0].name}
              name={["config", tplConf[0].name]}
              label={tplConf[0].label}
              rules={[{ required: true, message: "请选择部署方式!" }]}
              initialValue={tplConf[0].default}
            >
              <Select onSelect={distributedTypeOnSelect}>
                {tplConf[0].option.map((option, index) => (
                  <Option key={index} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        )}
        {isGpu && tplConf && (
          <Col span={6} style={{ height: 32 }}>
            <Form.Item
              key={tplConf[1].name}
              name={["config", tplConf[1].name]}
              label={tplConf[1].label}
              rules={[{ required: true, message: "请输入GPU数量!" }]}
              initialValue={tplConf[1].default}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        )}
        {tplConf && (
          <Col span={6} style={{ height: 32 }}>
            <Form.Item
              key={tplConf[2].name}
              name={["config", tplConf[2].name]}
              label={tplConf[2].label}
              rules={[{ required: true, message: "请选择精度!" }]}
              initialValue={tplConf[2].default}
            >
              <Select>
                {tplConf[2].option.map((option, index) => (
                  <Option key={index} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        )}
        {tplConf && (
          <Col span={6} style={{ height: 32 }}>
            <Form.Item
              key={tplConf[3].name}
              name={["config", tplConf[3].name]}
              label={tplConf[3].label}
              rules={[{ required: true, message: "请输入训练轮次!" }]}
              initialValue={tplConf[3].default}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        )}
        {tplConf && (
          <Col span={6} style={{ height: 32 }}>
            <Form.Item
              key={tplConf[4].name}
              name={["config", tplConf[4].name]}
              label={tplConf[4].label}
              rules={[{ required: true, message: "请输入batch size!" }]}
              initialValue={tplConf[4].default}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        )}
        {tplConf && (
          <Col span={6} style={{ height: 32 }}>
            <Form.Item
              key={tplConf[5].name}
              name={["config", tplConf[5].name]}
              label={tplConf[5].label}
              initialValue={tplConf[5].default}
              rules={[
                {
                  required: true,
                  message: "请输入gradient_accumulation_steps!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        )}
        {tplConf && (
          <Col span={6} style={{ height: 32 }}>
            <Form.Item
              key={tplConf[6].name}
              name={["config", tplConf[6].name]}
              label={tplConf[6].label}
              initialValue={tplConf[6].default}
              rules={[
                {
                  required: true,
                  message: "请输入学习率!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} step={0.0001} />
            </Form.Item>
          </Col>
        )}
        {tplConf && (
          <Col span={6} style={{ height: 32 }}>
            <Form.Item
              key={tplConf[7].name}
              name={["config", tplConf[7].name]}
              label={tplConf[7].label}
              initialValue={tplConf[7].default}
              rules={[
                {
                  required: true,
                  message: "请输入scheduler type!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        )}
      </Row>
    );
  } else if  ((category === "base") & (type === "train") & (tplName === "Yolo")) {
    return (
      <Row gutter={[16, 16]}>
      {tplConf && (
        <Col span={6} style={{ height: 32 }}>
          <Form.Item
            key={tplConf[0].name}
            name={["config", tplConf[0].name]}
            label={tplConf[0].label}
            rules={[{ required: true, message: "请选择部署方式!" }]}
            initialValue={tplConf[0].default}
          >
            <Select onSelect={distributedTypeOnSelect}>
              {tplConf[0].option.map((option, index) => (
                <Option key={index} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      )}
      {isGpu && tplConf && (
        <Col span={6} style={{ height: 32 }}>
          <Form.Item
            key={tplConf[1].name}
            name={["config", tplConf[1].name]}
            label={tplConf[1].label}
            rules={[{ required: true, message: "请输入GPU数量!" }]}
            initialValue={tplConf[1].default}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      )}
      {tplConf && (
        <Col span={6} style={{ height: 32 }}>
          <Form.Item
            key={tplConf[2].name}
            name={["config", tplConf[2].name]}
            label={tplConf[2].label}
            rules={[{ required: true, message: "请输入训练轮次!" }]}
            initialValue={tplConf[2].default}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      )}
      {tplConf && (
        <Col span={6} style={{ height: 32 }}>
          <Form.Item
            key={tplConf[3].name}
            name={["config", tplConf[3].name]}
            label={tplConf[3].label}
            rules={[{ required: true, message: "请输入batch size!" }]}
            initialValue={tplConf[3].default}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      )}
      {tplConf && (
        <Col span={6} style={{ height: 32 }}>
          <Form.Item
            key={tplConf[4].name}
            name={["config", tplConf[4].name]}
            label={tplConf[4].label}
            initialValue={tplConf[4].default}
            rules={[
              {
                required: true,
                message: "请输入Image Size!",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      )}
      {tplConf && (
        <Col span={6} style={{ height: 32 }}>
          <Form.Item
            key={tplConf[5].name}
            name={["config", tplConf[5].name]}
            label={tplConf[5].label}
            initialValue={tplConf[5].default}
            rules={[
              {
                required: true,
                message: "请输入学习率!",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} step={0.01} />
          </Form.Item>
        </Col>
      )}
    </Row>
    )
  } else if ((category === "stage") & (type === "train")) {
    return (
      <Row gutter={[16, 16]}>
        {tplConf && (
          <Col span={6} style={{ height: "32px" }}>
            <Form.Item
              key={tplConf[0].name}
              name={["config", tplConf[0].name]}
              label={tplConf[0].label}
              initialValue={tplConf[0].default}
              rules={[{ required: true, message: "请选择训练阶段!" }]}
            >
              <Select onSelect={stageOnSelect}>
                {tplConf[0].option.map((option, index) => (
                  <Option key={index} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        )}
        {tplConf && showStage(stage, tplConf[0].child)}
      </Row>
    );
  } else if ((category === "type") & (type === "train")) {
    return (
      <Row gutter={[16, 16]}>
        {tplConf && (
          <Col span={6} style={{ height: "32px" }}>
            <Form.Item
              key={tplConf[0].name}
              name={["config", tplConf[0].name]}
              label={tplConf[0].label}
              initialValue={tplConf[0].default}
              rules={[{ required: true, message: "请选择微调方式!" }]}
            >
              <Select onSelect={ftOnSelect}>
                {tplConf[0].option.map((option, index) => (
                  <Option key={index} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        )}
        {tplConf && showFt(ft, tplConf[0].child)}
      </Row>
    );
  } else if ((category === "deepspeed") & (type === "train")) {
    return (
      <Row gutter={[16, 16]}>
        {tplConf && (
          <Col span={6} style={{ height: "32px" }}>
            <Form.Item
              key={tplConf[0].name}
              name={["config", tplConf[0].name]}
              label={tplConf[0].label}
              initialValue={tplConf[0].default}
              rules={[{ required: true, message: "请选择deepspeed!" }]}
            >
              <Select>
                {tplConf[0].option.map((option, index) => (
                  <Option key={index} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        )}
       
      </Row>
    );
  } 

  const renderItem = (item) => {
    if (item.option) {
      return (
        <Select defaultValue={item.default}>
          {item.option.map((option, index) => (
            <Option key={index} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      );
    } else if (item.range) {
      return (
        <Slider
          defaultValue={item.default}
          min={item.range[0]}
          max={item.range[1]}
          step={item.range[2]}
          tooltip={{ open: true }}
        />
      );
    } else {
      if (item.type === "str") {
        return <Input defaultValue={item.default} />;
      } else if (item.type === "int") {
        return <InputNumber defaultValue={item.default} />;
      } else {
        return <InputNumber defaultValue={item.default} step="0.01" />;
      }
    }
  };

  // const options = item.child.options.map((i) => ({
  //   label: i,
  //   value: i,
  // }));
  // const [selcetedOptioin, setSelectedOption] = useState("");

  // const handleSelectChange = (value) => {
  //   setSelectedOption(value);
  // };
  // const renderFormItem = (item) => {
  //   const configData = item.child[selectedOption] || [];
  //   return configData.map((item) => (
  //     <Form.Item
  //       key={item.name}
  //       name={[item.name]}
  //       label={item.label}
  //       rules={[{ required: true, message: "Please input " + item.label + "!" }]}
  //     >
  //       {item.type === "float" ? <InputNumber step={item.default === 0.1 ? 0.1 : 0.01} /> : <Input />}
  //     </Form.Item>
  //   ));
  // };

  // const child

  // if (Array.isArray(tplConf)) {
  //   return (
  //     <Row gutter={[32, 32]}>
  //       {tplConf &&
  //         tplConf.map((item) => (
  //           <Col span={6}>
  //             <Form.Item
  //               key={item.name}
  //               name={["config", item.name]}
  //               label={item.label}
  //               rules={[{ required: true, message: "请选择!" }]}
  //             >
  //               {renderItem(item)}
  //             </Form.Item>
  //           </Col>
  //         ))}
  //       {/* {item.child && } */}
  //     </Row>
  //   );
  // }
};

export default TaskFormItem;

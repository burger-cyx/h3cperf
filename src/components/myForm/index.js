import React from "react";
import { Form, Select, Input, Slider, InputNumber } from "antd";

const { Option } = Select;

// 自行封装表单项组件
const TaskFormItem = ({ tplConf }) => {
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
  

  if (Array.isArray(tplConf)) {
    return (
      <div>
        {tplConf &&
          tplConf.map((item) => (
            <Form.Item
              key={item.name}
              name={["config", item.name]}
              label={item.label}
              rules={[{ required: true, message: "请选择!" }]}
            >
              {renderItem(item)}
            </Form.Item>
          ))}
        {/* {item.child && } */}
      </div>
    );
  }
};

export default TaskFormItem;

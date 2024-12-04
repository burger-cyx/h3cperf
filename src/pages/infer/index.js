import React, { useEffect, useState } from "react";
import PerfTitle from "../../components/perf/title";
import { getBtnByName } from "../../config/header";
import PerfContent from "../../components/perf/content";
import { getInferTpl } from "../../api";

const Infer = () => {
  const buttonList = getBtnByName("推理");
  const title = {
    name: buttonList.name,
    color: buttonList.color,
    iconName: buttonList.iconName,
    desc: buttonList.desc,
    url: buttonList.url
  };
  useEffect(() => {
    fetchInferTpl();
  }, []);
  const fetchInferTpl = () => {
    getInferTpl().then(({ data }) => {
         console.log("模版列表", data.items)
      setTemplates(data);
    });
  };

  const [templates, setTemplates] = useState([]);
  return (
    <div style={{ height: "100%" }}>
      <PerfTitle title={title}></PerfTitle>
      <PerfContent data={templates} title={title} />
    </div>
  );
};

export default Infer;

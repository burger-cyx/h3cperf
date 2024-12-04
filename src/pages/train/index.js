import React, { useEffect, useState } from "react";
import PerfTitle from "../../components/perf/title";
import { getBtnByName } from "../../config/header";
import { getTrainTpl } from "../../api";
import PerfContent from "../../components/perf/content";

const Train = () => {
  const buttonList = getBtnByName("训练");
  const title = {
    name: buttonList.name,
    color: buttonList.color,
    iconName: buttonList.iconName,
    desc: buttonList.desc,
    url: buttonList.url
  };
  useEffect(() => {
    fetchTrainTpl();
  }, []);
  const fetchTrainTpl = () => {
    getTrainTpl().then(({ data }) => {
      //    console.log("模版列表", data.items)
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
export default Train;

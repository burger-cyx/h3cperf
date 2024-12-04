import React, { } from "react";

import { getMenuByName } from "../../../../config/header";
import { useSearchParams } from "react-router-dom";

import { TaskAddTitle, InferTaskAddContent } from "../../../../components/task/add";

const InferTaskAdd = () => {
  const menuList = getMenuByName("推理任务创建");
  const title = {
    name: menuList.name,
    color: menuList.color,
    iconName: menuList.iconName,
    desc: menuList.desc,
    url: menuList.url,
  };
  const [searchParams] = useSearchParams();
  const tplId = searchParams.get("tpl_id")
  const tplName = searchParams.get("tpl_name")
 
  return (
    <div style={{ height: "100%" }}>
      <TaskAddTitle title={title}></TaskAddTitle>
      <InferTaskAddContent id={tplId} name={tplName}></InferTaskAddContent>
    </div>
  );
};

export default InferTaskAdd;

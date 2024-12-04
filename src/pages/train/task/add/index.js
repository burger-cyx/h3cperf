import React from "react";
import { getMenuByName } from "../../../../config/header";
import { useSearchParams } from "react-router-dom";
import { TrainTaskAddContent, TaskAddTitle } from "../../../../components/task/add";

const TrainTaskAdd = () => {
  const menuList = getMenuByName("训练任务创建");
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
  // const tplTag = searchParams.get("tpl_tag")
  // useEffect(() => {
  //   fetchTaskList(tplId, 1)
  // }, [tplId]);
  // const fetchTaskList = (tplId, page) => {
  //   const json = {
  //     page: page,
  //     size: 10,
  //     filter: {template_id: tplId},
  //     fuzzy: {},
  //     order: {},
  //   };
  //   trainTaskList(json).then(({ data }) => {
  //     console.log("tasklist", data.items)
  //     setTableData(data.items); 
  //   }).catch((e)=> {alert("后端暂不可用")});
  // };
  // const [tableData, setTableData] = useState([]);
  return (
    <div style={{ height: "100%" }}>
      <TaskAddTitle title={title}></TaskAddTitle>
      <TrainTaskAddContent id={tplId} name={tplName}></TrainTaskAddContent>
    </div>
  );
};

export default TrainTaskAdd;
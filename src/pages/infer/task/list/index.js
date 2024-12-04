import React, { useEffect, useState } from "react";
import {
  TaskListContent,
  TaskListTitle,
} from "../../../../components/task/list";
import { getMenuByName } from "../../../../config/header";
import { useSearchParams } from "react-router-dom";
import { inferTaskDelete, inferTaskExec, inferTaskList } from "../../../../api";

const InferTaskList = () => {
  const menuList = getMenuByName("推理任务列表");
  const title = {
    name: menuList.name,
    color: menuList.color,
    iconName: menuList.iconName,
    desc: menuList.desc,
    url: menuList.url,
  };
  const [searchParams] = useSearchParams();
  const tplInfo = {
    id: searchParams.get("tpl_id"),
    tag: searchParams.get("tpl_tag"),
    name: searchParams.get("tpl_name"),
  }
  const tplId = searchParams.get("tpl_id")
  useEffect(() => {
    fetchTaskList(tplId, 1)
  }, [tplId]);
  const fetchTaskList = (id, page) => {
    const json = {
      page: page,
      size: 10,
      filter: { template_id: id },
      fuzzy: {},
      order: {},
    };
    inferTaskList(json)
      .then(({ data }) => {
        setTableData(data.items);
        setPageTotal(data.total)
      })
      .catch((e) => {
        alert("后端暂不可用");
      });
  };
  const runTaskAndRefresh = (id_list) => {
    inferTaskExec(id_list).then(()=>{
      // 添加后刷新 tableData
      fetchTaskList(tplId, 1)
    })
  }
  const deleteTaskAndRefresh = (id_list) => {
    inferTaskDelete(id_list).then(()=>{
      // 删除后刷新 tableData
      fetchTaskList(tplId, 1)
    })
  }


  const [tableData, setTableData] = useState([]);
  const [pageTotal, setPageTotal] = useState(null);
  return (
    <div style={{ height: "100%" }}>
      <TaskListTitle title={title}></TaskListTitle>
      <TaskListContent
        tplInfo={tplInfo}
        fetchTask={fetchTaskList}
        runTask={runTaskAndRefresh}
        deleteTask={deleteTaskAndRefresh}
        tableData={tableData}
        total={pageTotal}
      ></TaskListContent>
    </div>
  );
};

export default InferTaskList;

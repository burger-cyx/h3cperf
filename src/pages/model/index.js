import React, { useEffect, useState } from "react";
import { addModel, getModelList } from "../../api";
import DataTitle from "../../components/data/title";
import DataContent from "../../components/data/content";
import DataPagination from "../../components/data/pagination";
import { getBtnByName } from "../../config/header";
const Model = () => {
  const buttonList = getBtnByName("模型")
  const title = {
    name: buttonList.name,
    color: buttonList.color,
    iconName: buttonList.iconName,
    desc: buttonList.desc,
  };
  useEffect(()=>{
    fetchModel(1)
  },[])
  const fetchModel = (page) => {
    const json = {
      page: page,
      size: 12,
      filter: {},
      fuzzy: {},
      order: {},
    };
    getModelList(json).then(({ data }) => {
      setModels(data);
    }).catch((e)=> {alert("后端暂不可用")});
  };
  const addAndRefreshModel = (values) => {
    addModel({
      name: values.name,
      repo: values.repo,
    }).then(() => {
      const json = {
        page: 1,
        size: 12,
        filter: {},
        fuzzy: {},
        order: {},
      };
      getModelList(json).then(({ data }) => {
        setModels(data);
      });
    });
  };
  const searchModel = (name) => {
    if (name === "") {
      fetchModel(1);
    } else {
      const json = {
        page: 1,
        size: 12,
        filter: { name: name },
        fuzzy: {},
        order: {},
      };
      getModelList(json).then(({ data }) => {
        setModels(data);
      });
    }
  };
  const [models, setModels] = useState([]);

  return (
    <div style={{ height: "100%" }}>
      <DataTitle
        title={title}
        addFunc={addAndRefreshModel}
        searchFunc={searchModel}
      ></DataTitle>
      <DataContent data={models}></DataContent>
      <DataPagination data={models} fetchFunc={fetchModel}></DataPagination>
    </div>
  );
};

export default Model;

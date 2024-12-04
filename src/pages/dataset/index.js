import React, { useEffect, useState } from "react";
import { addDataset, getDatasetList } from "../../api";

import { getBtnByName } from "../../config/header";

import DataTitle from "../../components/data/title";
import DataContent from "../../components/data/content";
import DataPagination from "../../components/data/pagination";

const Dataset = () => {
  const buttonList = getBtnByName("数据集");
  const title = {
    name: buttonList.name,
    color: buttonList.color,
    iconName: buttonList.iconName,
    desc: buttonList.desc,
  };
  useEffect(() => {
    fetchDataset(1);
  }, []);
  const fetchDataset = (page) => {
    const json = {
      page: page,
      size: 12,
      filter: {},
      fuzzy: {},
      order: {},
    };
    getDatasetList(json).then(({ data }) => {
      setDatasets(data);
    });
  };
  const addAndRefreshDataset = (values) => {
    addDataset({
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
      getDatasetList(json).then(({ data }) => {
        setDatasets(data);
      });
    });
  };
  const searchDataset = (name) => {
    if (name === "") {
      fetchDataset(1);
    } else {
      const json = {
        page: 1,
        size: 12,
        filter: { name: name },
        fuzzy: {},
        order: {},
      };
      getDatasetList(json).then(({ data }) => {
        setDatasets(data);
      });
    }
  };
  const [datasets, setDatasets] = useState([]);

  return (
    <div style={{ height: "100%" }}>
      <DataTitle
        title={title}
        addFunc={addAndRefreshDataset}
        searchFunc={searchDataset}
      ></DataTitle>
      <DataContent data={datasets}></DataContent>
      <DataPagination data={datasets} fetchFunc={fetchDataset}></DataPagination>
    </div>
  );
};

export default Dataset;

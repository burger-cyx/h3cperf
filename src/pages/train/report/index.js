import React from "react";
import { ReportTitle, TrainReportContent } from "../../../components/report";
import { getMenuByName } from "../../../config/header";



const TrainReport = () => {
    const menuList = getMenuByName("训练任务报告");
    const title = {
    name: menuList.name,
    color: menuList.color,
    iconName: menuList.iconName,
    desc: menuList.desc,
    url: menuList.url,
  };
    return (
    <div style={{height: "100%"}}>
        <ReportTitle title={title}></ReportTitle>
        <TrainReportContent></TrainReportContent></div>
    )
}

export default TrainReport
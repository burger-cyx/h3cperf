import React from "react";
import { InferReportContent, ReportTitle } from "../../../components/report";
import { getMenuByName } from "../../../config/header";



const InferReport = () => {
    const menuList = getMenuByName("推理任务报告");
    const title = {
    name: menuList.name,
    color: menuList.color,
    iconName: menuList.iconName,
    desc: menuList.desc,
    url: menuList.url,
  };
    return (
    <div style={{height: "100%"}}>
        <ReportTitle title={title} tag="infer"></ReportTitle>
        <InferReportContent></InferReportContent>
    </div>
    )
}

export default InferReport
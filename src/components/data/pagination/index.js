import React from "react";
import { Pagination } from "antd";

const DataPagination = ({ data, fetchFunc }) => {
  const pageChange = (page) => {
    fetchFunc(page);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Pagination
        total={data.total}
        showTotal={(total) => `共 ${total} 项`}
        defaultPageSize={12}
        defaultCurrent={1}
        // itemRender={itemRender}
        onChange={pageChange}
      ></Pagination>
    </div>
  );
};

export default DataPagination;

import React from "react";

import EnhancedTable from "../EnhancedTable";
import { useSearchParams } from "react-router-dom";

export const Orders = () => {
  const [searchParams] = useSearchParams();

  return (
    <>
      <EnhancedTable
        name="Orders"
        clickBehavior="openLink"
        resourceURL="admin/orders"
        searchParams={searchParams}
        headCells={[
          {
            id: "id",
            numeric: false,
            disablePadding: true,
            label: "ID",
          },
          {
            id: "email",
            numeric: false,
            disablePadding: true,
            label: "Email",
          },
          {
            id: "total",
            numeric: false,
            disablePadding: true,
            label: "Total",
          },
          {
            id: "status",
            numeric: false,
            disablePadding: true,
            label: "Status",
            displayMap: new Map().set(0, "unpaid").set(1, "paid"),
          },
        ]}
      />
    </>
  );
};

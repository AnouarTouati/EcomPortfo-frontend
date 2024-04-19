import React from "react";
import Table from "./Table";
export const Products = () => {
  return (
    <div>
      <Table
        headCells={[
          {
            id: "id",
            numeric: false,
            disablePadding: true,
            label: "ID",
          },
          {
            id: "name",
            numeric: false,
            disablePadding: true,
            label: "Name",
          },
          {
            id: "description",
            numeric: true,
            disablePadding: false,
            label: "Description",
          },
          {
            id: "stripeId",
            numeric: true,
            disablePadding: false,
            label: "Stripe ID",
          },
          {
            id: "price",
            numeric: true,
            disablePadding: false,
            label: "Price",
          },
          {
            id: "date",
            numeric: true,
            disablePadding: false,
            label: "Date added",
          },
        ]}
      />
    </div>
  );
};

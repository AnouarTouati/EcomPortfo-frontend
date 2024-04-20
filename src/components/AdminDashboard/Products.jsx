import React from "react";
import Table from "./Table";
import { useSearchParams } from "react-router-dom";
export const Products = () => {
  const [searchParams,setSearchParams] = useSearchParams()
  
  return (
    <div>
      <Table
        name={'Product'}
        resourceURL={'/products'}
        searchParams={searchParams}
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
            id: "stripe_id",
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
            id: "created_at",
            numeric: true,
            disablePadding: false,
            label: "Date added",
          },
        ]}
      />
    </div>
  );
};

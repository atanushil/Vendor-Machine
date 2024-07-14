import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "sl",
    headerName: "SL",
    width: 50,
    sortable: true,
    resizable: false,
  },
  {
    field: "consumerId",
    headerName: "CONSUMER ID",
    width: 130,
    sortable: false,
    resizable: false,
  },
  {
    field: "consumerAddress",
    headerName: "CONSUMER ADDRESS",
    width: 180,
    sortable: false,
  },
  {
    field: "consumerEmail",
    headerName: "CONSUMER EMAIL",
    width: 200,
    sortable: false,
  },
  {
    field: "contractualVolume",
    headerName: "CONTRACTUAL VOLUME",
    width: 180,
    sortable: false,
    resizable: false,
  },
  {
    field: "billNo",
    headerName: "BILL NO",
    width: 100,
    sortable: false,
    resizable: false,
  },
  {
    field: "meterReadingFrom",
    headerName: "METER READING FROM",
    width: 200,
    sortable: false,
    resizable: false,
  },
  {
    field: "meterReadingTo",
    headerName: "METER READING TO",
    width: 170,
    resizable: false,
    sortable: false,
  },
  {
    field: "unitConsume",
    headerName: "UNIT CONSUME",
    width: 140,
    sortable: false,
    resizable: false,
  },
  {
    field: "dutiableUnit",
    headerName: "DUTIABLE UNIT",
    width: 140,
    sortable: false,
    resizable: false,
  },
  {
    field: "charges",
    headerName: "CHARGES (RS.)",
    width: 130,
    sortable: false,
    resizable: false,
  },
  {
    field: "rent",
    headerName: "RENT",
    width: 100,
    sortable: false,
    resizable: false,
  },
  {
    field: "totalBillAmount",
    headerName: "TOTAL BILL AMOUNT",
    width: 180,
    sortable: false,
  },
  {
    field: "totalPenaltyAmountFrom",
    headerName: "TOTAL PENALTY AMOUNT FROM",
    width: 210,
    sortable: false,
  },
  {
    field: "billAmountRent",
    headerName: "BILL AMOUNT + M RENT (RS)",
    width: 220,
    sortable: false,
  },
  {
    field: "revenue",
    headerName: "REVENUE",
    width: 130,
    sortable: false,
    resizable: false,
  },
  {
    field: "collection",
    headerName: "COLLECTION",
    width: 130,
    sortable: false,
  },
  { field: "date", headerName: "DATE", width: 120, sortable: false },
  { field: "txnNo", headerName: "TXN NO", width: 150, sortable: false },
  {
    field: "pendingOutstandingAmount",
    headerName: "PENDING OUTSTANDING AMOUNT",
    width: 250,
    sortable: false,
  },
];

export default function DataTable({ rows, checkbox }) {
  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          columns={columns}
          columnHeaderHeight={30}
          rowHeight={34}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 12 },
            },
          }}
          pageSizeOptions={[6, 8, 10, 12, 14, 16, 18, 20]}
          checkboxSelection={checkbox}
        />
      </div>
    </>
  );
}

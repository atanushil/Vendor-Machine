import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import SelectSmall from "./SelectSmall";
import { columns } from "../data/data";
import { colors } from "@mui/material";

export default function DataTable({ rows, checkbox, category }) {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedConsumerId, setSelectedConsumerId] = useState("");

  const dates = rows.map((row) => row.date);
  const uniqueYears = [...new Set(dates.map((date) => date.split("/")[2]))];
  const uniqueMonths = [...new Set(dates.map((date) => date.split("/")[1]))];

  useEffect(() => {
    setSelectedYear("");
    setSelectedMonth("");
    setSelectedDay("");
    setSelectedConsumerId("");
  }, [category]);

  const filteredRows = rows.filter(row => {
    const [day, month, year] = row.date.split("/");
    return (
      (selectedYear ? year === selectedYear : true) &&
      (selectedMonth ? month === selectedMonth : true) &&
      (selectedDay ? day === selectedDay : true) &&
      (selectedConsumerId ? row.consumerId === selectedConsumerId : true)
    );
  });

  const consumerIds = [...new Set(filteredRows.map(row => row.consumerId))];

  const handleExport = () => {
    const confirmation = window.confirm(
      `Do you want to download the data for:\nYear: ${selectedYear}\nMonth: ${selectedMonth}\nDay: ${selectedDay}\nConsumer ID: ${selectedConsumerId || 'N/A'}?`
    );

    if (confirmation) {
      const headers = columns.map(col => col.headerName).join(",");
      const csvContent = "data:text/csv;charset=utf-8,"
        + headers + "\n"
        + filteredRows.map(row => columns.map(col => row[col.field]).join(",")).join("\n");

      const fileName = `${category}_${selectedYear}_${selectedMonth}${selectedDay ? `_${selectedDay}` : ''}${selectedConsumerId ? `_${selectedConsumerId}` : ''}.csv`;

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const noDataAvailable = uniqueYears.length === 0 && uniqueMonths.length === 0 && consumerIds.length === 0;

  const uniqueDays = selectedYear && selectedMonth
    ? [...new Set(rows
        .filter(row => {
          const [, month, year] = row.date.split("/");
          return year === selectedYear && month === selectedMonth;
        })
        .map(row => row.date.split("/")[0]))]
    : [];

  return (
    <>
      <div className="flex lg:flex flex-wrap items-center gap-4 mb-2">
        {noDataAvailable ? (
          <span className="px-4 text-2xl py-4 font-medium uppercase bg-[#D23030] w-full text-slate-100 flex items-center justify-center">Don't have any data</span>
        ) : (
          <>
            <SelectSmall
              values={uniqueYears}
              item={"Year"}
              onValueChange={(year) => {
                setSelectedYear(year);
                setSelectedMonth("");
                setSelectedDay("");
                setSelectedConsumerId("");
              }}
            />

            {selectedYear && uniqueMonths.length > 0 && (
              <SelectSmall
                values={uniqueMonths}
                item={"Month"}
                onValueChange={(month) => {
                  setSelectedMonth(month);
                  setSelectedDay("");
                  setSelectedConsumerId("");
                }}
              />
            )}

            {selectedMonth && uniqueDays.length > 0 && (
              <SelectSmall
                values={uniqueDays}
                item={"Day (Optional)"}
                onValueChange={setSelectedDay}
              />
            )}

            {selectedMonth && consumerIds.length > 0 && (
              <SelectSmall
                values={consumerIds}
                item={"Consumer ID (Optional)"}
                onValueChange={setSelectedConsumerId}
              />
            )}

            {selectedYear && selectedMonth && (
              <button 
                className="px-4 py-2 rounded bg-green-200 hover:bg-green-300 active:bg-green-500 active:text-white font-medium uppercase"
                onClick={handleExport}
              >
                Export
              </button>
            )}
          </>
        )}
      </div>
      <div style={{ height: "100%", width: "100%"}}>
        <DataGrid
          rows={filteredRows}
          disableColumnMenu
          disableColumnSelector
          columns={columns}
          columnHeaderHeight={30}
          showCellVerticalBorder
          autoPageSize
          sx={{background:"#b0bec5"}}
          colors={"#478CCF"}
          hideFooterSelectedRowCount
          rowHeight={34}
          checkboxSelection={checkbox}
        />
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import SelectSmall from "./SelectSmall";
import { columns } from "../data/data";

export default function DataTable({ rows, checkbox, category }) {
  const currentYear = new Date().getFullYear(); // Get the current year
  const [selectedYear, setSelectedYear] = useState(currentYear.toString()); // Default to current year
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedConsumerId, setSelectedConsumerId] = useState("");

  const dates = rows.map((row) => row.date);
  const uniqueYears = [...new Set(dates.map((date) => date.split("/")[2]))];
  const uniqueMonths = [...new Set(dates.map((date) => date.split("/")[1]))];

  // Reset selections when category changes
  useEffect(() => {
    setSelectedYear(currentYear.toString());
    setSelectedMonth("");
    setSelectedConsumerId("");
  }, [category]);

  // Handle filtering logic
  const filteredRows = rows.filter(row => {
    const [day, month, year] = row.date.split("/");
    return (
      (selectedYear ? year === selectedYear : true) &&
      (selectedMonth ? month === selectedMonth : true) &&
      (selectedConsumerId ? row.consumerId === selectedConsumerId : true)
    );
  });

  // Get consumer IDs filtered by selected year and month
  const consumerIds = [...new Set(filteredRows.map(row => row.consumerId))];

  // Export function
  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + filteredRows.map(row => Object.values(row).join(",")).join("\n");

    // Create the filename
    const fileName = `${category}_${selectedYear}_${selectedMonth}${selectedConsumerId ? `_${selectedConsumerId}` : ''}.csv`;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Check if there are any data
  const noDataAvailable = uniqueYears.length === 0 && uniqueMonths.length === 0 && consumerIds.length === 0;

  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        {/* Year Selector */}
        {noDataAvailable ? (
          <span>Don't have any data</span>
        ) : (
          <>
            <SelectSmall
              values={uniqueYears}
              item={"Year"}
              onValueChange={setSelectedYear}
            />
            
            {/* Month Selector */}
            {selectedYear && uniqueMonths.length > 0 ? (
              <SelectSmall
              none={"None"}
                values={uniqueMonths}
                item={"Month"}
                onValueChange={setSelectedMonth}
              />
            ) : (
              selectedYear && <span>Don't have any data</span>
            )}

            {/* Consumer ID Selector */}
            {selectedMonth && consumerIds.length > 0 ? (
              <SelectSmall
                none={"None"}
                values={consumerIds}
                item={"Consumer ID (Optional)"}
                onValueChange={setSelectedConsumerId}
              />
            ) : (
              selectedMonth && <span>Don't have any data</span>
            )}

            {/* Export Button */}
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
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          disableColumnMenu
          disableColumnSelector
          columns={columns}
          columnHeaderHeight={30}
          showCellVerticalBorder
          autoPageSize
          rowHeight={34}
          checkboxSelection={checkbox}
        />
      </div>
    </>
  );
}

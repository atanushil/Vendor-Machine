import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import SelectSmall from "./SelectSmall";
import { columns } from "../data/data";

export default function DataTable({ rows, checkbox, category }) {
  const [selectedYear, setSelectedYear] = useState(""); // Default to no year selected
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState(""); // State for the day selector
  const [selectedConsumerId, setSelectedConsumerId] = useState("");

  const dates = rows.map((row) => row.date);
  const uniqueYears = [...new Set(dates.map((date) => date.split("/")[2]))];
  const uniqueMonths = [...new Set(dates.map((date) => date.split("/")[1]))];

  // Reset selections when category changes
  useEffect(() => {
    setSelectedYear("");
    setSelectedMonth("");
    setSelectedDay("");
    setSelectedConsumerId("");
  }, [category]);

  // Handle filtering logic
  const filteredRows = rows.filter(row => {
    const [day, month, year] = row.date.split("/");
    return (
      (selectedYear ? year === selectedYear : true) &&
      (selectedMonth ? month === selectedMonth : true) &&
      (selectedDay ? day === selectedDay : true) && // Filter by day
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
    const fileName = `${category}_${selectedYear}_${selectedMonth}${selectedDay ? `_${selectedDay}` : ''}${selectedConsumerId ? `_${selectedConsumerId}` : ''}.csv`;
    
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

  // Generate unique days for the selected month and year
  const uniqueDays = selectedYear && selectedMonth
    ? [...new Set(rows
        .filter(row => {
          const [day, month, year] = row.date.split("/");
          return year === selectedYear && month === selectedMonth;
        })
        .map(row => row.date.split("/")[0]))]
    : [];

  return (
    <>
      <div className="flex lg:flex flex-wrap items-center gap-4 mb-4">
        {/* Year Selector */}
        {noDataAvailable ? (
          <span className="px-4 text-2xl font-medium uppercase text-red-500">Don't have any data</span>
        ) : (
          <>
            <SelectSmall
              values={uniqueYears}
              item={"Year"}
              onValueChange={(year) => {
                setSelectedYear(year);
                setSelectedMonth(""); // Reset month when year changes
                setSelectedDay(""); // Reset day when year changes
                setSelectedConsumerId(""); // Reset consumer ID when year changes
              }}
            />

            {/* Month Selector */}
            {selectedYear && uniqueMonths.length > 0 && (
              <SelectSmall
                values={uniqueMonths}
                item={"Month"}
                onValueChange={(month) => {
                  setSelectedMonth(month);
                  setSelectedDay(""); // Reset day when month changes
                  setSelectedConsumerId(""); // Reset consumer ID when month changes
                }}
              />
            )}

            {/* Day Selector */}
            {selectedMonth && uniqueDays.length > 0 && (
              <SelectSmall
                values={uniqueDays}
                item={"Day (Optional)"}
                onValueChange={setSelectedDay}
              />
            )}

            {/* Consumer ID Selector */}
            {selectedMonth && consumerIds.length > 0 && (
              <SelectSmall
                values={consumerIds}
                item={"Consumer ID (Optional)"}
                onValueChange={setSelectedConsumerId}
              />
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
      <div style={{ height: "100%", width: "100%"  }}>
        <DataGrid
          rows={filteredRows}
          disableColumnMenu
          disableColumnSelector
          columns={columns}
          columnHeaderHeight={30}
          showCellVerticalBorder
          autoPageSize
          // hideFooter
          hideFooterSelectedRowCount
          rowHeight={34}
          checkboxSelection={checkbox}
        />
      </div>
    </>
  );
}

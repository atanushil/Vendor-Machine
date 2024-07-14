import React from 'react';
import DataTable from './table/DataTable';

export default function Dashboard() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-lg h-[70vh]">
      <DataTable/>
    </div>
  );
}

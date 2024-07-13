import React, { useState } from 'react';

export default function Upload() {
  const [month, setMonth] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the file upload and send email logic here
    alert(`Uploaded: ${file.name} for month: ${month}`);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Upload Segment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Choose Month:</label>
          <input 
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Upload Excel File:</label>
          <input 
            type="file"
            accept=".xlsx, .xls"
            onChange={(e) => setFile(e.target.files[0])}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Send Email
        </button>
      </form>
    </div>
  );
}

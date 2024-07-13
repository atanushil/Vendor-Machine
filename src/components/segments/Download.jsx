import React, { useState } from 'react';

export default function Download() {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [category, setCategory] = useState('');
  const [id, setId] = useState('');

  const handleDownload = () => {
    // Handle download logic here
    if (id) {
      alert(`Downloading data for ID: ${id} from ${category} for ${month}/${year}`);
    } else {
      alert(`Downloading all data for category: ${category} for ${month}/${year}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Download Segment</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Choose Year:</label>
        <select 
          value={year} 
          onChange={(e) => setYear(e.target.value)} 
          required 
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">Select Year</option>
          {[...Array(10).keys()].map((i) => {
            const yearOption = new Date().getFullYear() - i;
            return <option key={yearOption} value={yearOption}>{yearOption}</option>;
          })}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Choose Month:</label>
        <select 
          value={month} 
          onChange={(e) => setMonth(e.target.value)} 
          required 
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">Select Month</option>
          {Array.from({ length: 12 }, (v, k) => k + 1).map((m) => (
            <option key={m} value={m}>{new Date(0, m - 1).toLocaleString('default', { month: 'long' })}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Choose Category:</label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          required 
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">Select Category</option>
          <option value="Category1">Category 1</option>
          <option value="Category2">Category 2</option>
          <option value="Category3">Category 3</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Choose ID (Optional):</label>
        <select 
          value={id} 
          onChange={(e) => setId(e.target.value)} 
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">Select ID (Optional)</option>
          <option value="1">ID 1</option>
          <option value="2">ID 2</option>
          <option value="3">ID 3</option>
        </select>
      </div>
      <button 
        onClick={handleDownload} 
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
      >
        Download
      </button>
    </div>
  );
}

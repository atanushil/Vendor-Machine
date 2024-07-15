import React from 'react';

export default function SelectSmall({ disabled,item, values, onValueChange }) {
  const [selectedValue, setSelectedValue] = React.useState("None");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    if (onValueChange) {
      onValueChange(newValue === "None" ? "" : newValue); // Call the callback with the new value
    }
  };

  return (
    <div className="flex flex-col m-2">
      <select
        id="select"
        value={selectedValue}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="None" disabled={disabled}>
          {item}
        </option>
        {values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

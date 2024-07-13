import React from "react";

export default function Profile() {
  return (
    <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg border border-collapse border-blue-200">
      <h1 className="text-3xl font-bold text-green-300 text-center mb-6">
        User Profile
      </h1>
      <div className="mb-4">
        <label className="block text-blue-700">Name: John Doe</label>
      </div>
      <div className="mb-4">
        <label className="block text-blue-700">Email: johndoe@example.com</label>
      </div>
      <div className="mb-4">
        <label className="block text-blue-700">Role: Vendor</label>
      </div>
    </div>
  );
}

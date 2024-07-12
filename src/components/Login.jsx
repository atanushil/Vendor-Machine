import React from "react";

export default function Login({ setIsLoggedIn }) {
  return (
    <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">
        Vendor Machine Login
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsLoggedIn(true);
        }}
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            User Email Id
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            required
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

import React, { useState } from "react";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
    setIsLoggedIn(true);
  };

  return (
    <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg border border-collapse border-blue-200">
      <h1 className="text-3xl font-bold text-green-300 text-center mb-6">
        Vendor Machine Login
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-blue-700">
            User Email Id
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-blue-700">
            Password
          </label>
          <input
            required
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-blue-400 rounded-lg border focus:ring-2 focus:ring-blue-600"
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

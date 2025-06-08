import React from "react";

// add form to add
// 1. room id
// 2. user id

// add tailwind styles

export const Home = () => {
  return (
    // form-wrapper
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Home</h1>
      <form className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="roomId"
          >
            Room ID
          </label>
          <input
            type="text"
            id="roomId"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Room ID"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="userId"
          >
            User ID
          </label>
          <input
            type="text"
            id="userId"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter User ID"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={(e) => {
            e.preventDefault();
            // Handle form submission logic here
          }}
        >
          Join Room
        </button>
      </form>
    </div>
  );
};

export default Home;

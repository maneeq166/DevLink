import React from "react";

const Signup = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <form className="w-full max-w-md bg-gray-800 text-white rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          {/* <img
            className="h-20 w-20"
            src="https://dummyimage.com/64x64"
            alt="logo"
          /> */}
        </div>
        <h2 className="text-3xl font-semibold text-center mb-8">Login</h2>

        <div className="mb-4">
          <label className="block text-sm mb-2">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2">Password</label>
          <input
            type="password"
            placeholder="********"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md text-white font-semibold transition-all duration-200"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <span className="text-blue-400 hover:underline cursor-pointer">
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;

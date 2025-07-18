import React from "react";

const Hero = () => {
  return (
    <section className="bg-gray-900 text-white min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Save, Share & Explore Links
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Store your favorite links in one place, share them with the world, and discover what others are bookmarking.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg">
            Get Started
          </button>
          <button className="border border-gray-400 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg">
            Explore Public Links
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

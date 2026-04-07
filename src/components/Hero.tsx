import React from "react";
import hero1 from "../assets/hero-img-1.jpg";

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero1})` }}
      ></div>

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* TEXT CONTENT */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
          Find Your Dream Apartment
        </h1>

        <p className="text-lg md:text-xl text-white mt-4 max-w-2xl">
          Search and discover the perfect home that fits your lifestyle.
        </p>

        <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg transition">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
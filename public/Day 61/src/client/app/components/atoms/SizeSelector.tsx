"use client";

import React from "react";

const SizeSelector = () => {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-3 mt-1">
        <p className="font-medium text-lg">Size:</p>
        {["XS", "S", "M", "L", "XL"].map((size) => (
          <button
            key={size}
            className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100"
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;

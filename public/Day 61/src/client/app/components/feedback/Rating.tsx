"use client";

import React from "react";

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={`text-yellow-500 text-[21px] ${
            index < rating ? "text-opacity-100" : "text-opacity-30"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;

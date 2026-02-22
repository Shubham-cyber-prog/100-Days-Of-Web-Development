import React from "react";

function Container({ children }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {children}
    </div>
  );
}

export default Container;

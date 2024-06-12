import React, { useState } from "react";

function Dropdown({ value, onChange, options, placeholder }) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="p-3 rounded-full bg-gray-700 text-white w-full"
      >
        {value === "" ? placeholder : value}
      </button>
      {showOptions && (
        <div className="absolute mt-2 bg-gray-700 rounded-lg shadow-lg z-10 w-full">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                onChange(option);
                setShowOptions(false);
              }}
              className="block px-4 py-2 text-start hover:bg-gray-800 text-white w-full"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function Input({ value, onChangeHandler, placeholder }) {
  const [focus, setFocus] = useState(false);
  return (
    <div className="flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="relative">
        {" "}
        <input
          type="text"
          className="h-10 w-96 pr-8 pl-5 rounded shadow focus:outline-none"
          placeholder={placeholder}
          onChange={onChangeHandler}
          value={value}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        <div className="absolute top-3 right-3">
          <FaSearch
            className="text-gray-400 hover:text-gray-500"
            fontSize="large"
          />
        </div>
        {/* // SEARCH DROPDOWN */}
        {focus && (
          <div
            className="w-96 pr-1 pl-5 rounded shadow-xl relative overflow-y-scroll bg-white mt-1"
            style={{ minHeight: "50px" }}
          >
            <div className="flex justify-start pb-10 max-h-40 overflow-y-scroll w-full">
              <ul className="text-gray-900 text-left">
                {["one", "two", "three", "four", "five"].map((item) => {
                  return (
                    <li key={item} className="px-3 py-1 w-full">
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="absolute bottom-2 right-5">
              <button className="bg-red-500 hover:bg-red-700 px-4 p-1 text-white rounded-md">
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;

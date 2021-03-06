import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import {useOnClickOutside} from '../../../hooks/useOnClickoutside'
function Input({
  value,
  onChangeHandler,
  placeholder,
  searchQuerys,
  setSearchQuery,
}) {
  const [focus, setFocus] = useState(false);
  const inputRef = useRef(null);
  const suggestionRef = useRef(null);
  const clearQueries = function (e) {
    setSearchQuery([]);
    setFocus(false);
  };
  useOnClickOutside(suggestionRef, () => setFocus(false));
  useEffect(() => {
    setFocus(false);
  }, [searchQuerys]);
  return (
    <div className="flex justify-center items-center absolute left-0 right-0 px-4 sm:px-6 lg:px-8">
      <div className="relative w-full sm:w-1/3  ">
        {" "}
        <input
          type="text"
          className="h-10 w-full pr-8 pl-5 rounded shadow-lg focus:outline-none"
          placeholder={placeholder}
          onChange={(e) => onChangeHandler(e.target.value)}
          value={value}
          onFocus={() => setFocus(true)}
          //onBlur={() => setFocus(false)}
          ref={inputRef}
        />
        <div className="absolute top-3 right-3">
          <FaSearch
            className="text-gray-400 hover:text-gray-500"
            fontSize="large"
          />
        </div>
        {/* // SEARCH DROPDOWN */}
        {focus && searchQuerys.length > 0 && (
          <div
            className="pr-1 pl-5 rounded shadow-xl overflow-y-scroll bg-white mt-1 z-20"
            style={{ minHeight: "50px" }}
            ref={suggestionRef}
          >
            <div className="flex justify-start pb-10 max-h-40 overflow-y-scroll w-full">
              <ul className="text-gray-900 text-left mt-4 mb-2 w-full p-1">
                {searchQuerys.map((item) => {
                  return (
                    <li
                      key={item}
                      className="p-2 w-full hover:bg-gray-200 rounded cursor-pointer"
                      onClick={() => onChangeHandler(item)}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="absolute bottom-2 right-5">
              <button
                className="bg-red-500 hover:bg-red-700 px-4 p-1 text-white rounded-md"
                onClick={(e) => {
                  setFocus(true);
                  clearQueries(e);
                }}
              >
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

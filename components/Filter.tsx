"use client";
import { useState } from "react";

function Filter() {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow((prevShow) => !prevShow);
  };

  return (
    <div className={`block w-[80%] mx-auto relative`}>
      <div
        className={`flex w-full justify-start px-6 border items-center my-[20px] shadow mx-auto h-[70px] rounded-lg`}
      >
        <button
          onClick={() => handleClick()}
          type="button"
          className={`flex w-[130px] active:opacity-60 h-[35px] rounded-[10px] border justify-center items-center space-x-2`}
        >
          Filter
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div
        className={`${
          show ? "block" : "hidden"
        } absolute top-[70px] w-[50%] z-[29] flex p-4 bg-white shadow`}
      >
        <div className={`block w-[250px] p-3 border rounded-lg`}>
          <h3 className={`text-center`}>Categories</h3>
          <ul className={`space-y-3`}>
            <li className={`flex space-x-3 items-center`}>
              <input type="checkbox" name="solar" id="solar" />
              <label htmlFor="solar">Solar</label>
            </li>
            <li className={`flex space-x-3 items-center`}>
              <input type="checkbox" name="protocols" id="protocols" />
              <label htmlFor="protocols">Protocols</label>
            </li>
            <li className={`flex space-x-3 items-center`}>
              <input type="checkbox" name="art" id="art" />
              <label htmlFor="art">Art</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Filter;

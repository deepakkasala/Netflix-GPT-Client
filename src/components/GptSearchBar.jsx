import React from "react";
import { langArray } from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  console.log(langKey);

  // let arr = langArray.filter((lan) => lan[1]);
  let arr = langArray.filter((lang) => {
    if (lang[0] === langKey) {
      return lang[1];
    }
  });
  console.log(arr[0][1]);

  // console.log(langArray[0]);
  // console.log(langArray[1]);
  // console.log(langArray[2]);

  return (
    <div className="pt-[10%] flex justify-center">
      <form className="flex bg-black w-1/2 shadow-lg shadow-slate-600">
        <input
          type="text"
          placeholder={arr[0][1].gptSearchPlaceholder}
          className="p-4 m-4 bg-gray-900 border border-gray-700 w-4/5 text-white rounded"
        />
        <button
          type="submit"
          className="w-36 bg-red-500 hover:bg-red-800 text-white m-4 rounded cursor-pointer"
        >
          {arr[0][1].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;

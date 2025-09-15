import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BACKGROUND_IMAGE } from "../utils/constants";

const GptSearch = () => {
  return (
    <div>
      {/* Background Image with overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          className="w-full h-full object-cover"
          src={BACKGROUND_IMAGE}
          alt="Netflix Background"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearch;

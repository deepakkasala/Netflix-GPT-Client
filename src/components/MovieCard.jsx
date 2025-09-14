import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterUrl }) => {
  return (
    <div className="min-w-[120px] sm:min-w-[150px] md:min-w-[180px] lg:min-w-[200px] mr-2 sm:mr-3">
      <img
        alt="Movie card"
        src={IMG_CDN_URL + posterUrl}
        className="w-full rounded-md hover:scale-105 md:hover:scale-110 transition-transform duration-300"
      />
    </div>
  );
};

export default MovieCard;

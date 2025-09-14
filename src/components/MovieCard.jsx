import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterUrl }) => {
  return (
    <div className="min-w-[190px] mr-4">
      <img
        alt="Movie card"
        src={IMG_CDN_URL + posterUrl}
        className="w-full rounded-md hover:scale-110 transition-transform duration-300"
      />
    </div>
  );
};

export default MovieCard;

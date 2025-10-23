import React from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setIsViewModal, setSelectedMovie } from "../redux/moviesSlice";

const MovieCard = ({ posterUrl, gptMovieSuggestions, movie }) => {
  const dispatch = useDispatch();
  if (!posterUrl) return null;
  const handleClick = () => {
    dispatch(setIsViewModal(true));
    dispatch(setSelectedMovie(movie));
  };
  return !gptMovieSuggestions ? (
    <div
      onClick={handleClick}
      className="min-w-[120px] sm:min-w-[150px] md:min-w-[180px] lg:min-w-[200px] mr-2 sm:mr-3 hover:scale-105 md:hover:scale-110 transition-transform duration-300"
    >
      <img
        alt="Movie card"
        src={IMG_CDN_URL + posterUrl}
        className="w-full rounded-md hover:cursor-pointer"
      />
    </div>
  ) : (
    <div className="w-36 md:w-48 pr-4">
      <img alt="Movie Card" src={IMG_CDN_URL + posterUrl} />
    </div>
  );
};

export default MovieCard;

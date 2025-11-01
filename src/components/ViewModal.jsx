import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import { API_URL } from "../utils/constants";
import moment from "moment";
import VideoBackground from "./VideoBackground";
import { AiOutlinePlus } from "react-icons/ai";
import { SlLike } from "react-icons/sl";
import { MdCheck } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToWatchList, removeFromWatchList } from "../redux/userSlice";
const ViewModal = ({ movie, onClose }) => {
  const [genresData, setGenresData] = useState([]);
  const [languagesData, setLanguagesData] = useState([]);
  const [movieId, setMovieId] = useState("");
  const [movieData, setMovieData] = useState({});
  const { original_title, overview, genre_ids } = movie;
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  console.log(movie);

  // Fetch IMDb id for movie
  const getMovieIds = async () => {
    const { data } = await axios.get(
      `${API_URL}tmdb/get-external-ids/${movie.id}`
    );
    setMovieId(data.data.imdb_id);
  };

  // Fetch movie details using OMDb id
  const getMovieDetailsByOmdbId = async () => {
    if (!movieId) return;
    const { data } = await axios.get(`${API_URL}tmdb/movie-details/${movieId}`);
    console.log(data.data);
    setMovieData(data.data);
  };
  const isWatchListed = user?.watchList?.includes(movie.id);

  const handleToggleWatchList = async () => {
    try {
      if (isWatchListed) {
        await axios.post(`${API_URL}auth/remove-from-watchlist/${movie.id}`);
        dispatch(removeFromWatchList(movie.id));
        toast.success("Removed from watchlist");
      } else {
        await axios.post(`${API_URL}auth/add-to-watchlist/${movie.id}`);
        dispatch(addToWatchList(movie.id));
        toast.success("Added to watchlist");
      }
    } catch (error) {
      console.log(error);

      toast.error("Action failed, please try again");
    }
  };

  useEffect(() => {
    getMovieIds();
  }, []);

  useEffect(() => {
    getMovieDetailsByOmdbId();
  }, [movieId]);

  const audioArray = [
    "Spatial Audio",
    "Dolby Atmos",
    "5.1 Surround Sound",
    "Standard Stereo",
  ];
  const videoArray = ["4K", "HD", "SD", "Full HD"];
  const randomAudioIndex = Math.floor(Math.random() * audioArray.length);
  const randomVideoIndex = Math.floor(Math.random() * videoArray.length);
  const randomAudioElement = audioArray[randomAudioIndex];
  const randomVideoElement = videoArray[randomVideoIndex];
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#181818] w-full max-w-6xl rounded-lg shadow-2xl overflow-y-auto max-h-[90vh] relative animate-fadeIn text-[18px] md:text-[20px] leading-relaxed">
        {/* Video Background */}
        <div className="relative">
          <VideoBackground movieId={movie.id} />
          <button onClick={onClose} className="absolute top-4 right-4">
            <IoCloseOutline
              className="bg-black/70 text-white hover:cursor-pointer rounded-full p-2"
              size={50}
            />
          </button>
        </div>

        {/* Details Section */}
        <div className="p-10 text-white space-y-14">
          {/* Basic info row */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div className="flex flex-col gap-4">
              <div className="flex gap-8">
                <div className="text-4xl font-bold tracking-wide">
                  {movieData.Title || original_title}
                </div>
              </div>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={handleToggleWatchList}
                  className="border-4 border-gray-500 rounded-full p-3 text-gray-50 bg-gray-800 hover:bg-gray-900 hover:text-white hover:border-white transition duration-300 hover:cursor-pointer"
                >
                  {isWatchListed ? (
                    <MdCheck size={25} />
                  ) : (
                    <AiOutlinePlus size={25} />
                  )}
                </button>
                <button className="border-4 border-gray-500 rounded-full p-3 text-gray-50 bg-gray-800 hover:bg-gray-900 hover:text-white hover:border-white transition duration-300 hover:cursor-pointer">
                  <SlLike size={25} />
                </button>
              </div>

              <div className="flex items-center gap-5 text-gray-300 text-[20px] font-medium">
                <p>
                  {movieData.Year || moment(movie.release_date).format("YYYY")}
                </p>
                <p>{movieData.Runtime}</p>
                <span className="border border-gray-500 text-sm px-2 py-0.5 rounded">
                  {randomVideoElement}
                </span>
                <span className="border border-gray-500 text-sm px-2 py-0.5 rounded">
                  {randomAudioElement}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-gray-400 text-[16px] font-medium">
                <p>Rated: </p>
                <span className="border border-gray-500 px-2 py-0.5 text-sm rounded text-white">
                  {movieData.Rated
                    ? movieData.Rated
                    : "Content restricted to adults"}
                </span>
              </div>

              {/* Optional Top tag example */}
              <div className="flex items-center gap-3 mt-3">
                <span className="bg-red-600 px-3 py-1 text-sm font-bold rounded">
                  TOP {Math.floor(Math.random() * 10) + 1}
                </span>
                <p className="text-2xl font-semibold">
                  #{Math.floor(Math.random() * 10) + 1} in Movies Today
                </p>
              </div>

              {/* Movie plot */}
              <p className="text-[20px] mt-6 text-gray-200 max-w-2xl leading-snug">
                {overview || movieData.Plot}
              </p>
            </div>

            {/* Right-side details */}
            <div className="text-gray-400 text-[20px] mt-10 md:mt-0 md:w-[45%] space-y-3">
              <p>
                <span className="text-gray-500 font-semibold">Cast: </span>
                <span className="text-white font-medium">
                  {movieData.Actors}
                </span>
              </p>
              <p>
                <span className="text-gray-500 font-semibold">Genres: </span>
                <span className="text-white font-medium">
                  {movieData.Genre}
                </span>
              </p>
              <p>
                <span className="text-gray-500 font-semibold">Languages: </span>
                <span className="text-white font-medium">
                  {movieData.Language}
                </span>
              </p>
            </div>
          </div>

          {/* About Section */}
          <div className="border-t border-gray-700 pt-10 text-[20px]">
            <h2 className="text-3xl font-semibold mb-8">
              About {movieData.Title || original_title}
            </h2>
            <div className="space-y-3 text-gray-400 text-[20px]">
              <p>
                <span className="text-gray-500 font-semibold">Director: </span>
                <span className="text-white">{movieData.Director}</span>
              </p>
              <p>
                <span className="text-gray-500 font-semibold">Cast: </span>
                <span className="text-white">{movieData.Actors}</span>
              </p>
              <p>
                <span className="text-gray-500 font-semibold">Writer: </span>
                <span className="text-white">{movieData.Writer}</span>
              </p>
              <p>
                <span className="text-gray-500 font-semibold">Genres: </span>
                <span className="text-white">{movieData.Genre}</span>
              </p>
              <p>
                <span className="text-gray-500 font-semibold">
                  Released On:{" "}
                </span>
                <span className="text-white">
                  {movieData.Released || "Not Available"}
                </span>
              </p>
              <p>
                <span className="text-gray-500 font-semibold">
                  Box Office:{" "}
                </span>
                <span className="text-white">{movieData.BoxOffice}</span>
              </p>
              <p>
                <span className="text-gray-500 font-semibold">Country: </span>
                <span className="text-white">{movieData.Country}</span>
              </p>
              <p>
                <span className="text-gray-500 font-semibold">
                  Movie Plot:{" "}
                </span>
                <span className="text-white">{movieData.Plot || overview}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;

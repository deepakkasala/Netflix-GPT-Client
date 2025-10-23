import React from "react";

import VideoBackground from "./VideoBackground";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
import VideoTitle from "./VideoTitle";
const ViewModal = ({ movie, onClose }) => {
  const [genresData, setGenresData] = useState([]);
  const { original_title, overview, genre_ids } = movie;
  const getGenreIds = async () => {
    const { data } = await axios.get(`${API_URL}tmdb/genres`);
    setGenresData(data.data.genres);
  };
  console.log(movie);
  useEffect(() => {
    getGenreIds();
  }, []);
  const movieGenres = genresData
    .filter((genre) => genre_ids.includes(genre.id))
    .map((genre) => genre.name);
  console.log(movieGenres);
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#181818] w-full max-w-7xl rounded-lg shadow-2xl overflow-y-auto max-h-[90vh] relative animate-fadeIn">
        <div className="relative">
          {/* <VideoTitle title={movie.original_title} overview={movie.overview} /> */}
          <VideoBackground movieId={movie.id} />

          <button onClick={onClose} className="absolute top-4 right-4">
            <IoCloseOutline
              className="bg-black/70 text-white hover:cursor-pointer rounded-full p-2"
              size={50}
            />
          </button>
        </div>
        <div className="p-6 text-white">
          {" "}
          <h2 className="text-4xl font-semibold mb-4">
            About {original_title}
          </h2>
          <p className="mt-10 mb-4 text-xl">{overview}</p>
        </div>
        <div className="p-6 border-t border-gray-700 flex flex-col md:flex-row md:space-x-8">
          <div className="text-gray-400 flex items-center gap-2 mb-10">
            <h2 className="text-xl">Genres:</h2>
            {movieGenres &&
              movieGenres.map((genre) => (
                <p className="text-white text-xl">{genre}</p>
              ))}
          </div>
          <div className="text-gray-400 flex items-center gap-2 mb-10">
            <h2 className="text-xl">Release Date:</h2>
            <p className="text-white text-xl">
              {moment(movie.release_date).format("MMMM D, YYYY")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;

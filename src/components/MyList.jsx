import React, { useEffect, useState } from "react";
import Header from "./Header";
import MovieList from "./MovieList";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setIsViewModal, setSelectedMovie } from "../redux/moviesSlice";
import ViewModal from "./ViewModal";

const MyList = () => {
  const [watchlistedMovies, setWatchlistedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Sample: Assuming user data (with watchlist IDs) is stored in localStorage
  const user = useSelector((store) => store.user);
  const isViewModal = useSelector((store) => store.movies.isViewModal);
  const selectedMovie = useSelector((store) => store.movies.selectedMovie);
  const handleCloseModal = () => {
    dispatch(setIsViewModal(false));
    dispatch(setSelectedMovie(null));
  };
  console.log(isViewModal);
  console.log(user.watchList);

  useEffect(() => {
    const fetchWatchlistedMovies = async () => {
      if (!user || !user.watchList || user.watchList.length === 0) {
        setWatchlistedMovies([]);
        setLoading(false);
        return;
      }

      try {
        const movieDetailsPromises = user.watchList.map(async (movieId) => {
          const res = await axios.get(
            `${API_URL}tmdb/movie-details-tmdb/${movieId}`
          );
          return res.data.data; // because backend sends { success: true, data }
        });

        const results = await Promise.all(movieDetailsPromises);
        setWatchlistedMovies(results);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlistedMovies();
  }, [isViewModal, user.watchList]);

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Fixed Header */}
      <Header />

      {/* Main Content */}
      <div className="pt-28 px-4 sm:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">My List</h1>

        {loading ? (
          <p className="text-gray-400 text-lg">Loading your watchlist...</p>
        ) : watchlistedMovies.length === 0 ? (
          <p className="text-gray-400 text-lg">
            No movies in your watchlist yet.
          </p>
        ) : (
          <MovieList title="Your Watchlist" movies={watchlistedMovies} />
        )}
      </div>
      {isViewModal && (
        <ViewModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default MyList;

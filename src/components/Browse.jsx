import { useEffect, useState } from "react";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";
import { useDispatch, useSelector } from "react-redux";
import ViewModal from "./ViewModal";
import { setIsViewModal, setSelectedMovie } from "../redux/moviesSlice";

const Loader = () => (
  <div className="flex justify-center items-center h-screen bg-[#141414]">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
  </div>
);

const Browse = () => {
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [loading, setLoading] = useState(true);
  const isViewModal = useSelector((store) => store.movies.isViewModal);
  const selectedMovie = useSelector((store) => store.movies.selectedMovie);
  const handleCloseModal = () => {
    dispatch(setIsViewModal(false));
    dispatch(setSelectedMovie(null));
  };
  console.log(isViewModal);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useTrendingMovies("day");
  useTrendingMovies("week");

  return (
    <>
      <div>
        <Header />
        {showGptSearch ? (
          <GptSearch />
        ) : (
          <>
            <MainContainer />
            <SecondaryContainer />
          </>
        )}
      </div>
      {isViewModal && (
        <ViewModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Browse;

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
import { useSelector } from "react-redux";

const Loader = () => (
  <div className="flex justify-center items-center h-screen bg-black">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
  </div>
);

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [loading, setLoading] = useState(true);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useTrendingMovies("day");
  useTrendingMovies("week");

  useEffect(() => {
    // simulate a global loader until everything is mounted
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // wait 1.5s for all hooks to run

    return () => clearTimeout(timer);
  }, [loading]);

  if (loading) return <Loader />;

  return (
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
      <div className="w-full h-40 bg-black">Footer</div>
    </div>
  );
};

export default Browse;

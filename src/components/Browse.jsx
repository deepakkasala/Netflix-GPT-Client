import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useTrendingMovies("day");
  useTrendingMovies("week");

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
      {/*       
        -MainContainer
            -Video Container 
            -Video Title 
        -SecondaryContainer
            -MoviesList*n
              -Cards*n
    */}
    </div>
  );
};

export default Browse;

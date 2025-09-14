import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store?.movies);
  console.log(movies);

  return (
    <div className="bg-black">
      {movies && (
        <div className="-mt-64 z-20 relative">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Popular"} movies={movies.popularMovies} />
          <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
          <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />
          <MovieList
            title={"Today's Trending Movies"}
            movies={movies.trendingMoviesDay}
          />
          <MovieList
            title={"This Week Trending"}
            movies={movies.trendingMoviesWeek}
          />
        </div>
      )}
      {/* MovieList - nowPlaying
      -Movie List * n
    MovieList - Trending
    MovieList - upcoming
    MovieList - toprated */}
    </div>
  );
};

export default SecondaryContainer;

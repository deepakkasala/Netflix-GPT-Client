import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store?.movies);

  //-mt-40 sm:-mt-56 md:-mt-64
  return (
    <div className="bg-black w-full">
      {movies && (
        <div className="-mt-72 z-20 relative">
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
    </div>
  );
};

export default SecondaryContainer;

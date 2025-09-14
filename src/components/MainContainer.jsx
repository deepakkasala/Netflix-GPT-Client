import React from "react";
import { useSelector } from "react-redux";
import MultiMovieTrailerPlayer from "./MultiMovieTrailerPlayer";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies || movies.length === 0) return null;

  return (
    <div className="relative">
      <MultiMovieTrailerPlayer movies={movies} />
    </div>
  );
};

export default MainContainer;

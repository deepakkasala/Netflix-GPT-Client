import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  console.log(movieNames, movieResults);

  return !movieNames || !movieResults ? (
    <div className="z-30 bg-white text-2xl text-black">loading...</div>
  ) : (
    <div className="m-4 p-4 bg-black/70">
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList
            key={index}
            title={movieName}
            movies={movieResults[index]}
            gptMovieSuggestions={true}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;

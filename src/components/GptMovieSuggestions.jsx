import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  console.log(movieNames, movieResults);
  if (!movieNames || !movieResults) return <div>loading...</div>;
  return (
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

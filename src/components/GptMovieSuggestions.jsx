import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import Loader from "./Loader";

const GptMovieSuggestions = () => {
  const { movieNames, movieResults, isGptSuggestionsLoading } = useSelector(
    (store) => store.gpt
  );
  return isGptSuggestionsLoading ? (
    <Loader />
  ) : (
    (movieNames || movieResults) && (
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
    )
  );
};

export default GptMovieSuggestions;

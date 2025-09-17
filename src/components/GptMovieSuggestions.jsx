import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieNames, movieResults, isGptSuggestionsLoading } = useSelector(
    (store) => store.gpt
  );
  return isGptSuggestionsLoading ? (
    <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-20">
      <div className="loader border-4 border-t-4 border-gray-200 rounded-full w-12 h-12 animate-spin"></div>
    </div>
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

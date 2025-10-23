import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
const MovieList = ({ title, movies, gptMovieSuggestions }) => {
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.8; // scroll ~80% of visible width
    scrollRef.current.scrollTo({
      left:
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="ml-2 sm:ml-4 md:ml-8 my-8 sm:my-12">
      <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
        {title}
      </h2>

      {/* Row + arrows */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black hover:bg-black/60 p-1 sm:p-2 rounded-full opacity-40 hover:opacity-80 transition"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>

        {/* Movie Row */}
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll scrollbar-hide space-x-2 sm:space-x-3 scroll-smooth overflow-y-hidden"
        >
          {movies?.map((movie) => (
            <MovieCard
              key={movie.id}
              posterUrl={movie.poster_path}
              movie={movie}
              gptMovieSuggestions={gptMovieSuggestions}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black hover:bg-black/60 p-1 sm:p-2 rounded-full opacity-40 hover:opacity-80 transition"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default MovieList;

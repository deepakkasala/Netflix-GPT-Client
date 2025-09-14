import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
const MovieList = ({ title, movies }) => {
  console.log(title, movies);

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
    <div className="ml-8 my-18 ">
      <h2 className="text-white text-3xl font-bold mb-6">{title}</h2>

      {/* Wrap row + arrows in relative container */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black hover:bg-black/60 p-2 rounded-full opacity-40 hover:opacity-80 transition"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* Movie Row */}
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll scrollbar-hide space-x-3 scroll-smooth overflow-y-hidden"
        >
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterUrl={movie.poster_path} />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black hover:bg-black/60 p-2 rounded-full opacity-40 hover:opacity-80 transition"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default MovieList;

{
  /* <div className="px-6">
      <h1 className="text-white text-xl font-bold mb-2">{title}</h1>

      {/* SCROLLABLE ROW */
}
//   <div className="flex overflow-x-scroll scrollbar-hide space-x-4">
//     {movies?.map((movie) => (
//       <div key={movie.id} className="flex-shrink-0 w-[180px]">
//         <img
//           src={IMG_CDN_URL + movie.poster_path}
//           alt={movie.title}
//           className="w-full rounded-md hover:scale-110 transition-transform duration-300"
//         />
//       </div>
//     ))}
//   </div>
// </div> */}

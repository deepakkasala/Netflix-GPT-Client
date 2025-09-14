// import React, { useEffect, useState } from "react";
// import VideoTitle from "./VideoTitle";
// import VideoBackground from "./VideoBackground";

// const MultiMovieTrailerPlayer = ({ movies }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Switch movies every 10 seconds (adjust as you like)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === movies.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 10000);

//     return () => clearInterval(interval);
//   }, [movies]);

//   const currentMovie = movies[currentIndex];

//   return (
//     <div className="relative w-screen">
//       <VideoTitle
//         title={currentMovie.original_title}
//         overview={currentMovie.overview}
//       />
//       <VideoBackground movieId={currentMovie.id} />
//     </div>
//   );
// };

// export default MultiMovieTrailerPlayer;

import React, { useEffect, useState } from "react";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MultiMovieTrailerPlayer = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playCount, setPlayCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playCount < 1) {
        setPlayCount(playCount + 1); // play same trailer second time
      } else {
        setPlayCount(0); // reset count
        setCurrentIndex((prevIndex) =>
          prevIndex === movies.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 15000); // assume avg trailer ~15s

    return () => clearInterval(interval);
  }, [playCount, movies]);

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative w-full">
      <VideoTitle
        title={currentMovie.original_title}
        overview={currentMovie.overview}
      />
      <VideoBackground movieId={currentMovie.id} />
    </div>
  );
};

export default MultiMovieTrailerPlayer;

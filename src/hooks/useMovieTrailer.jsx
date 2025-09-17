import axios from "axios";
import { useDispatch } from "react-redux";
import { API_URL } from "../utils/constants";
import { addTrailerVideo } from "../redux/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  //fetch trailer video and updating the store with trailer video.
  const getMovieVideos = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}tmdb/get-trailers/${movieId}`
      );

      const filteredTrailers = data.trailers.filter(
        (video) => video.type === "Trailer"
      );
      dispatch(addTrailerVideo(filteredTrailers));
    } catch (error) {
      console.log("Error in fetching Trailer Videos", error);
    }
  };

  useEffect(() => {
    if (movieId) getMovieVideos();
  }, [movieId]);
};

export default useMovieTrailer;

import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../redux/moviesSlice";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
const useNowPlayingMovies = () => {
  //Fetch movies data from TMDB API and updating it to Redux store.
  const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    try {
      const { data } = await axios.get(`${API_URL}tmdb/now-playing-movies`);
      dispatch(addNowPlayingMovies(data?.data?.results));
    } catch (error) {
      console.error("Error in fetching now playing movies.", error);
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;

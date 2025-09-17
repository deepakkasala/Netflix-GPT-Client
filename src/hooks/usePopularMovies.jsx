import { useDispatch } from "react-redux";
import { addPopularMovies } from "../redux/moviesSlice";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
const usePopularMovies = () => {
  //Fetch movies data from TMDB API and updating it to Redux store.
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    try {
      const { data } = await axios.get(`${API_URL}tmdb/popular-movies`);
      dispatch(addPopularMovies(data?.data?.results));
    } catch (error) {
      console.log("Error in fetching popular movies", error);
    }
  };
  useEffect(() => {
    getPopularMovies();
  }, []);
};

export default usePopularMovies;

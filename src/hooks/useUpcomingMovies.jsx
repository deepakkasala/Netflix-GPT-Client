import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../redux/moviesSlice";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
const useUpcomingMovies = () => {
  //Fetch movies data from TMDB API and updating it to Redux store.
  const dispatch = useDispatch();

  const getUpcomingMovies = async () => {
    try {
      const { data } = await axios.get(`${API_URL}tmdb/upcoming-movies`);
      dispatch(addUpcomingMovies(data?.data?.results));
    } catch (error) {
      console.log("Error in fetching upcoming movies", error);
    }
  };
  useEffect(() => {
    getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;

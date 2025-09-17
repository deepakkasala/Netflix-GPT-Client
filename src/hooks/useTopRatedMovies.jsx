import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../redux/moviesSlice";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
const useTopRatedMovies = () => {
  //Fetch movies data from TMDB API and updating it to Redux store.
  const dispatch = useDispatch();

  const getTopRatedMovies = async () => {
    try {
      const { data } = await axios.get(`${API_URL}tmdb/top-rated-movies`);
      dispatch(addTopRatedMovies(data?.data?.results));
    } catch (error) {
      console.log("Error in fetching Top rated movies", error);
    }
  };
  useEffect(() => {
    getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;

// import React, { useRef } from "react";
// import { langArray } from "../utils/languageConstants";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// // import client from "../utils/openai";
// import { GoogleGenAI } from "@google/genai";
// import { API_OPTIONS, API_URL } from "../utils/constants";

// import { addGptMoviesResult } from "../redux/gptSlice";

// const GptSearchBar = () => {
//   const dispatch = useDispatch();
//   const searchText = useRef(null);
//   const langKey = useSelector((store) => store.config.lang);
//   // console.log(langKey);

//   // let arr = langArray.filter((lan) => lan[1]);
//   let arr = langArray.filter((lang) => {
//     if (lang[0] === langKey) {
//       return lang[1];
//     }
//   });

//   const searchMovieTmdb = async (movie) => {
//     const data = await axios.get(`${API_URL}tmdb/search-movie/${movie}`);
//     console.log(data.data.results);
//     return data.data.results;
//   };

//   const handleGptSearchClick = async () => {
//     console.log(searchText.current.value);

//     async function main() {
//       try {
//         const response = await axios.post(API_URL + "ai/generate-ai-response", {
//           prompt: searchText.current.value,
//         });

//         let text = response.data.content;
//         // Remove Markdown-style ```json ... ``` wrappers if they exist
//         text = text.replace(/```json|```/g, "").trim();

//         // Parse into real JSON
//         const parsed = JSON.parse(text);
//         // Now you can use parsed.result safely
//         const result = parsed.result.split(",").map((m) => m.trim());
//         //result will be like this : ['Chalti Ka Naam Gaadi', 'Padosan', 'Angoor', 'Gol Maal', 'Bawarchi']
//         console.log(result);
//         // Now for each movie we have to make API call to TMDB to get movies data.
//         const promiseArrayData = result.map((movie) => searchMovieTmdb(movie));
//         // Now this map fn. returns new promises array : [Promise1, Promise2, Promise3,...PromiseN]
//         const tmdbResults = await Promise.all(promiseArrayData);
//         dispatch(
//           addGptMoviesResult({ movieNames: result, movieResults: tmdbResults })
//         );
//       } catch (error) {
//         console.error("Error parsing JSON:", error);
//       }
//       // console.log(response.text);
//     }

//     main();
//   };

//   return (
//     <div className="pt-[10%] flex justify-center">
//       <form
//         className="flex bg-black w-1/2 shadow-lg shadow-slate-600"
//         onSubmit={(e) => e.preventDefault()}
//       >
//         <input
//           type="text"
//           ref={searchText}
//           placeholder={arr[0][1].gptSearchPlaceholder}
//           className="p-4 m-4 bg-gray-900 border border-gray-700 w-4/5 text-white rounded"
//         />
//         <button
//           type="submit"
//           className="w-36 bg-red-500 hover:bg-red-800 text-white m-4 rounded cursor-pointer"
//           onClick={handleGptSearchClick}
//         >
//           {arr[0][1].search}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default GptSearchBar;

import React, { useRef } from "react";
import { langArray } from "../utils/languageConstants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../utils/constants";
import {
  addGptMoviesResult,
  clearGpt,
  toggleIsGptSuggestionsLoading,
} from "../redux/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);
  // const clearGpt = useSelector((store) => store.gpt.clearGpt);
  const langKey = useSelector((store) => store.config.lang);
  let arr = langArray.filter((lang) => {
    if (lang[0] === langKey) {
      return lang[1];
    }
  });

  const searchMovieTmdb = async (movie) => {
    const { data } = await axios.get(`${API_URL}tmdb/search-movie/${movie}`);
    return data.data.results;
  };

  const handleGptSearchClick = async () => {
    dispatch(toggleIsGptSuggestionsLoading(true));
    // const GEMINI_API_KEY = import.meta.env.VITE_APP_GEMINI_API_KEY;
    console.log(searchText.current.value);

    async function main() {
      const response = await axios.post(API_URL + "ai/generate-ai-response", {
        prompt: searchText.current.value,
      });
      let text = response.data.content;
      // Remove Markdown-style ```json ... ``` wrappers if they exist
      text = text.replace(/```json|```/g, "").trim();

      try {
        // Parse into real JSON
        const parsed = JSON.parse(text);
        // Now you can use parsed.result safely
        const result = parsed.result.split(",").map((m) => m.trim());
        //result will be like this : ['Chalti Ka Naam Gaadi', 'Padosan', 'Angoor', 'Gol Maal', 'Bawarchi']
        // Now for each movie we have to make API call to TMDB to get movies data.
        const promiseArrayData = result.map((movie) => searchMovieTmdb(movie));
        // Now this map fn. returns new promises array : [Promise1, Promise2, Promise3,...PromiseN]
        const tmdbResults = await Promise.all(promiseArrayData);
        dispatch(
          addGptMoviesResult({ movieNames: result, movieResults: tmdbResults })
        );
        dispatch(toggleIsGptSuggestionsLoading(false));
      } catch (error) {
        console.error("Error parsing JSON:", error);
        dispatch(toggleIsGptSuggestionsLoading(false));
      } finally {
        dispatch(toggleIsGptSuggestionsLoading(false));
      }
    }

    main();
  };

  const clearSearch = () => {
    console.log("Clicked clear");
    searchText.current.value = null;
    dispatch(clearGpt(null));
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="flex bg-black w-[90%] h-18 md:h-20 text-xs md:text-sm lg:text-md mt-20 sm:w-[60%] sm:mt-10 shadow-lg shadow-slate-600"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          ref={searchText}
          placeholder={arr[0][1].gptSearchPlaceholder}
          className="p-2 m-4 bg-gray-900 border border-gray-700 w-4/5 text-white rounded"
        />
        <button
          type="submit"
          className="w-36 bg-red-500 hover:bg-red-800 text-white mx-2 my-4 rounded cursor-pointer"
          onClick={handleGptSearchClick}
        >
          {arr[0][1].search}
        </button>
        <button
          onClick={clearSearch}
          className="bg-slate-800 text-gray-100 hover:cursor-pointer w-36 my-4 mx-2 rounded p-2"
        >
          Clear search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;

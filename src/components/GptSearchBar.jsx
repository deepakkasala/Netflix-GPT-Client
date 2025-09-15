import React from "react";
import { langArray } from "../utils/languageConstants";

import { useDispatch, useSelector } from "react-redux";
// import client from "../utils/openai";
import { GoogleGenAI } from "@google/genai";
import { API_OPTIONS } from "../utils/constants";
import axios from "axios";
import { addGptMoviesResult } from "../redux/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  console.log(langKey);

  // let arr = langArray.filter((lan) => lan[1]);
  let arr = langArray.filter((lang) => {
    if (lang[0] === langKey) {
      return lang[1];
    }
  });
  console.log(arr[0][1]);

  // console.log(langArray[0]);
  // console.log(langArray[1]);
  // console.log(langArray[2]);

  const searchMovieTmdb = async (movie) => {
    const data = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    console.log(data.data.results);
    return data.data.results;
  };
  const handleGptSearchClick = async () => {
    const GEMINI_API_KEY = import.meta.env.VITE_APP_GEMINI_API_KEY;
    console.log(searchText.current.value);
    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query: " +
      searchText.current.value +
      ". Only give me names of 5 movies, comma separated like the example result given ahead. The result should be in a proper json format lets say example: {result:'Bahubali, RRR, The Conjuring: Last Rites, The Naked Gun, Interstellar'}";
    const ai = new GoogleGenAI({
      apiKey: GEMINI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-001",
        contents: gptQuery,
      });
      // Get the raw text response
      let text = response.text;
      console.log("Raw:", text);
      // Remove Markdown-style ```json ... ``` wrappers if they exist
      text = text.replace(/```json|```/g, "").trim();

      try {
        // Parse into real JSON
        const parsed = JSON.parse(text);
        console.log("Parsed JSON:", parsed);

        // Now you can use parsed.result safely
        const result = parsed.result.split(",").map((m) => m.trim());
        //result will be like this : ['Chalti Ka Naam Gaadi', 'Padosan', 'Angoor', 'Gol Maal', 'Bawarchi']
        console.log(result);
        // Now for each movie we have to make API call to TMDB to get movies data.
        const promiseArrayData = result.map((movie) => searchMovieTmdb(movie));
        // Now this map fn. returns new promises array : [Promise1, Promise2, Promise3,...PromiseN]
        console.log(promiseArrayData);
        const tmdbResults = await Promise.all(promiseArrayData);
        console.log(tmdbResults);
        dispatch(
          addGptMoviesResult({ movieNames: result, movieResults: tmdbResults })
        );
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
      // console.log(response.text);
    }

    main();
    // const response = await client.responses.create({
    //   model: "gpt-4.1-mini",
    //   instructions: "You are a coding assistant that talks like a pirate",
    //   input: "Are semicolons optional in JavaScript?",
    // });

    // console.log(response.output_text);
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form className="flex bg-black w-1/2 shadow-lg shadow-slate-600">
        <input
          type="text"
          placeholder={arr[0][1].gptSearchPlaceholder}
          className="p-4 m-4 bg-gray-900 border border-gray-700 w-4/5 text-white rounded"
        />
        <button
          type="submit"
          className="w-36 bg-red-500 hover:bg-red-800 text-white m-4 rounded cursor-pointer"
          onClick={handleGptSearchClick}
        >
          {arr[0][1].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;

# Netflix-GPT

- Installed npm react-vite scaffold.
- Configured TailwindCSS.
- Built Header Component.
- Configured Routing
- Built Login form & Sign-up form.
- Form Validation.
- Sign-up/Sign-in backend logic
- Integrated Sign-up/Sign-in backend logic with UI
- Configured Redux store.
- Bugfix : When user login and logout.
- Store the image URLs into constants file.
- Added Protected route and Private route for dashboard and login components for authorized access
- Created an account in TMDB website and got access to movies data via APIs.
- Created Now playing end-point and got Nowplaying movies data to frontend
- Created custom hook for now playing movies
- Updated redux store with movies data
- Built The Browse page by splitting the page to Main container and secondary container
- Fetched data for trailer video.
- Updated the trailer video to redux store.
- Integrated the embedded code of Youtube to make the trailer to video play
- Added auto play functionality to trailer video
- Built secondary container.
- Added new hooks to fetch movies data where each hook fetches a kind of movies data(i.e, popular, trending, upcoming, top-rated,etc.)
- Built Movie list container to have each kind of movie data fetched using hooks.
- Built Movie card to show each movie in the movie list.
- Added responsiveness to entire app built up to now.
- Added GPT Search Button to header
- Built GPT search bar and added dynamic multi-language switching functionality in search bar
- Connected App to Gemini AI via gemini Api key, and implemented GPT search functionality in our application.
- After fetching movies from GPT exposed movie list to TMDB API to get the movies data.
- Built GPT Suggestion bar to show resultant movies.
- Used Movie List and Movie Card components to render resultant movies on suggestions page.
- improved over all performance of the application by limiting the number of API calls made to TMDB through memoization in every hook.
- Made the App fully responsive.
- Faced issues while calling TMDB apis directly from frontend due to DNS/ISP network issues with TMDB website in our region (INDIA).
- So the entire TMDB API calling logic is moved to backend by creating REST API endpoints to each & every API of TMDB.
- And after testing the backend apis in postman, finally integrated Backend APIS with frontend
  Add ViewModal component and integrate movie selection functionality
- Introduced ViewModal component for displaying movie details.
- Updated MovieCard to handle movie selection and dispatch Redux actions.
  Enhance TMDB API integration by adding genres endpoint and updating routes; improve user registration and login responses
- Enhanced Browse component to manage modal visibility and selected movie state.
- Added new state properties in moviesSlice for modal management.
- Included moment.js for date formatting in ViewModal.

# Features

- Login/SignUp

  - Login/SignUp form.
  - Redirect to Browse page after successful Login.

- Browse (after authentication):

  - Header
  - Main Movie
    - Trailer & Background
    - Title & Description
    - Movie Suggestions
      - Movie List \* N

- Netflix-GPT
  - Search Bar
  - Movie Suggestions.

# Features

- Login/SignUp

  - Login/SignUp form.
  - Redirect to Browse page after successful Login.

- Browse (after authentication):

  - Header
  - Main Movie
    - Trailer & Background
    - Title & Description
    - Movie Suggestions
      - Movie List \* N

- Netflix-GPT
  - Search Bar
  - Movie Suggestions.

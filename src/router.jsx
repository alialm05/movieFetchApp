import App from './App.jsx'
import GenreMovies from './routes/GenreMovies.jsx'
import Genres from './routes/Genres.jsx'
import MoviePage from './routes/MoviePage.jsx'
import Movies from "./routes/Movies"
import Search from "./routes/Search.jsx"

import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
  {path: "/", element : <App/>, errorElement: <h2> 404 Not Found</h2>},
  {path: "/popular", element : <Movies queryType={"popular"}/>},
  {path: "/upcoming", element : <Movies queryType={"upcoming"}/>},
  {path: "/top_rated", element : <Movies queryType={"top_rated"}/>},
  {path: "/search", element : <Search/>},
  {path: "/genres", element : <Genres/>},
  {path: "/genres/:genreid", element : <GenreMovies/>},
  {path: "/movie_page/:movieid", element : <MoviePage/>},
],)

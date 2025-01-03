import App from './App.jsx'
import GenreMovies from './routes/GenreMovies.jsx'
import Genres from './routes/Genres.jsx'
import MoviePage from './routes/MoviePage.jsx'
import Movies from "./routes/Movies.jsx"
import Search from "./routes/Search.jsx"
import Login from "./routes/Login.jsx"
import SignUp from './routes/Signup.jsx'
import MoviesSaved from './routes/MoviesSaved.jsx'

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
  {path: "/login", element : <Login/>},
  {path: "/signup", element : <SignUp/>},
  {path: "/movies_saved", element : <MoviesSaved/>},
],)

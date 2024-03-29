import MoviePage from "./components/MoviesSeriesPage/Pages/MoviePage/MoviePage";
import SeriesPage from "./components/MoviesSeriesPage/Pages/SeriesPage/SeriesPage";
import ProfileFavorite from "./components/Profile/ProfileFavorite";
import ProfileRatings from "./components/Profile/ProfileRatings";
import ProfileWatchlist from "./components/Profile/ProfileWatchlist";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MoviesPage from "./pages/MoviesPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import TvSeriesPage from "./pages/TvSeriesPage";
import "./styles/App.scss";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/movie" element={<MoviesPage />} />
      <Route path="/tv" element={<TvSeriesPage />} />
      <Route path="/search" element={<SearchPage />} />

      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/favorite/movies" element={<ProfileFavorite />} />
      <Route path="/profile/favorite/series" element={<ProfileFavorite />} />

      <Route path="/profile/ratings" element={<ProfileRatings />} />

      <Route path="/profile/watchlist/movies" element={<ProfileWatchlist />} />
      <Route path="/profile/watchlist/series" element={<ProfileWatchlist />} />

      <Route path="/profile/edit" element={<ProfileEditPage />} />

      <Route path="/movie/:id" element={<MoviePage />} />
      <Route path="/tv/:id" element={<SeriesPage />} />
    </Routes>
  );
}

export default App;

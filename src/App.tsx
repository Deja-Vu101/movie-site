import MoviePage from "./components/MoviesSeriesPage/MoviePage/MoviePage";
import ProfileFavorite from "./components/Profile/ProfileFavorite";
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

      <Route path="/profile/watchlist/movies" element={<ProfileWatchlist />} />
      <Route path="/profile/watchlist/series" element={<ProfileWatchlist />} />

      <Route path="/profile/edit" element={<ProfileEditPage />} />

      <Route path="/movie/:id" element={<MoviePage />} />
    </Routes>
  );
}

export default App;

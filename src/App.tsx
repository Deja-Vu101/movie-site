import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MoviesPage from "./pages/MoviesPage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import TvSeriesPage from "./pages/TvSeriesPage";
import "./styles/App.css";
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
      {/* <Routes path="/:id" element={<Movie />} /> */}
    </Routes>
  );
}

export default App;

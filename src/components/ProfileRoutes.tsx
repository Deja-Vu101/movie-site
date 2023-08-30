import { Route, Routes } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
import ProfileFavorite from "./Profile/ProfileFavorite";
import ProfileWatchlist from "./Profile/ProfileFavorite";

const ProfileRoutes = () => {
  return (
    <Routes>
      <Route path="/profile" element={<ProfilePage />} />

      <Route path="/profile/favorite/*" element={<ProfileFavorite />} />
      <Route path="/profile/favorite/series" element={<ProfileFavorite />} />

      <Route path="/profile/watchlist/*" element={<ProfileWatchlist />} />
      <Route path="/profile/watchlist/series" element={<ProfileWatchlist />} />
    </Routes>
  );
};

export default ProfileRoutes;

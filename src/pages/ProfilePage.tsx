import { useState } from "react";
import "../components/Profile/profile.scss";
import ProfileWatchlist from "../components/Profile/ProfileWatchlist";
import ProfileFavorite from "../components/Profile/ProfileFavorite";
import Header from "../components/Header/Header";
import ProfileHeader from "../components/Profile/ProfileHeader";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ProfilePage = () => {
  const { isAuth, isGuest } = useAuth();
  const [filterList, setFilterList] = useState("");

  return (
    <>
      {isAuth || isGuest ? null : <Navigate to={"/login"} />}

      <Header />
      <ProfileHeader />

      <div className="ProfilePage_Wrapper">
        {filterList === "watchlist" ? <ProfileWatchlist /> : null}
        {filterList === "favorite" ? <ProfileFavorite /> : null}

        <Outlet />
      </div>
    </>
  );
};

export default ProfilePage;

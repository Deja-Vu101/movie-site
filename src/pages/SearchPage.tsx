import Header from "../components/Header/Header";
import FilmPoster from "../components/Poster/FilmPoster/FilmPoster";
import ProfilePoster from "../components/Poster/Person/ProfilePoster";
import SearchBar from "../components/Search/SearchBar";
import "../components/Search/search.style.scss";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IMovie, IPersonItem } from "../components/MainSection/types";
import PaginationButton from "../components/PaginationButton";
import { setPage } from "../store/slices/searchSlice";

const SearchPage = () => {
  const { founded } = useTypedSelector((state) => state.search);
  //const { session_id, request_token } = useTypedSelector((state) => state.user);

  const handlerCheckApiKey = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDhhZTMxNTM4YTY5NmJiYTJkNGE2ZmNiZmQwMTlhOSIsInN1YiI6IjY0Y2E3Y2JmZGQ4M2ZhMDEzOWRhZTM5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YRbI_c1B40vA3ObEPz_nOejSEz0o5HV7FARlG0u3_EY",
      }
    };

    fetch("https://api.themoviedb.org/3/authentication", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  return (
    <div className="SearchPage" style={{ display: "flex" }}>
      <Header />
      <div className="SearchBar">
        <div className="SearchBar_Container">
          <SearchBar />
          <div onClick={handlerCheckApiKey}>api key is valid?</div>
          <div className="SearchList">
            {founded?.map((i) => {
              if ("poster_path" in i) {
                const movie = i as IMovie;
                return (
                  <FilmPoster
                    id={movie.id}
                    key={movie.id}
                    poster={movie.poster_path}
                  />
                );
              } else if ("profile_path" in i) {
                const person = i as IPersonItem;
                return (
                  <ProfilePoster
                    key={person.id}
                    id={person.id}
                    posterProfile={person.profile_path}
                  />
                );
              }
              return null;
            })}
            <PaginationButton items={founded} setPage={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

import Header from "../components/Header/Header";
import FilmPoster from "../components/Poster/FilmPoster/FilmPoster";
import ProfilePoster from "../components/Poster/Person/ProfilePoster";
import SearchBar from "../components/Search/SearchBar";
import "../components/Search/search.style.scss";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IMovie, IPersonItem } from "../components/MainSection/types";

const SearchPage = () => {
  const { found, filter, loading } = useTypedSelector((state) => state.search);

  return (
    <div className="SearchPage" style={{ display: "flex" }}>
      <Header />
      <div className="SearchBar">
        <div className="SearchBar_Container">
          <SearchBar />
          <div className="SearchList">
            {found?.map((i) => {
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

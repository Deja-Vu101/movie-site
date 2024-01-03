import Header from "../components/Header/Header";
import FilmPoster from "../components/Poster/FilmPoster/FilmPoster";
import ProfilePoster from "../components/Poster/Person/ProfilePoster";
import SearchBar from "../components/Search/SearchBar";
import "../components/Search/search.style.scss";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IMovie, IPersonItem } from "../components/MainSection/types";
import PaginationButton from "../components/PaginationButton";
import { setPage } from "../store/slices/searchSlice";
import "../components/SliderMovies/sliderMovies.scss";

const SearchPage = () => {
  const { founded, filter } = useTypedSelector((state) => state.search);

  return (
    <div className="SearchPage" style={{ display: "flex" }}>
      <Header />
      <div className="SearchBar">
        <div className="SearchBar_Container">
          <SearchBar />
          <div className="SearchList">
            <div className="SearchList_Container">
              {founded?.map((i) => {
                if ("poster_path" in i) {
                  const movie = i as IMovie;
                  return (
                    <FilmPoster
                      id={movie.id}
                      key={movie.id}
                      poster={movie.poster_path}
                      title={movie.title}
                      mediaType={filter}
                      voteAverage={movie.vote_average}
                      year={movie.release_date}
                    />
                  );
                } else if ("profile_path" in i) {
                  const person = i as IPersonItem;
                  return (
                    <ProfilePoster
                      key={person.id}
                      id={person.id}
                      posterProfile={person.profile_path}
                      name={person.name}
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
    </div>
  );
};

export default SearchPage;

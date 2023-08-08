import { imgBaseUrl } from "../apiConfigs/tmdb";
import Header from "../components/Header/Header";
import Poster from "../components/Poster/Poster";
import SearchBar from "../components/Search/SearchBar";
import "../components/Search/search.style.scss";
import { useTypedSelector } from "../hooks/useTypedSelector";

const SearchPage = () => {
  const { foundMovies } = useTypedSelector((state) => state.search);
  return (
    <div className="SearchPage" style={{ display: "flex" }}>
      <Header />
      <div className="SearchBar">
        <div className="SearchBar_Container">
          <SearchBar />
          <div className="SearchList">
            {foundMovies?.results?.map((i) => (
              <Poster id={i.id} key={i.id} poster={!!i.poster_path ? imgBaseUrl + i.poster_path : null} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

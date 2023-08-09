import { useEffect } from "react";
import { imgBaseUrl } from "../apiConfigs/tmdb";
import Header from "../components/Header/Header";
import FilmPoster from "../components/Poster/FilmPoster/FilmPoster";
import ProfilePoster from "../components/Poster/Person/ProfilePoster";
import SearchBar from "../components/Search/SearchBar";
import "../components/Search/search.style.scss";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IMovie, IPersonItem } from "../components/MainSection/types";

const SearchPage = () => {
  const { found, filter, loading } = useTypedSelector((state) => state.search);

  useEffect(() => {

    console.log(found, 'found')
  }, [found])

  return (
    <div className="SearchPage" style={{ display: "flex" }}>
      <Header />
      <div className="SearchBar">
        <div className="SearchBar_Container">
          <SearchBar />
          <div className="SearchList">
            {/* {found?.map((i: any) => (
              <div key={i.id}>
                {filter === 'person'
                  ? <ProfilePoster id={i.id} posterProfile={i.profile_path} />
                  : <FilmPoster id={i.id} key={i.id} poster={!!i.poster_path ? imgBaseUrl + i.poster_path : null} />
                }
              </div>
            ))} */}


            {found?.map((i) => {

              if ('poster_path' in i) {
                const movie = i as IMovie;
                return (
                  <FilmPoster
                    id={movie.id}
                    key={movie.id}
                    poster={!!movie.poster_path ? imgBaseUrl + movie.poster_path : null}
                  />
                );
              } else if ('profile_path' in i) {
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

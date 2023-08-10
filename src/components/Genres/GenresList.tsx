import { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "../Genres/genres.style.scss";

interface IOwnProps {
  genres: number[];
  mediaType: string;
}

const GenresList: React.FC<IOwnProps> = ({ genres, mediaType }) => {
  const { movies, series } = useTypedSelector((state) => state.genres.genres);
  const [genresList, setGenresList] = useState<(string | null)[]>([]);

  useEffect(() => {
    if (movies && series) {
      if (mediaType === "movie") {
        const movieGenres = genres.map((id) => {
          const genre = movies.find((genre) => genre.id === id);
          return genre ? genre.name : null;
        });
        setGenresList(movieGenres);
      } else {
        const seriesGenres = genres.map((id) => {
          const genre = series.find((genre) => genre.id === id);
          return genre ? genre.name : null;
        });
        setGenresList(seriesGenres);
      }
    }
  }, [movies, series, mediaType, genres]);

  return (
    <div className="Genre">
      <ul className="Genre_List">
        {genresList.map((genre, index) => (
          <li key={index} className="Genre_List_Item">
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenresList;

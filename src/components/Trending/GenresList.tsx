import axios from "axios";
import { useEffect, useState } from "react";
import { options } from "../../apiConfigs/tmdb";
interface IOwnProps {
  genres: number[];
}

const GenresList: React.FC<IOwnProps> = ({ genres }) => {
  const [genresList, setGenresList] = useState([]);
	
  
  return (
    <div className="Genre">
      <ul className="Genre_List">
        <li className="Genre_List_Item">Путкууку</li>
        <li className="Genre_List_Item">Gentre</li>
      </ul>
    </div>
  );
};

export default GenresList;

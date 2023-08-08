import { useState } from "react";

const SearchFilterButton = () => {
  const [filter, setFilter] = useState("movie");

  return (
    <div className="SearchFilterButton">
      <div
        className={`FilterButton ${filter === "movie" ? "active" : ""}`}
        onClick={() => setFilter("movie")}
      >
        Movie
      </div>
      <div
        className={`FilterButton ${filter === "tv" ? "active" : ""}`}
        onClick={() => setFilter("tv")}
      >
        Tv
      </div>
      <div
        className={`FilterButton ${filter === "people" ? "active" : ""}`}
        onClick={() => setFilter("people")}
      >
        People
      </div>
    </div>
  );
};

export default SearchFilterButton;

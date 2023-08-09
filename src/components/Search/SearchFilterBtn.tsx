import React from "react";

interface IOwnProps {
  filter: string
  setFilter: (filter: string) => void
}

const SearchFilterButton: React.FC<IOwnProps> = ({ filter, setFilter }) => {

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

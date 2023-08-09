import React from "react";

interface IOwnProps {
  filterBtn: string
  onChangeFilter: (filterBtn: string) => void
}

const SearchFilterButton: React.FC<IOwnProps> = ({ filterBtn, onChangeFilter }) => {

  return (
    <div className="SearchFilterButton">
      <div
        className={`FilterButton ${filterBtn === "movie" ? "active" : ""}`}
        onClick={() => onChangeFilter("movie")}
      >
        Movie
      </div>
      <div
        className={`FilterButton ${filterBtn === "tv" ? "active" : ""}`}
        onClick={() => onChangeFilter("tv")}
      >
        Tv
      </div>
      <div
        className={`FilterButton ${filterBtn === "person" ? "active" : ""}`}
        onClick={() => onChangeFilter("person")}
      >
        People
      </div>
    </div>
  );
};

export default SearchFilterButton;

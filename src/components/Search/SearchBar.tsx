import { useEffect, useState } from "react";
import SearchFilterButton from "./SearchFilterBtn";
import SearchInput from "./SearchInput";
import "./search.style.scss";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { fetchSearch } from "../../store/slices/searchSlice";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDebounce } from "../../hooks/useDebouce";

const SearchBar = () => {
  const dispatch = useTypedDispatch();
  const [filter, setFilter] = useState("movie");
  const [inputValue, setInputValue] = useState("");
  const debounce = useDebounce(inputValue, 800);

  const { page } = useTypedSelector((state) => state.search.foundMovies);

  useEffect(() => {
    if (inputValue.length !== 0) {
      dispatch(fetchSearch({ page: page, query: inputValue }))
    }

  }, [debounce])

  return (
    <div>
      <SearchFilterButton filter={filter} setFilter={setFilter} />
      <SearchInput inputValue={inputValue} setInputValue={setInputValue} />
    </div>
  );
};

export default SearchBar;

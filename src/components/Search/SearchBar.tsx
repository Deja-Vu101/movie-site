import { useEffect, useState } from "react";
import SearchFilterButton from "./SearchFilterBtn";
import SearchInput from "./SearchInput";
import "./search.style.scss";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { fetchSearch, setFilter } from "../../store/slices/searchSlice";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDebounce } from "../../hooks/useDebouce";

const SearchBar = () => {
  const dispatch = useTypedDispatch();
  const { filter, found } = useTypedSelector((state) => state.search);
  const [filterBtn, setFilterBtn] = useState(filter);
  const [inputValue, setInputValue] = useState("");
  const debounce = useDebounce(inputValue, 800);

  const onChangeFilter = (filter: string) =>{
    dispatch(setFilter(filter))
    setFilterBtn(filter)
  }

  useEffect(() => {
    if (inputValue.length !== 0) {
      dispatch(fetchSearch({ page: 1, filter: filter, query: inputValue }))
    }

  }, [debounce, filterBtn])

  return (
    <div>
      <SearchFilterButton filterBtn={filterBtn} onChangeFilter={onChangeFilter} />
      <SearchInput inputValue={inputValue} setInputValue={setInputValue} />
    </div>
  );
};

export default SearchBar;

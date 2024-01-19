import { useEffect, useState } from "react";
import SearchFilterButton from "./SearchFilterBtn";
import SearchInput from "./SearchInput";
import "./search.style.scss";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import {
  fetchNewPageSearch,
  fetchSearch,
  setFilter,
} from "../../store/slices/searchSlice";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDebounce } from "../../hooks/useDebouce";

const SearchBar = () => {
  const dispatch = useTypedDispatch();
  const { filter, page } = useTypedSelector((state) => state.search);
  const [filterBtn, setFilterBtn] = useState(filter);
  const [inputValue, setInputValue] = useState("");
  const [prevPage, setPrevPage] = useState(page);
  const debounce = useDebounce(inputValue, 800);

  useEffect(() => {
    if (inputValue.length !== 0) {
      dispatch(
        fetchSearch({
          page: page,
          filter: filter,
          query: inputValue,
          dispatch: dispatch,
        })
      );
    }
  }, [debounce, filterBtn]);

  useEffect(() => {
    if (page !== prevPage) {
      dispatch(
        fetchNewPageSearch({ page: page, filter: filter, query: inputValue })
      );
    }
    setPrevPage(page);
  }, [page]);

  const onChangeFilter = (filter: string) => {
    dispatch(setFilter(filter));
    setFilterBtn(filter);
  };
  return (
    <div>
      <SearchFilterButton
        filterBtn={filterBtn}
        onChangeFilter={onChangeFilter}
      />
      <SearchInput inputValue={inputValue} setInputValue={setInputValue} />
    </div>
  );
};

export default SearchBar;

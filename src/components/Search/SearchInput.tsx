import { useState, useEffect } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { fetchSearch } from "../../store/slices/searchSlice";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDebounce } from "../../hooks/useDebouce";
const SearchInput = () => {
  const dispatch = useTypedDispatch();
  const { page } = useTypedSelector((state) => state.search.foundMovies);
  const [inputValue, setInputValue] = useState("");
  const debounce = useDebounce(inputValue, 800);

  useEffect(() => {
    if (inputValue.length !== 0) {
      dispatch(fetchSearch({ page: page, query: inputValue }));
    }
  }, [debounce]);
  return (
    <div className="SearchInput">
      <input
        type="text"
        placeholder="Search with ReactMovie"
        value={inputValue}
        pattern=".*\S.*"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
      />
    </div>
  );
};

export default SearchInput;

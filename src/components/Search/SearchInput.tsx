import React from "react";

interface IOwnProps {
  inputValue: string;
  setInputValue: (inputValue: string) => void;
}

const SearchInput: React.FC<IOwnProps> = ({ inputValue, setInputValue }) => {
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

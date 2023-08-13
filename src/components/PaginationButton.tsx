import React from "react";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { Action } from "@reduxjs/toolkit";

interface IOwnProps {
  items: any[];
  
  setPage: () => Action;
}

const PaginationButton: React.FC<IOwnProps> = ({ items,  setPage }) => {
  const dispatch = useTypedDispatch();

  const onClickPaginationBtn = () => {
    dispatch(setPage());
  };
  return (
    <div
      className="Pagination_Button"
      style={{ display: items.length === 0 ? "none" : "flex" }}
		onClick={onClickPaginationBtn}
    >
      Load more
    </div>
  );
};

export default PaginationButton;

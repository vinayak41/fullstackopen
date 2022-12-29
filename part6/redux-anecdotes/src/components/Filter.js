import React from "react";
import { useDispatch } from "react-redux";
import { changeFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const filterChangeHandler = (e) => {
    dispatch(changeFilter(e.target.value));
  };
  
  return (
    <div>
      Filter <input onChange={filterChangeHandler} />
    </div>
  );
};

export default Filter;

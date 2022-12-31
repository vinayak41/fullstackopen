import React from "react";
import { connect } from "react-redux";
import { changeFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  const filterChangeHandler = (e) => {
    props.changeFilter(e.target.value);
  };

  return (
    <div>
      Filter <input onChange={filterChangeHandler} />
    </div>
  );
};

const mapDispatchToProps = {
  changeFilter,
};

export default connect(null, mapDispatchToProps)(Filter);

import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { connect } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const handleAddNewAnecdote = (e) => {
    e.preventDefault();
    props.createAnecdote(e.target[0].value);
    props.setNotification(`new anecdote ${e.target[0].value}`, 5);
    e.target.reset();
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAddNewAnecdote}>
        <div>
          <input />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);

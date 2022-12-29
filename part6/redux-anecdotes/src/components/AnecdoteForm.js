import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleAddNewAnecdote = (e) => {
    e.preventDefault();
    dispatch(createAnecdote(e.target[0].value));
    dispatch(setNotification(`new anecdote ${e.target[0].value}`, 5));
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

export default AnecdoteForm;

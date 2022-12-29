import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../service/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdote(state, action) {
      const anecdotes = action.payload;
      return anecdotes;
    },
    appendAnecdote(state, action) {
      const newAnecdote = action.payload;
      return [...state, newAnecdote];
    },
    setAnecdoteChanges(state, action) {
      const updatesAnecdote = action.payload;
      return [
        ...state.map((anecdote) =>
          anecdote.id === updatesAnecdote.id ? updatesAnecdote : anecdote
        ),
      ];
    },
  },
});

export default anecdoteSlice.reducer;
export const { setAnecdote, appendAnecdote, setAnecdoteChanges } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdote(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.create(content);
    dispatch(appendAnecdote(anecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(anecdote.id, {
      votes: anecdote.votes + 1,
    });
    dispatch(setAnecdoteChanges(updatedAnecdote));
  };
};

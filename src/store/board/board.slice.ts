import { createSlice } from '@reduxjs/toolkit';
import { boardInitialState } from './board-initial-state';

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    board: boardInitialState,
  },
  reducers: {},
});

export const boardActions = boardSlice.actions;

export const boardReducer = boardSlice.reducer;

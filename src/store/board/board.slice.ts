import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Piece } from '../../models/piece.interface';
import { boardInitialState } from './board-initial-state';

export const boardEntityAdapter = createEntityAdapter<Piece>({
  selectId: (piece) => piece.id,
});

export const boardSlice = createSlice({
  name: 'board',
  initialState: boardEntityAdapter.getInitialState({}),
  reducers: {
    initBoard(state) {
      boardEntityAdapter.removeAll(state);
      boardEntityAdapter.setAll(state, boardInitialState);
    },
  },
});

export const boardActions = boardSlice.actions;

export const boardReducer = boardSlice.reducer;

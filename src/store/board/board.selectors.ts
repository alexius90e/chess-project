import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const boardState = (state: RootState) => state.board;

const board = createSelector(boardState, (state) => {
  return state.board;
});

export const boardSelectors = { board };

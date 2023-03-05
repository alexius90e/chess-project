import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { boardEntityAdapter } from './board.slice';

const boardState = (state: RootState) => state.board;

const { selectById } = boardEntityAdapter.getSelectors();

const pieceById = (id: string) =>
  createSelector(boardState, (state) => selectById(state, id));

export const boardSelectors = { pieceById };

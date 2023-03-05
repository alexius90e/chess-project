import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { boardEntityAdapter } from './board.slice';

const boardState = (state: RootState) => state.board;

const { selectById } = boardEntityAdapter.getSelectors();

const pieceById = (id: string) =>
  createSelector(boardState, (state) => selectById(state, id));

const activePiece = createSelector(boardState, (state) => state.activePiece);

export const boardSelectors = { pieceById, activePiece };

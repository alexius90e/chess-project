import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { boardEntityAdapter } from './board.slice';

const boardState = (state: RootState) => state.board;

const { selectById } = boardEntityAdapter.getSelectors();

const pieceById = (id: string) =>
  createSelector(boardState, (state) => selectById(state, id));

const activePiece = createSelector(boardState, (state) => state.activePiece);

const isWhiteSide = createSelector(boardState, (state) => state.isWhiteSide);

const boardAxes = createSelector(boardState, (state) => ({
  rows: state.isWhiteSide ? state.rows : [...state.rows].reverse(),
  columns: state.isWhiteSide ? state.columns : [...state.columns].reverse(),
}));

export const boardSelectors = {
  pieceById,
  activePiece,
  isWhiteSide,
  boardAxes,
};

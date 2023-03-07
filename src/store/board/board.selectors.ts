import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { boardEntityAdapter } from './board.slice';

const boardState = (state: RootState) => state.board;

const { selectById } = boardEntityAdapter.getSelectors();

const pieceById = (id: string) =>
  createSelector(boardState, (state) => selectById(state, id));

const activePiece = createSelector(boardState, (state) => state.activePiece);

const isBoardFlipped = createSelector(
  boardState,
  (state) => state.isBoardFlipped
);

const boardAxes = createSelector(boardState, (state) => ({
  rows: state.isBoardFlipped ? [...state.rows].reverse() : state.rows,
  columns: state.isBoardFlipped ? [...state.columns].reverse() : state.columns,
}));

const availableToAttack = createSelector(
  boardState,
  (state) => state.availableToAttack
);

const availableToMove = createSelector(
  boardState,
  (state) => state.availableToMove
);

export const boardSelectors = {
  pieceById,
  activePiece,
  isBoardFlipped,
  boardAxes,
  availableToAttack,
  availableToMove,
};

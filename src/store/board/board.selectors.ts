import { createSelector } from '@reduxjs/toolkit';
import { PieceTeam } from '../../models/piece-team.enum';
import { RootState } from '../store';
import { boardEntityAdapter } from './board.slice';

const boardState = (state: RootState) => state.board;

const { selectById, selectIds, selectAll } = boardEntityAdapter.getSelectors();

const pieceById = (id: string) => createSelector(boardState, (state) => selectById(state, id));

const allPieceIds = createSelector(boardState, selectIds);

const allPieces = createSelector(boardState, selectAll);

const whitePieceIds = createSelector(boardState, allPieces, (_, pieces) => {
  return pieces.filter((piece) => piece.team === PieceTeam.White).map((piece) => piece.id);
});

const blackPieceIds = createSelector(
  boardState,
  allPieceIds,
  whitePieceIds,
  (_, allIds, whiteIds) => {
    return allIds.filter((id) => !whiteIds.includes(id as string));
  }
);

const activePiece = createSelector(boardState, (state) => state.activePieceData?.piece);

const isBoardFlipped = createSelector(boardState, (state) => state.isBoardFlipped);

const boardAxes = createSelector(boardState, (state) => ({
  rows: state.isBoardFlipped ? [...state.rows].reverse() : state.rows,
  columns: state.isBoardFlipped ? [...state.columns].reverse() : state.columns,
}));

const availableToAttack = createSelector(boardState, (state) =>
  state.activePieceData ? state.activePieceData.attacks : []
);

const availableToMove = createSelector(boardState, (state) =>
  state.activePieceData ? state.activePieceData.moves : []
);

export const boardSelectors = {
  pieceById,
  whitePieceIds,
  blackPieceIds,
  allPieceIds,
  activePiece,
  isBoardFlipped,
  boardAxes,
  availableToAttack,
  availableToMove,
};

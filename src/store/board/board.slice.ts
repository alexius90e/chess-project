import {
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { PieceTeam } from '../../models/piece-team.enum';
import { Piece } from '../../models/piece.interface';
import { boardInitialState } from './board-initial-state';

interface BoardSliceState {
  activePiece: Piece | null;
  isWhiteSide: boolean;
  isWhiteMove: boolean;
  columns: string[];
  rows: string[];
}

export const boardEntityAdapter = createEntityAdapter<Piece>({
  selectId: (piece) => piece.id,
});

const initialState: EntityState<Piece> & BoardSliceState =
  boardEntityAdapter.getInitialState({
    activePiece: null,
    isWhiteSide: true,
    isWhiteMove: true,
    columns: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    rows: ['8', '7', '6', '5', '4', '3', '2', '1'],
  });

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    initBoard(state): void {
      boardEntityAdapter.removeAll(state);
      boardEntityAdapter.setAll(state, boardInitialState);
    },
    setIsWhiteSide(state, action: PayloadAction<boolean>): void {
      state.isWhiteSide = action.payload;
    },
    reverseBoard(state): void {
      state.isWhiteSide = !state.isWhiteSide;
    },
    setActivePiece(state, action: PayloadAction<Piece>) {
      const piece: Piece = action.payload;
      const isWhiteMove = state.isWhiteMove;
      if (isWhiteMove && piece.team === PieceTeam.Black) return;
      if (!isWhiteMove && piece.team === PieceTeam.White) return;
      state.activePiece = action.payload;
    },
    resetActivePiece(state) {
      state.activePiece = null;
    },
    moveActivePiece(state, action: PayloadAction<{ targetId: string }>) {
      const { targetId } = action.payload;
      const { activePiece, isWhiteMove } = state;
      if (!activePiece) return;
      if (targetId === activePiece.id) return;
      if (isWhiteMove && activePiece.team === PieceTeam.Black) return;
      if (!isWhiteMove && activePiece.team === PieceTeam.White) return;
      boardEntityAdapter.removeOne(state, activePiece.id);
      boardEntityAdapter.setOne(state, { ...activePiece, id: targetId });
      state.activePiece = null;
      state.isWhiteMove = !state.isWhiteMove;
    },
    attackPiece(state, action: PayloadAction<Piece>) {
      if (!state.activePiece) return;
      const newPiece: Piece = { ...state.activePiece, id: action.payload.id };
      boardEntityAdapter.removeOne(state, state.activePiece.id);
      boardEntityAdapter.removeOne(state, action.payload.id);
      boardEntityAdapter.addOne(state, newPiece);
      state.activePiece = null;
      state.isWhiteMove = !state.isWhiteMove;
    },
  },
});

export const boardActions = boardSlice.actions;

export const boardReducer = boardSlice.reducer;

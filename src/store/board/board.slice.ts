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
  isBoardFlipped: boolean;
  currentTeam: PieceTeam;
  columns: string[];
  rows: string[];
  availableToMove: string[];
  availableToAttack: string[];
}

export const boardEntityAdapter = createEntityAdapter<Piece>({
  selectId: (piece) => piece.id,
});

const initialState: EntityState<Piece> & BoardSliceState =
  boardEntityAdapter.getInitialState({
    activePiece: null,
    isBoardFlipped: false,
    currentTeam: PieceTeam.White,
    columns: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    rows: ['8', '7', '6', '5', '4', '3', '2', '1'],
    availableToMove: [],
    availableToAttack: [],
  });

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    initBoard(state): void {
      boardEntityAdapter.removeAll(state);
      boardEntityAdapter.setAll(state, boardInitialState);
    },
    setBoardDirection(state, action: PayloadAction<boolean>): void {
      state.isBoardFlipped = action.payload;
    },
    changeBoardDirection(state): void {
      state.isBoardFlipped = !state.isBoardFlipped;
    },
    setActivePiece(state, action: PayloadAction<Piece>) {
      if (state.currentTeam !== action.payload.team) {
        state.availableToMove = [];
        state.availableToAttack = [];
        return;
      }
      state.activePiece = action.payload;
    },
    resetActivePiece(state) {
      state.activePiece = null;
      state.availableToMove = [];
      state.availableToAttack = [];
    },
    moveActivePiece(state, action: PayloadAction<{ targetId: string }>) {
      const { targetId } = action.payload;
      const { activePiece, currentTeam } = state;
      if (!activePiece) return;
      if (targetId === activePiece.id) return;
      if (currentTeam !== activePiece.team) return;
      boardEntityAdapter.removeOne(state, activePiece.id);
      boardEntityAdapter.setOne(state, { ...activePiece, id: targetId });
      state.activePiece = null;
      state.availableToMove = [];
      state.availableToAttack = [];
      state.currentTeam = Number(!Boolean(state.currentTeam));
    },
    attackByActivePiece(state, action: PayloadAction<Piece>) {
      if (!state.activePiece) return;
      const newPiece: Piece = { ...state.activePiece, id: action.payload.id };
      boardEntityAdapter.removeOne(state, state.activePiece.id);
      boardEntityAdapter.removeOne(state, action.payload.id);
      boardEntityAdapter.addOne(state, newPiece);
      state.activePiece = null;
      state.availableToMove = [];
      state.availableToAttack = [];
      state.currentTeam = Number(!Boolean(state.currentTeam));
    },
    setAvailableToMove(state, action: PayloadAction<string[]>) {
      state.availableToMove = action.payload;
    },
    setAvailableToAttack(state, action: PayloadAction<string[]>) {
      state.availableToAttack = action.payload;
    },
  },
});

export const boardActions = boardSlice.actions;

export const boardReducer = boardSlice.reducer;

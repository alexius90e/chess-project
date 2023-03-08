import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { PieceActiveData } from '../../models/piece-active-data.interface';
import { PieceTeam } from '../../models/piece-team.enum';
import { Piece } from '../../models/piece.interface';
import { boardInitialState } from './board-initial-state';

interface BoardSliceState {
  activePieceData: PieceActiveData | null;
  isBoardFlipped: boolean;
  currentTeam: PieceTeam;
  columns: string[];
  rows: string[];
}

export const boardEntityAdapter = createEntityAdapter<Piece>({
  selectId: (piece) => piece.id,
});

const initialState: EntityState<Piece> & BoardSliceState = boardEntityAdapter.getInitialState({
  activePieceData: null,
  isBoardFlipped: false,
  currentTeam: PieceTeam.White,
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
    setBoardDirection(state, action: PayloadAction<boolean>): void {
      state.isBoardFlipped = action.payload;
    },
    changeBoardDirection(state): void {
      state.isBoardFlipped = !state.isBoardFlipped;
    },
    setActivePiece(state, action: PayloadAction<PieceActiveData>) {
      if (state.currentTeam === action.payload.piece.team) {
        state.activePieceData = action.payload;
      }
    },
    resetActivePiece(state) {
      state.activePieceData = null;
    },
    moveActivePiece(state, action: PayloadAction<{ targetId: string }>) {
      const { targetId } = action.payload;
      const { activePieceData, currentTeam } = state;
      if (!activePieceData) return;
      if (targetId === activePieceData.piece.id) return;
      if (currentTeam !== activePieceData.piece.team) return;
      if (activePieceData.moves.includes(targetId)) {
        const resultPiece: Piece = {
          ...activePieceData.piece,
          id: targetId,
          isFirstMove: false,
        };
        boardEntityAdapter.removeOne(state, activePieceData.piece.id);
        boardEntityAdapter.setOne(state, resultPiece);
        state.currentTeam = Number(!Boolean(state.currentTeam));
        state.activePieceData = null;
      }
    },
    attackByActivePiece(state, action: PayloadAction<Piece>) {
      const { activePieceData } = state;
      const attacked: Piece = action.payload;
      if (activePieceData === null) return;
      if (activePieceData.attacks.includes(attacked.id)) {
        const resultPiece: Piece = {
          ...activePieceData.piece,
          id: attacked.id,
          isFirstMove: false,
        };
        boardEntityAdapter.removeMany(state, [activePieceData.piece.id, attacked.id]);
        boardEntityAdapter.addOne(state, resultPiece);
        state.currentTeam = Number(!Boolean(state.currentTeam));
        state.activePieceData = null;
      }
    },
  },
});

export const boardActions = boardSlice.actions;

export const boardReducer = boardSlice.reducer;

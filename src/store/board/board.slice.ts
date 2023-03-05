import {
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Piece } from '../../models/piece.interface';
import { boardInitialState } from './board-initial-state';

interface BoardSliceState {
  activePiece: Piece | null;
}

export const boardEntityAdapter = createEntityAdapter<Piece>({
  selectId: (piece) => piece.id,
});

const initialState: EntityState<Piece> & BoardSliceState =
  boardEntityAdapter.getInitialState({
    activePiece: null,
  });

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    initBoard(state): void {
      boardEntityAdapter.removeAll(state);
      boardEntityAdapter.setAll(state, boardInitialState);
    },
    setActivePiece(state, action: PayloadAction<Piece | null>) {
      state.activePiece = action.payload;
    },
    moveActivePiece(state, action: PayloadAction<{ targetId: string }>) {
      const { targetId } = action.payload;
      const { activePiece } = state;
      if (!activePiece) return;
      if (targetId === activePiece.id) return;
      const newPiece: Piece = { ...activePiece, id: targetId };
      boardEntityAdapter.setOne(state, newPiece);
      boardEntityAdapter.removeOne(state, activePiece.id);
      state.activePiece = null;
    },
  },
});

export const boardActions = boardSlice.actions;

export const boardReducer = boardSlice.reducer;

import { PieceTeam } from '../../models/piece-team.enum';
import { PieceType } from '../../models/piece-type.enum';
import { BoardState } from '../models/board-state.interface';

export const boardInitialState: BoardState = {
  a1: { team: PieceTeam.White, type: PieceType.Rook },
  b1: { team: PieceTeam.White, type: PieceType.Knight },
  c1: { team: PieceTeam.White, type: PieceType.Bishop },
  d1: { team: PieceTeam.White, type: PieceType.Queen },
  e1: { team: PieceTeam.White, type: PieceType.King },
  f1: { team: PieceTeam.White, type: PieceType.Bishop },
  g1: { team: PieceTeam.White, type: PieceType.Knight },
  h1: { team: PieceTeam.White, type: PieceType.Rook },
  a2: { team: PieceTeam.White, type: PieceType.Pawn },
  b2: { team: PieceTeam.White, type: PieceType.Pawn },
  c2: { team: PieceTeam.White, type: PieceType.Pawn },
  d2: { team: PieceTeam.White, type: PieceType.Pawn },
  e2: { team: PieceTeam.White, type: PieceType.Pawn },
  f2: { team: PieceTeam.White, type: PieceType.Pawn },
  g2: { team: PieceTeam.White, type: PieceType.Pawn },
  h2: { team: PieceTeam.White, type: PieceType.Pawn },
  a3: null,
  b3: null,
  c3: null,
  d3: null,
  e3: null,
  f3: null,
  g3: null,
  h3: null,
  a4: null,
  b4: null,
  c4: null,
  d4: null,
  e4: null,
  f4: null,
  g4: null,
  h4: null,
  a5: null,
  b5: null,
  c5: null,
  d5: null,
  e5: null,
  f5: null,
  g5: null,
  h5: null,
  a6: null,
  b6: null,
  c6: null,
  d6: null,
  e6: null,
  f6: null,
  g6: null,
  h6: null,
  a7: { team: PieceTeam.Black, type: PieceType.Pawn },
  b7: { team: PieceTeam.Black, type: PieceType.Pawn },
  c7: { team: PieceTeam.Black, type: PieceType.Pawn },
  d7: { team: PieceTeam.Black, type: PieceType.Pawn },
  e7: { team: PieceTeam.Black, type: PieceType.Pawn },
  f7: { team: PieceTeam.Black, type: PieceType.Pawn },
  g7: { team: PieceTeam.Black, type: PieceType.Pawn },
  h7: { team: PieceTeam.Black, type: PieceType.Pawn },
  a8: { team: PieceTeam.Black, type: PieceType.Rook },
  b8: { team: PieceTeam.Black, type: PieceType.Knight },
  c8: { team: PieceTeam.Black, type: PieceType.Bishop },
  d8: { team: PieceTeam.Black, type: PieceType.Queen },
  e8: { team: PieceTeam.Black, type: PieceType.King },
  f8: { team: PieceTeam.Black, type: PieceType.Bishop },
  g8: { team: PieceTeam.Black, type: PieceType.Knight },
  h8: { team: PieceTeam.Black, type: PieceType.Rook },
};

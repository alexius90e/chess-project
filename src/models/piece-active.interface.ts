import { Piece } from './piece.interface';

export interface PieceActive {
  piece: Piece;
  moves: string[];
  attacks: string[];
}

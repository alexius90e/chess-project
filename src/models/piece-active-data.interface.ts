import { Piece } from './piece.interface';

export interface PieceActiveData {
  piece: Piece;
  moves: string[];
  attacks: string[];
}

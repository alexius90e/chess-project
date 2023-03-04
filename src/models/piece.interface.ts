import { PieceTeam } from './piece-team.enum';
import { PieceType } from './piece-type.enum';

export interface Piece {
  type: PieceType;
  team: PieceTeam;
}

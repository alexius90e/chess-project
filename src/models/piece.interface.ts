import { PieceTeam } from './piece-team.enum';
import { PieceType } from './piece-type.enum';

export interface Piece {
  id: string;
  name: string;
  type: PieceType;
  team: PieceTeam;
}

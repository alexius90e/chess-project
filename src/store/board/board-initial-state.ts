import { PieceTeam } from '../../models/piece-team.enum';
import { PieceType } from '../../models/piece-type.enum';
import { Piece } from '../../models/piece.interface';

function getPieceTeamById(id: string, teamMark: '1' | '2'): PieceTeam {
  const regExp = new RegExp(`[a-h][${teamMark}]`, 'g');
  return id.match(regExp) ? PieceTeam.White : PieceTeam.Black;
}

const whitePawnIds = ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'];

const blacPawnIds = ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'];

const pawns: Piece[] = [...whitePawnIds, ...blacPawnIds].map(
  (id: string): Piece => {
    const team: PieceTeam = getPieceTeamById(id, '2');
    return { id, team, name: 'pawn', type: PieceType.Pawn };
  }
);

const kings: Piece[] = ['e1', 'e8'].map((id: string): Piece => {
  const team: PieceTeam = getPieceTeamById(id, '1');
  return { id, team, name: 'rook', type: PieceType.King };
});

const queens: Piece[] = ['d1', 'd8'].map((id: string): Piece => {
  const team: PieceTeam = getPieceTeamById(id, '1');
  return { id, team, name: 'rook', type: PieceType.Queen };
});

const rooks: Piece[] = ['a1', 'h1', 'a8', 'h8'].map((id: string): Piece => {
  const team: PieceTeam = getPieceTeamById(id, '1');
  return { id, team, name: 'rook', type: PieceType.Rook };
});

const knights: Piece[] = ['b1', 'g1', 'b8', 'g8'].map((id: string): Piece => {
  const team: PieceTeam = getPieceTeamById(id, '1');
  return { id, team, name: 'knight', type: PieceType.Knight };
});

const bishops: Piece[] = ['c1', 'f1', 'c8', 'f8'].map((id: string): Piece => {
  const team: PieceTeam = getPieceTeamById(id, '1');
  return { id, team, name: 'bishop', type: PieceType.Bishop };
});

export const boardInitialState: Piece[] = [
  ...kings,
  ...queens,
  ...rooks,
  ...knights,
  ...bishops,
  ...pawns,
];

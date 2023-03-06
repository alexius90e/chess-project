import { PieceTeam } from '../../models/piece-team.enum';
import { PieceType } from '../../models/piece-type.enum';
import { Piece } from '../../models/piece.interface';

const pieceIds = {
  whitePawns: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
  blackPawns: ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
  kings: ['e1', 'e8'],
  queens: ['d1', 'd8'],
  rooks: ['a1', 'h1', 'a8', 'h8'],
  knights: ['b1', 'g1', 'b8', 'g8'],
  bishops: ['c1', 'f1', 'c8', 'f8'],
};

const pieceNames = ['king', 'queen', 'rook', 'bishop', 'knight', 'pawn'];

function getPieceTeamById(id: string, type: PieceType): PieceTeam {
  const isPawn = type === PieceType.Pawn;
  const regExp = new RegExp(`[a-h][${isPawn ? 2 : 1}]`, 'g');
  return id.match(regExp) ? PieceTeam.White : PieceTeam.Black;
}

function generatePieces(ids: string[], type: PieceType): Piece[] {
  const name = pieceNames[type];
  return ids.map((id: string): Piece => {
    const team: PieceTeam = getPieceTeamById(id, type);
    return { id, team, name, type };
  });
}

const kings: Piece[] = generatePieces(pieceIds.kings, PieceType.King);

const queens: Piece[] = generatePieces(pieceIds.queens, PieceType.Queen);

const rooks: Piece[] = generatePieces(pieceIds.rooks, PieceType.Rook);

const knights: Piece[] = generatePieces(pieceIds.knights, PieceType.Knight);

const bishops: Piece[] = generatePieces(pieceIds.bishops, PieceType.Bishop);

const pawns: Piece[] = generatePieces(
  [...pieceIds.whitePawns, ...pieceIds.blackPawns],
  PieceType.Pawn
);

export const boardInitialState: Piece[] = [
  ...kings,
  ...queens,
  ...rooks,
  ...knights,
  ...bishops,
  ...pawns,
];

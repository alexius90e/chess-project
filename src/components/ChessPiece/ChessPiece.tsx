import React, { FC } from 'react';
import { PieceType } from '../../models/piece-type.enum';
import { Piece } from '../../models/piece.interface';
import './ChessPiece.scss';

interface PieceProps {
  piece: Piece;
}

export const ChessPiece: FC<PieceProps> = ({ piece }) => {
  const pieceTeamName = piece?.team ? 'black' : 'white';

  const pieceName = convertPieceTypeToName(piece?.type);

  const pieceClassName = `chess-piece chess-piece-${pieceName}-${pieceTeamName}`;

  function convertPieceTypeToName(type: PieceType | undefined): string {
    switch (type) {
      case PieceType.King:
        return 'king';
      case PieceType.Queen:
        return 'queen';
      case PieceType.Rook:
        return 'rook';
      case PieceType.Bishop:
        return 'bishop';
      case PieceType.Knight:
        return 'knight';
      default:
        return 'pawn';
    }
  }

  return <div className={pieceClassName}></div>;
};

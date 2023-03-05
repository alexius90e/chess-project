import React, { FC } from 'react';
import { Piece } from '../../models/piece.interface';
import './ChessPiece.scss';

interface PieceProps {
  piece: Piece;
}

export const ChessPiece: FC<PieceProps> = ({ piece }) => {
  const pieceTeamName = piece.team ? 'black' : 'white';

  const pieceClassName = `chess-piece chess-piece-${piece.name}-${pieceTeamName}`;

  return <div className={pieceClassName}></div>;
};

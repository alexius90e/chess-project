import React, { FC } from 'react';
import { PieceProps } from '../../models/piece-props.interface';
import { Bishop } from '../Bishop/Bishop';
import { King } from '../King/King';
import { Knight } from '../Knight/Knight';
import { Pawn } from '../Pawn/Pawn';
import { Queen } from '../Queen/Queen';
import { Rook } from '../Rook/Rook';
import './ChessPiece.scss';

interface ChessPieceComponents {
  king: React.FC<PieceProps>;
  queen: React.FC<PieceProps>;
  rook: React.FC<PieceProps>;
  bishop: React.FC<PieceProps>;
  knight: React.FC<PieceProps>;
  pawn: React.FC<PieceProps>;
}

const chessPieceComponents: ChessPieceComponents = {
  king: King,
  queen: Queen,
  rook: Rook,
  bishop: Bishop,
  knight: Knight,
  pawn: Pawn,
};

export const ChessPiece: FC<PieceProps> = ({ piece }) => {
  const PieceComponent = chessPieceComponents[piece.name as keyof ChessPieceComponents];

  return <PieceComponent piece={piece} />;
};

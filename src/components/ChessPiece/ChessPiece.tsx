import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Piece } from '../../models/piece.interface';
import { boardSelectors } from '../../store/board/board.selectors';
import { boardActions } from '../../store/board/board.slice';
import './ChessPiece.scss';

interface PieceProps {
  piece: Piece;
}

export const ChessPiece: FC<PieceProps> = ({ piece }) => {
  const pieceTeamName = piece.team ? 'black' : 'white';

  const pieceClassName = `chess-piece chess-piece-${piece.name}-${pieceTeamName}`;

  const activePiece = useSelector(boardSelectors.activePiece);

  const dispatch = useDispatch();

  function handlePointerDown(): void {
    const isTheSamePiece = activePiece !== null && activePiece.id === piece.id;

    dispatch(boardActions.setActivePiece(isTheSamePiece ? null : piece));
  }

  return (
    <div
      className={pieceClassName}
      data-id={piece.id}
      onPointerDown={handlePointerDown}
    ></div>
  );
};

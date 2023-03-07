import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieceType } from '../../models/piece-type.enum';
import { Piece } from '../../models/piece.interface';
import { boardSelectors } from '../../store/board/board.selectors';
import { boardActions } from '../../store/board/board.slice';
import { Pawn } from '../Pawn/Pawn';
import './ChessPiece.scss';

interface ChessPieceProps {
  piece: Piece;
}

export const ChessPiece: FC<ChessPieceProps> = ({ piece }) => {
  const pieceTeamName: string = piece.team ? 'black' : 'white';

  const pieceClassName: string = `chess-piece chess-piece-${piece.name}-${pieceTeamName}`;

  const activePiece: Piece | null = useSelector(boardSelectors.activePiece);

  const isPawn: boolean = piece.type === PieceType.Pawn;

  const dispatch = useDispatch();

  function handleClick(): void {
    const isTheSamePiece = activePiece !== null && activePiece.id === piece.id;
    if (isTheSamePiece) {
      dispatch(boardActions.resetActivePiece());
    } else if (activePiece !== null && activePiece.team !== piece.team) {
      dispatch(boardActions.attackByActivePiece(piece));
    } else {
      dispatch(boardActions.setActivePiece(piece));
    }
  }

  return (
    <>
      {isPawn && <Pawn piece={piece} />}
      {!isPawn && <div className={pieceClassName} onClick={handleClick}></div>}
    </>
  );
};

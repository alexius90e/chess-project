import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieceProps } from '../../models/piece-props.interface';
import { PieceType } from '../../models/piece-type.enum';
import { Piece } from '../../models/piece.interface';
import { boardSelectors } from '../../store/board/board.selectors';
import { boardActions } from '../../store/board/board.slice';
import { Bishop } from '../Bishop/Bishop';
import { Knight } from '../Knight/Knight';
import { Pawn } from '../Pawn/Pawn';
import { Rook } from '../Rook/Rook';
import './ChessPiece.scss';

export const ChessPiece: FC<PieceProps> = ({ piece }) => {
  const pieceTeamName: string = piece.team ? 'black' : 'white';

  const pieceClassName: string = `chess-piece chess-piece-${piece.name}-${pieceTeamName}`;

  const activePiece: Piece | undefined = useSelector(boardSelectors.activePiece);

  const isPawn: boolean = piece.type === PieceType.Pawn;

  const isKnight: boolean = piece.type === PieceType.Knight;

  const isRook: boolean = piece.type === PieceType.Rook;

  const isBishop: boolean = piece.type === PieceType.Bishop;

  const dispatch = useDispatch();

  function handleClick(): void {
    const isTheSamePiece = activePiece && activePiece.id === piece.id;
    const isUnderAttack = activePiece && activePiece.team !== piece.team;

    if (isTheSamePiece) {
      dispatch(boardActions.resetActivePiece());
    } else if (isUnderAttack) {
      dispatch(boardActions.attackByActivePiece(piece));
    } else {
      dispatch(boardActions.setActivePiece({ piece, moves: [], attacks: [] }));
    }
  }

  return (
    <>
      {isPawn && <Pawn piece={piece} />}
      {isKnight && <Knight piece={piece} />}
      {isRook && <Rook piece={piece} />}

      {isBishop && <Bishop piece={piece} />}
      {!isPawn && !isKnight && !isRook && !isBishop && (
        <div className={pieceClassName} onClick={handleClick}></div>
      )}
    </>
  );
};

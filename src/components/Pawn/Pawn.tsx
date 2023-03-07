import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieceTeam } from '../../models/piece-team.enum';
import { Piece } from '../../models/piece.interface';
import { boardSelectors } from '../../store/board/board.selectors';
import { boardActions } from '../../store/board/board.slice';
import './Pawn.scss';

interface PawnProps {
  piece: Piece;
}

export const Pawn: FC<PawnProps> = ({ piece }) => {
  const pawnTeamName: string = piece.team ? 'black' : 'white';

  const pieceClassName: string = `pawn pawn-${pawnTeamName}`;

  const activePiece: Piece | null = useSelector(boardSelectors.activePiece);

  const { columns } = useSelector(boardSelectors.boardAxes);

  const dispatch = useDispatch();

  function handleClick(): void {
    const isTheSamePiece = activePiece !== null && activePiece.id === piece.id;
    if (isTheSamePiece) {
      dispatch(boardActions.resetActivePiece());
    } else if (activePiece !== null && activePiece.team !== piece.team) {
      dispatch(boardActions.attackByActivePiece(piece));
    } else {
      dispatch(boardActions.setActivePiece(piece));
      dispatch(boardActions.setAvailableToAttack(checkAvailableAttack()));
      dispatch(boardActions.setAvailableToMove(checkAvailableMoves()));
    }
  }

  function checkAvailableMoves(): string[] {
    const [column, row] = piece.id.split('');
    if (piece.team === PieceTeam.White) {
      return [`${column}${Number(row) + 1}`, `${column}${Number(row) + 2}`];
    } else {
      return [`${column}${Number(row) - 1}`, `${column}${Number(row) - 2}`];
    }
  }

  function checkAvailableAttack(): string[] {
    const [column, row] = piece.id.split('');
    const columnIndex = columns.indexOf(column);
    if (piece.team === PieceTeam.White) {
      return [
        `${columns[columnIndex + 1]}${Number(row) + 1}`,
        `${columns[columnIndex - 1]}${Number(row) + 1}`,
      ];
    } else {
      return [
        `${columns[columnIndex + 1]}${Number(row) - 1}`,
        `${columns[columnIndex - 1]}${Number(row) - 1}`,
      ];
    }
  }

  return <div className={pieceClassName} onClick={handleClick}></div>;
};

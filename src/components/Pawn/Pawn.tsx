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

  const activePiece: Piece | undefined = useSelector(boardSelectors.activePiece);

  const allPieceIds = useSelector(boardSelectors.allPieceIds);

  const whitePieceIds = useSelector(boardSelectors.whitePieceIds);

  const blackPieceIds = useSelector(boardSelectors.blackPieceIds);

  const { columns } = useSelector(boardSelectors.boardAxes);

  const dispatch = useDispatch();

  function handleClick(): void {
    const isTheSamePiece = activePiece && activePiece.id === piece.id;
    const isUnderAttack = activePiece && activePiece.team !== piece.team;

    if (isTheSamePiece) {
      dispatch(boardActions.resetActivePiece());
    } else if (isUnderAttack) {
      dispatch(boardActions.attackByActivePiece(piece));
    } else {
      dispatch(
        boardActions.setActivePiece({
          piece,
          moves: checkMoves(),
          attacks: checkAttacks(),
        }),
      );
    }
  }

  function checkMoves(): string[] {
    const [column, row] = piece.id.split('');
    const increment = piece.team === PieceTeam.White ? 1 : -1;
    const movesAmount = Number(piece.isFirstMove) + 1;

    return Array(movesAmount)
      .fill(null)
      .map((_, index) => `${column}${Number(row) + (index + 1) * increment}`)
      .filter((id) => !allPieceIds.includes(id));
  }

  function checkAttacks(): string[] {
    const [column, row] = piece.id.split('');
    const columnIndex = columns.indexOf(column);
    const increment = piece.team === PieceTeam.White ? 1 : -1;
    const enemyIds = piece.team === PieceTeam.White ? blackPieceIds : whitePieceIds;

    return [
      `${columns[columnIndex + 1]}${Number(row) + increment}`,
      `${columns[columnIndex - 1]}${Number(row) + increment}`,
    ].filter((id) => enemyIds.includes(id));
  }

  return <div className={pieceClassName} onClick={handleClick}></div>;
};

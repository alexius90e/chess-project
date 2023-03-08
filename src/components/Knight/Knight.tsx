import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieceProps } from '../../models/piece-props.interface';
import { PieceTeam } from '../../models/piece-team.enum';
import { Piece } from '../../models/piece.interface';
import { boardSelectors } from '../../store/board/board.selectors';
import { boardActions } from '../../store/board/board.slice';
import './Knight.scss';

export const Knight: FC<PieceProps> = ({ piece }) => {
  const isKnightWhite: boolean = piece.team === PieceTeam.White;

  const pieceClassName: string = `knight knight-${isKnightWhite ? 'white' : 'black'}`;

  const currentTeam = useSelector(boardSelectors.currentTeam);

  const activePiece: Piece | undefined = useSelector(boardSelectors.activePiece);

  const boardAxes = useSelector(boardSelectors.boardAxes);

  const whitePieceIds = useSelector(boardSelectors.whitePieceIds);

  const blackPieceIds = useSelector(boardSelectors.blackPieceIds);

  const dispatch = useDispatch();

  function handleClick(): void {
    const isTheSamePiece = activePiece && activePiece.id === piece.id;
    const isUnderAttack = activePiece && activePiece.team !== piece.team;
    const isTeamTurn = currentTeam === piece.team;

    if (isTheSamePiece) {
      dispatch(boardActions.resetActivePiece());
    } else if (isUnderAttack) {
      dispatch(boardActions.attackByActivePiece(piece));
    } else if (isTeamTurn) {
      console.log(checkMoves());
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
    const posX = boardAxes.columns.indexOf(column);
    const posY = boardAxes.rows.indexOf(row);
    const knightTeamIds = isKnightWhite ? whitePieceIds : blackPieceIds;
    const knightMoves = [
      { x: 2, y: -1 },
      { x: 2, y: 1 },
      { x: 1, y: -2 },
      { x: 1, y: 2 },
      { x: -2, y: -1 },
      { x: -2, y: 1 },
      { x: -1, y: -2 },
      { x: -1, y: 2 },
    ];

    return knightMoves
      .map((move: { x: number; y: number }): string => {
        const column = boardAxes.columns[posX + move.x] ?? '';
        const row = boardAxes.rows[posY + move.y] ?? '';
        return column && row ? column + row : '';
      })
      .filter((id: string): boolean => Boolean(id) && !knightTeamIds.includes(id));
  }

  function checkAttacks(): string[] {
    const knightMoveIds = checkMoves();
    const knightEnemyIds = isKnightWhite ? blackPieceIds : whitePieceIds;
    return knightMoveIds.filter((id) => knightEnemyIds.includes(id));
  }
  return <div className={pieceClassName} onClick={handleClick}></div>;
};

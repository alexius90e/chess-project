import { EntityId } from '@reduxjs/toolkit';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieceActiveData } from '../../models/piece-active-data.interface';
import { PieceProps } from '../../models/piece-props.interface';
import { PieceTeam } from '../../models/piece-team.enum';
import { boardSelectors } from '../../store/board/board.selectors';
import { boardActions } from '../../store/board/board.slice';
import './King.scss';

export const King: FC<PieceProps> = ({ piece }) => {
  const isKingWhite: boolean = piece.team === PieceTeam.White;

  const pieceClassName: string = `king king-${isKingWhite ? 'white' : 'black'}`;

  const { currentTeam, activePiece, boardAxes, whitePieceIds, blackPieceIds } = useSelector(
    boardSelectors.boardData,
  );

  const dispatch = useDispatch();

  function handleClick(): void {
    const isTheSamePiece: boolean = (activePiece && activePiece.id === piece.id) as boolean;
    const isUnderAttack: boolean = (activePiece && activePiece.team !== piece.team) as boolean;
    const isTeamTurn: boolean = currentTeam === piece.team;

    if (isTheSamePiece) {
      dispatch(boardActions.resetActivePiece());
    } else if (isUnderAttack) {
      dispatch(boardActions.attackByActivePiece(piece));
    } else if (isTeamTurn) {
      console.log(checkMoves());
      const active: PieceActiveData = { piece, moves: checkMoves(), attacks: checkAttacks() };
      dispatch(boardActions.setActivePiece(active));
    }
  }

  function getKingMoves(): string[] {
    const [column, row]: string[] = piece.id.split('');
    const posX: number = boardAxes.columns.indexOf(column);
    const posY: number = boardAxes.columns.length - boardAxes.rows.indexOf(row);
    return [
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: 1, y: -1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ]
      .map((move) => boardAxes.columns[posX + move.x] + String(posY - move.y))
      .filter((id) => id.match(/^[a-h][1-8]/g));
  }

  function checkMoves(): string[] {
    const kingMoves: string[] = getKingMoves();
    const kingTeamIds: EntityId[] = isKingWhite ? whitePieceIds : blackPieceIds;
    return kingMoves.filter((id: string): boolean => !kingTeamIds.includes(id));
  }

  function checkAttacks(): string[] {
    const kingMoves: string[] = getKingMoves();
    const kingEnemyIds: EntityId[] = isKingWhite ? blackPieceIds : whitePieceIds;
    return kingMoves.filter((id: string): boolean => kingEnemyIds.includes(id));
  }

  return <div className={pieceClassName} onClick={handleClick}></div>;
};

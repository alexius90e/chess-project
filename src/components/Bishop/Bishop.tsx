import { EntityId } from '@reduxjs/toolkit';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieceActiveData } from '../../models/piece-active-data.interface';
import { PieceProps } from '../../models/piece-props.interface';
import { PieceTeam } from '../../models/piece-team.enum';
import { boardSelectors } from '../../store/board/board.selectors';
import { boardActions } from '../../store/board/board.slice';
import './Bishop.scss';

export const Bishop: FC<PieceProps> = ({ piece }) => {
  const isBishopWhite: boolean = piece.team === PieceTeam.White;

  const pieceClassName: string = `bishop bishop-${isBishopWhite ? 'white' : 'black'}`;

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
      const active: PieceActiveData = { piece, moves: checkMoves(), attacks: checkAttacks() };
      dispatch(boardActions.setActivePiece(active));
    }
  }

  function getBishopMoves(): string[][] {
    const [column, row]: string[] = piece.id.split('');
    const posX: number = boardAxes.columns.indexOf(column);
    const posY: number = boardAxes.rows.length - boardAxes.rows.indexOf(row);

    return [
      boardAxes.columns.map((_, index, arr) => arr[posX + index] + String(posY - index)),
      boardAxes.columns.map((_, index, arr) => arr[posX - index] + String(posY - index)),
      boardAxes.columns.map((_, index, arr) => arr[posX + index] + String(posY + index)),
      boardAxes.columns.map((_, index, arr) => arr[posX - index] + String(posY + index)),
    ].map((list) => list.filter((id) => id.match(/^[a-h][1-8]/g) && id !== piece.id));
  }

  function checkBlock(id: string, index: number, array: string[]): string {
    const pieceIds: EntityId[] = [...blackPieceIds, ...whitePieceIds];
    const isBlocked: boolean =
      array.slice(0, index).filter((id) => pieceIds.includes(id)).length > 0;
    return isBlocked ? '' : id;
  }

  function checkMoves(): string[] {
    const bishopTeamIds: EntityId[] = isBishopWhite ? whitePieceIds : blackPieceIds;
    const bishopMoves: string[][] = getBishopMoves();
    return bishopMoves
      .map((list: string[]): string[] =>
        list
          .map((id: string, index: number, array: string[]): string => checkBlock(id, index, array))
          .filter((id: string): boolean => !bishopTeamIds.includes(id)),
      )
      .flat();
  }

  function checkAttacks(): string[] {
    const bishopMoves: string[][] = getBishopMoves();
    const bishopEnemyIds: EntityId[] = isBishopWhite ? blackPieceIds : whitePieceIds;
    return bishopMoves
      .map(
        (list: string[]): string =>
          list
            .map((id: string, index: number, array: string[]): string =>
              checkBlock(id, index, array),
            )
            .filter((id: string): boolean => bishopEnemyIds.includes(id))[0],
      )
      .filter((id: string): boolean => Boolean(id));
  }

  return <div className={pieceClassName} onClick={handleClick}></div>;
};

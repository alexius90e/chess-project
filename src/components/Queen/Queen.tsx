import { EntityId } from '@reduxjs/toolkit';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieceActiveData } from '../../models/piece-active-data.interface';
import { PieceProps } from '../../models/piece-props.interface';
import { PieceTeam } from '../../models/piece-team.enum';
import { boardSelectors } from '../../store/board/board.selectors';
import { boardActions } from '../../store/board/board.slice';
import './Queen.scss';

export const Queen: FC<PieceProps> = ({ piece }) => {
  const isQueenWhite: boolean = piece.team === PieceTeam.White;

  const pieceClassName: string = `queen queen-${isQueenWhite ? 'white' : 'black'}`;

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

  function getQueenMoves(): string[][] {
    const [column, row]: string[] = piece.id.split('');
    const posX: number = boardAxes.columns.indexOf(column);
    const posY: number = boardAxes.rows.indexOf(row);
    const deltaY = boardAxes.rows.length - posY;
    const rookMoveIdsX: string[] = boardAxes.columns.map((column) => column + row);
    const rookMoveIdsY: string[] = boardAxes.rows.map((row) => column + row);

    return [
      rookMoveIdsX.slice(0, posX).reverse(),
      rookMoveIdsX.slice(posX + 1),
      rookMoveIdsY.slice(0, posY).reverse(),
      rookMoveIdsY.slice(posY + 1),
      boardAxes.columns.map((_, index, arr) => arr[posX + index] + String(deltaY - index)),
      boardAxes.columns.map((_, index, arr) => arr[posX - index] + String(deltaY - index)),
      boardAxes.columns.map((_, index, arr) => arr[posX + index] + String(deltaY + index)),
      boardAxes.columns.map((_, index, arr) => arr[posX - index] + String(deltaY + index)),
    ].map((list) => list.filter((id) => id.match(/^[a-h][1-8]/g) && id !== piece.id));
  }

  function checkBlock(id: string, index: number, array: string[]): string {
    const pieceIds: EntityId[] = [...blackPieceIds, ...whitePieceIds];
    const isBlocked: boolean =
      array.slice(0, index).filter((id) => pieceIds.includes(id)).length > 0;
    return isBlocked ? '' : id;
  }

  function checkMoves(): string[] {
    const queenTeamIds: EntityId[] = isQueenWhite ? whitePieceIds : blackPieceIds;
    const queenMoves: string[][] = getQueenMoves();
    return queenMoves
      .map((list: string[]): string[] =>
        list
          .map((id: string, index: number, array: string[]): string => checkBlock(id, index, array))
          .filter((id: string): boolean => !queenTeamIds.includes(id)),
      )
      .flat();
  }

  function checkAttacks(): string[] {
    const queenMoves: string[][] = getQueenMoves();
    const queenEnemyIds: EntityId[] = isQueenWhite ? blackPieceIds : whitePieceIds;
    return queenMoves
      .map(
        (list: string[]): string =>
          list
            .map((id: string, index: number, array: string[]): string =>
              checkBlock(id, index, array),
            )
            .filter((id: string): boolean => queenEnemyIds.includes(id))[0],
      )
      .filter((id: string): boolean => Boolean(id));
  }

  return <div className={pieceClassName} onClick={handleClick}></div>;
};

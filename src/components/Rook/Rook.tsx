import { EntityId } from '@reduxjs/toolkit';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieceActiveData } from '../../models/piece-active-data.interface';
import { PieceProps } from '../../models/piece-props.interface';
import { PieceTeam } from '../../models/piece-team.enum';
import { boardSelectors } from '../../store/board/board.selectors';
import { boardActions } from '../../store/board/board.slice';
import './Rook.scss';

export const Rook: FC<PieceProps> = ({ piece }) => {
  const isRookWhite: boolean = piece.team === PieceTeam.White;

  const pieceClassName: string = `rook rook-${isRookWhite ? 'white' : 'black'}`;

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

  function getRookMoves(): string[][] {
    const [column, row]: string[] = piece.id.split('');
    const posX: number = boardAxes.columns.indexOf(column);
    const posY: number = boardAxes.rows.indexOf(row);
    const rookMoveIdsX: string[] = boardAxes.columns.map((column) => column + row);
    const rookMoveIdsY: string[] = boardAxes.rows.map((row) => column + row);
    return [
      rookMoveIdsX.slice(0, posX).reverse(),
      rookMoveIdsX.slice(posX + 1),
      rookMoveIdsY.slice(0, posY).reverse(),
      rookMoveIdsY.slice(posY + 1),
    ];
  }

  function checkBlock(id: string, index: number, array: string[]): string {
    const pieceIds: EntityId[] = [...blackPieceIds, ...whitePieceIds];
    const isBlocked: boolean =
      array.slice(0, index).filter((id) => pieceIds.includes(id)).length > 0;
    return isBlocked ? '' : id;
  }

  function checkMoves(): string[] {
    const rookTeamIds: EntityId[] = isRookWhite ? whitePieceIds : blackPieceIds;
    const rookMoves: string[][] = getRookMoves();
    return rookMoves
      .map((list: string[]): string[] =>
        list
          .map((id: string, index: number, array: string[]): string => checkBlock(id, index, array))
          .filter((id: string): boolean => !rookTeamIds.includes(id)),
      )
      .flat();
  }

  function checkAttacks(): string[] {
    const rookMoves: string[][] = getRookMoves();
    const rookEnemyIds: EntityId[] = isRookWhite ? blackPieceIds : whitePieceIds;
    return rookMoves
      .map(
        (list: string[]): string =>
          list
            .map((id: string, index: number, array: string[]): string =>
              checkBlock(id, index, array),
            )
            .filter((id: string): boolean => rookEnemyIds.includes(id))[0],
      )
      .filter((id: string): boolean => Boolean(id));
  }

  return <div className={pieceClassName} onClick={handleClick}></div>;
};

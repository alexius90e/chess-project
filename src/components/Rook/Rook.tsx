import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    const isTheSamePiece = activePiece && activePiece.id === piece.id;
    const isUnderAttack = activePiece && activePiece.team !== piece.team;
    const isTeamTurn = currentTeam === piece.team;

    if (isTheSamePiece) {
      dispatch(boardActions.resetActivePiece());
    } else if (isUnderAttack) {
      dispatch(boardActions.attackByActivePiece(piece));
    } else if (isTeamTurn) {
      dispatch(
        boardActions.setActivePiece({
          piece,
          moves: checkMoves(),
          attacks: checkAttacks(),
        }),
      );
    }
  }

  function getRookMoves(): string[][] {
    const [column, row] = piece.id.split('');
    const posX = boardAxes.columns.indexOf(column);
    const posY = boardAxes.rows.indexOf(row);
    const rookMoveIdsX = boardAxes.columns.map((column) => column + row);
    const rookMoveIdsY = boardAxes.rows.map((row) => column + row);
    return [
      rookMoveIdsX.slice(0, posX).reverse(),
      rookMoveIdsX.slice(posX + 1),
      rookMoveIdsY.slice(0, posY).reverse(),
      rookMoveIdsY.slice(posY + 1),
    ];
  }

  function checkBlock(id: string, index: number, array: string[]): string {
    const pieceIds = [...blackPieceIds, ...whitePieceIds];
    const isBlocked = array.slice(0, index).filter((id) => pieceIds.includes(id)).length > 0;
    return isBlocked ? '' : id;
  }

  function checkMoves(): string[] {
    const rookTeamIds = isRookWhite ? whitePieceIds : blackPieceIds;
    const rookMoves = getRookMoves();
    return rookMoves
      .map((list) =>
        list
          .map((id, index, array) => checkBlock(id, index, array))
          .filter((id) => !rookTeamIds.includes(id)),
      )
      .flat();
  }

  function checkAttacks(): string[] {
    const rookMoves = getRookMoves();
    const rookEnemyIds = isRookWhite ? blackPieceIds : whitePieceIds;
    return rookMoves
      .map(
        (list) =>
          list
            .map((id, index, array) => checkBlock(id, index, array))
            .filter((id) => rookEnemyIds.includes(id))[0],
      )
      .filter((id) => id);
  }

  return <div className={pieceClassName} onClick={handleClick}></div>;
};

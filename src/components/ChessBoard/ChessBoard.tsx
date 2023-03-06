import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { horizontal, vertical } from '../../helpers/chess-board-lines';
import { Tile } from '../../models/tyle.interface';
import { boardActions } from '../../store/board/board.slice';
import { ChessTile } from '../ChessTile/ChessTile';
import './ChessBoard.scss';

export const ChessBoard: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(boardActions.initBoard());
  }, [dispatch]);

  const tiles: Tile[] = useMemo(
    () =>
      vertical
        .map((itemY, positionY) =>
          horizontal.map((itemX, positionX) => {
            const id: string = itemX + itemY;
            return { id, positionX, positionY };
          })
        )
        .flat(),
    []
  );

  return (
    <section className="chess-board">
      {tiles.map((tile) => (
        <ChessTile key={tile.id} tile={tile} />
      ))}
    </section>
  );
};

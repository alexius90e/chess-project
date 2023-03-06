import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tile } from '../../models/tyle.interface';
import { boardSelectors } from '../../store/board/board.selectors';
import { boardActions } from '../../store/board/board.slice';
import { ChessTile } from '../ChessTile/ChessTile';
import './ChessBoard.scss';

export const ChessBoard: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(boardActions.initBoard());
  }, [dispatch]);

  const { rows, columns } = useSelector(boardSelectors.boardAxes);

  const tiles: Tile[] = useMemo(
    () =>
      rows
        .map((itemY, positionY) =>
          columns.map((itemX, positionX) => {
            const id: string = itemX + itemY;
            return { id, positionX, positionY };
          })
        )
        .flat(),
    [columns, rows]
  );

  return (
    <section className="chess-board">
      {tiles.map((tile) => (
        <ChessTile key={tile.id} tile={tile} />
      ))}
    </section>
  );
};

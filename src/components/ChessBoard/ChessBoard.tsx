import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { horizontal, vertical } from '../../helpers/chess-board-lines';
import { boardActions } from '../../store/board/board.slice';
import { Tile } from '../Tile/Tile';
import './ChessBoard.scss';

export const ChessBoard: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(boardActions.initBoard());
  }, [dispatch]);

  return (
    <section className="chess-board">
      {vertical.map((itemY, indexY) =>
        horizontal.map((itemX, indexX) => {
          const id: string = itemX + itemY;
          return <Tile key={id} id={id} positionX={indexX} positionY={indexY} />;
        })
      )}
    </section>
  );
};

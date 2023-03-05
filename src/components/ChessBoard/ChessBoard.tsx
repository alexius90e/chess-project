import React, { FC } from 'react';
import { horizontal, vertical } from '../../helpers/chess-board-lines';
import { Tile } from '../Tile/Tile';
import './ChessBoard.scss';

export const ChessBoard: FC = () => {
  return (
    <section className="chess-board">
      {vertical.map((itemY, indexY) =>
        horizontal.map((itemX, indexX) => (
          <Tile key={itemY + itemX} positionX={indexX} positionY={indexY} />
        ))
      )}
    </section>
  );
};

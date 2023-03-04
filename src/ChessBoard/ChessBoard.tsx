import React, { FC } from 'react';
import './ChessBoard.scss';

export const ChessBoard: FC = () => {
  const horizontal: string[] = ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];

  const vertical: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];

  return (
    <section className="chess-board">
      {vertical.map((itemX, indexX) => {
        return horizontal.map((itemY, indexY) => (
          <div
            key={itemY + itemX}
            className={`chess-board-tile ${
              (indexX % 2 === 0 && indexY % 2 === 0) ||
              (indexX % 2 !== 0 && indexY % 2 !== 0)
                ? 'chess-board-tile_light'
                : 'chess-board-tile_dark'
            }`}
          >{`${itemY}${itemX}`}</div>
        ));
      })}
    </section>
  );
};

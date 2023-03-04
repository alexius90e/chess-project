import React, { FC } from 'react';
import './ChessBoard.scss';

export const ChessBoard: FC = () => {
  const horizontal: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const vertical: string[] = ['8', '7', '6', '5', '4', '3', '2', '1'];

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
          >
            {indexY === 0 && (
              <span className="chess-board-tile__label chess-board-tile__label_horizontal">
                {itemX}
              </span>
            )}
            {indexX === vertical.length - 1 && (
              <span className="chess-board-tile__label chess-board-tile__label_vertical">
                {itemY}
              </span>
            )}
          </div>
        ));
      })}
    </section>
  );
};

import React, { FC } from 'react';
import { horizontal, vertical } from '../../helpers/chess-board-lines';
import { Tile } from '../Tile/Tile';
import './ChessBoard.scss';

export const ChessBoard: FC = () => {
  const handlePieceGrab = (event: React.MouseEvent) => {
    const element = event.target as HTMLElement;
    if (!element.classList.contains('piece')) return;
    console.log(element);
  };

  return (
    <section className="chess-board" onMouseDown={handlePieceGrab}>
      {vertical.map((itemY, indexY) =>
        horizontal.map((itemX, indexX) => (
          <Tile key={itemY + itemX} positionX={indexX} positionY={indexY} />
        ))
      )}
    </section>
  );
};

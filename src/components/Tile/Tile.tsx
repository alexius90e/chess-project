import React, { FC } from 'react';
import { horizontal, vertical } from '../../helpers/chess-board-lines';
import './Tile.scss';

interface TileProps {
  positionX: number;
  positionY: number;
}

export const Tile: FC<TileProps> = ({ positionX, positionY }) => {
  const position: string = horizontal[positionX] + vertical[positionY];

  const isDark: boolean = (positionX + positionY) % 2 === 0;

  const tileClassName: string = `tile ${isDark ? 'tile_light' : 'tile_dark'}`;

  const hasLabelX: boolean = positionY === vertical.length - 1;

  const hasLabelY: boolean = positionX === 0;

  return (
    <div className={tileClassName} data-x={positionX} data-y={positionY}>
      {hasLabelY && (
        <div className="tile__label tile__label_x">{vertical[positionY]}</div>
      )}

      {hasLabelX && (
        <div className="tile__label tile__label_y">{horizontal[positionX]}</div>
      )}

      {(position === 'a1' || position === 'h1') && (
        <img className="piece" src="assets/wr.png" alt="wr" />
      )}
    </div>
  );
};

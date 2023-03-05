import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { horizontal, vertical } from '../../helpers/chess-board-lines';
import { Piece } from '../../models/piece.interface';
import { boardSelectors } from '../../store/board/board.selectors';
import { ChessPiece } from '../ChessPiece/ChessPiece';
import './Tile.scss';

interface TileProps {
  id: string;
  positionX: number;
  positionY: number;
}

export const Tile: FC<TileProps> = ({ id, positionX, positionY }) => {
  const isDark: boolean = (positionX + positionY) % 2 === 0;

  const tileClassName: string = `tile ${isDark ? 'tile_light' : 'tile_dark'}`;

  const hasLabelX: boolean = positionY === vertical.length - 1;

  const hasLabelY: boolean = positionX === 0;

  const piece: Piece | undefined = useSelector(boardSelectors.pieceById(id));

  return (
    <div className={tileClassName} data-x={positionX} data-y={positionY}>
      {piece && <ChessPiece piece={piece} />}

      {hasLabelY && <div className="tile-label_x">{vertical[positionY]}</div>}

      {hasLabelX && <div className="tile-label_y">{horizontal[positionX]}</div>}
    </div>
  );
};

import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { horizontal, vertical } from '../../helpers/chess-board-lines';
import { Piece } from '../../models/piece.interface';
import { boardSelectors } from '../../store/board/board.selectors';
import { BoardState } from '../../store/models/board-state.interface';
import { ChessPiece } from '../ChessPiece/ChessPiece';
import './Tile.scss';

interface TileProps {
  positionX: number;
  positionY: number;
}

export const Tile: FC<TileProps> = ({ positionX, positionY }) => {
  const board: BoardState = useSelector(boardSelectors.board);

  const position: keyof BoardState = (horizontal[positionX] +
    vertical[positionY]) as keyof BoardState;

  const piece: Piece | null = board[position];

  const isDark: boolean = (positionX + positionY) % 2 === 0;

  const tileClassName: string = `tile ${isDark ? 'tile_light' : 'tile_dark'}`;

  const hasLabelX: boolean = positionY === vertical.length - 1;

  const hasLabelY: boolean = positionX === 0;

  return (
    <div className={tileClassName} data-x={positionX} data-y={positionY}>
      {piece && <ChessPiece piece={piece} />}

      {hasLabelY && (
        <div className="tile__label tile__label_x">{vertical[positionY]}</div>
      )}

      {hasLabelX && (
        <div className="tile__label tile__label_y">{horizontal[positionX]}</div>
      )}
    </div>
  );
};

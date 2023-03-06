import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { horizontal, vertical } from '../../helpers/chess-board-lines';
import { Piece } from '../../models/piece.interface';
import { Tile } from '../../models/tyle.interface';
import { boardSelectors } from '../../store/board/board.selectors';
import { boardActions } from '../../store/board/board.slice';
import { ChessPiece } from '../ChessPiece/ChessPiece';
import './ChessTile.scss';

interface TileProps {
  tile: Tile;
}

export const ChessTile: FC<TileProps> = ({ tile }) => {
  const { id, positionX, positionY } = tile;

  const isDark: boolean = (positionX + positionY) % 2 === 0;

  const tileClassName: string = `tile ${isDark ? 'tile_light' : 'tile_dark'}`;

  const hasLabelX: boolean = positionY === vertical.length - 1;

  const hasLabelY: boolean = positionX === 0;

  const piece: Piece | undefined = useSelector(boardSelectors.pieceById(id));

  const dispatch = useDispatch();

  function handlePointerUp(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    const targetId = element.dataset.id;
    targetId && dispatch(boardActions.moveActivePiece({ targetId }));
    console.log('handlePointerUp');
  }

  return (
    <div className={tileClassName} onPointerUp={handlePointerUp} data-id={id}>
      {piece && <ChessPiece piece={piece} />}

      {hasLabelY && <div className="tile-label_x">{vertical[positionY]}</div>}

      {hasLabelX && <div className="tile-label_y">{horizontal[positionX]}</div>}
    </div>
  );
};

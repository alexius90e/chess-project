import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  const { rows, columns } = useSelector(boardSelectors.boardAxes);

  const activePiece: Piece | undefined = useSelector(boardSelectors.activePiece);

  const availableTileIds: string[] = useSelector(boardSelectors.availableToMove);

  const attackedTileIds: string[] = useSelector(boardSelectors.availableToAttack);

  const tileClassList: string[] = [
    'tile',
    attackedTileIds.includes(id) ? 'attacked' : '',
    availableTileIds.includes(id) ? 'available' : '',
    activePiece && activePiece.id === id ? 'active' : '',
    (positionX + positionY) % 2 === 0 ? 'tile_light' : 'tile_dark',
  ];

  const tileClassName: string = tileClassList.join(' ');

  const hasLabelX: boolean = positionY === rows.length - 1;

  const hasLabelY: boolean = positionX === 0;

  const piece: Piece | undefined = useSelector(boardSelectors.pieceById(id));

  const dispatch = useDispatch();

  function handleClick(e: React.MouseEvent): void {
    const element = e.target as HTMLElement;
    const isTile = element.classList.contains('tile');
    if (isTile) dispatch(boardActions.moveActivePiece({ targetId: id }));
  }

  return (
    <div className={tileClassName} onClick={handleClick}>
      {piece && <ChessPiece piece={piece} />}

      {hasLabelY && <div className="tile-label_x">{rows[positionY]}</div>}

      {hasLabelX && <div className="tile-label_y">{columns[positionX]}</div>}
    </div>
  );
};

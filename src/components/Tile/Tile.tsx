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

  const isKingW = position === 'e1';

  const isQueenW = position === 'd1';

  const isRookW = ['a1', 'h1'].includes(position);

  const isBishopW = ['c1', 'f1'].includes(position);

  const isKnightW = ['b1', 'g1'].includes(position);

  const isPawnW = ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'].includes(
    position
  );

  const isKingB = position === 'e8';

  const isQueenB = position === 'd8';

  const isRookB = ['a8', 'h8'].includes(position);

  const isBishopB = ['c8', 'f8'].includes(position);

  const isKnightB = ['b8', 'g8'].includes(position);

  const isPawnB = ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'].includes(
    position
  );

  return (
    <div className={tileClassName} data-x={positionX} data-y={positionY}>
      {hasLabelY && (
        <div className="tile__label tile__label_x">{vertical[positionY]}</div>
      )}

      {hasLabelX && (
        <div className="tile__label tile__label_y">{horizontal[positionX]}</div>
      )}

      {isKingW && <div className="piece piece-king-white"></div>}

      {isQueenW && <div className="piece piece-queen-white"></div>}

      {isRookW && <div className="piece piece-rook-white"></div>}

      {isBishopW && <div className="piece piece-bishop-white"></div>}

      {isKnightW && <div className="piece piece-knight-white"></div>}

      {isPawnW && <div className="piece piece-pawn-white"></div>}

      {isKingB && <div className="piece piece-king-black"></div>}

      {isQueenB && <div className="piece piece-queen-black"></div>}

      {isRookB && <div className="piece piece-rook-black"></div>}

      {isBishopB && <div className="piece piece-bishop-black"></div>}

      {isKnightB && <div className="piece piece-knight-black"></div>}

      {isPawnB && <div className="piece piece-pawn-black"></div>}
      
    </div>
  );
};

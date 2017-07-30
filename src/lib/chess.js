import _ from 'lodash-es';
import { Chess } from 'chess.js';

let fen;// = 'r1bqkbnr/1P1ppppp/p1n5/8/8/8/P1PPPPPP/RNBQKBNR w KQkq - 1 5';

export const game = new Chess(fen);

export const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export const flags = game.FLAGS;

export const resetGame = () => {
    game.reset();

    if (fen) {
        game.load(fen);
    }
};

/**
 * Retrieves the square coordinates for an algebraic notation position
 * @param {string} position The position to compute the coordinates for
 * @returns {Array} The row and column number from 1 to 8
 */
export const getSquareCoordinates = (position) => {
    if (!_.isString(position) || _.size(position) !== 2) {
        throw new Error('Failed to compute the coordinates due to an invalid position');
    }

    return [
        Number(position[1]),
        _.indexOf(columns, position[0]) + 1
    ];
};

/**
 * Retrieves the square position in algebraic notation
 * @param {number} row The row index
 * @param {number} col The column index
 * @returns {string}
 */
export const getSquarePosition = (row, col) => {
    return `${columns[col - 1]}${row}`;
};


export const squareRank = (square) => {
    return getSquareCoordinates(square)[0];
};

export const squareFile = (square) => {
    return square[0];
};

// export const move = (from, to, promotion = null) => {
//
// };

export const getBoardSquares = () => _.zipObject(game.SQUARES, game.SQUARES.map(square => ({color: game.square_color(square), piece: game.get(square)})));

export const isPromotionMove = (piece, square) => {
    if (piece.type !== game.PAWN) return false;

    const color = piece.color;

    return ((squareRank(square) === 1 && color === game.BLACK) || (squareRank(square) === 8 && color === game.WHITE));
};


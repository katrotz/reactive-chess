import _ from 'lodash-es';
import { Chess } from 'chess.js';

let fen;// = 'r1bqkbnr/1P1ppppp/p1n5/8/8/8/P1PPPPPP/RNBQKBNR w KQkq - 1 5';

export const game = new Chess(fen);

export const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export const flags = game.FLAGS;

/**
 * Resets the chess game
 */
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

/**
 * Computes the square rank based on the algebraic notation of the square
 * @param {string} square The square position
 * @returns {number}
 */
export const squareRank = (square) => {
    return getSquareCoordinates(square)[0];
};

/**
 * Computes the square file based on the algebraic notation of the square
 * @param {string} square The square position
 * @returns {number}
 */
export const squareFile = (square) => {
    return square[0];
};

/**
 * Builds a map that describes each square with the piece placed on the square (null if NA) and the square color light|dark
 */
export const getBoardSquares = () => {
    return _.zipObject(
        game.SQUARES,
        game.SQUARES.map(square => ({color: game.square_color(square), piece: game.get(square)}))
    )
};

/**
 * Identify if placing a piece on a square will trigger a promotion
 * @param {Object} piece The piece to move
 * @param {string} square The target square
 * @returns {boolean}
 */
export const isPromotionMove = (piece, square) => {
    if (piece.type !== game.PAWN) return false;

    const color = piece.color;

    return ((squareRank(square) === 1 && color === game.BLACK) || (squareRank(square) === 8 && color === game.WHITE));
};

/**
 * Computes the alternative chess player color (w or b)
 * @param {string} color The color to compute the alternative color to
 * @returns {string} The alternative color
 */
export const alternateColor = (color) => (color === game.WHITE ? game.BLACK : game.WHITE);

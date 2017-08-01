import _ from 'lodash-es';

import lib from './../../lib';

export const defaultState = {
    board: {
        inverted: false,
        turn: 'w',
        captured: {
            w: [], b: []
        },
        squares: lib.chess.getBoardSquares()
    },
    move: {
        from: null,
        targetSquares: [],
        promotionSquare : null
    }
};

/**
 * Performs a chess move and updates the state
 * @param {Object} state The state object
 * @param {string} from The "from" square
 * @param {string} to The "to" square
 * @param {string|null} promotion The promotion piece type if applicable
 * @returns {Object} The updated state object
 */
const performMove = (state, from, to , promotion = null) => {
    const move = lib.chess.game.move({ from, to, promotion });

    if (!move) return state;

    if (_.includes(move.flags, lib.chess.flags.CAPTURE)) {
        state = capturePiece(state, {
            color: lib.chess.alternateColor(move.color),
            type: move.captured
        });
    }

    state.board.turn = lib.chess.game.turn();
    state.board.squares = lib.chess.getBoardSquares();
    state.move.from = null;
    state.move.targetSquares = [];
    state.move.promotionSquare = null;

    return state;
};

/**
 * Updates the state with the captured piece
 * @param {Object} state The state object
 * @param {Object} piece The piece to capture
 * @returns {Object} The updated state object
 */
const capturePiece = (state, piece) => {
    const player = lib.chess.alternateColor(piece.color);

    state.board.captured[player].push(piece);

    return state;
};

export default (state = Object.assign({}, defaultState), action) => {
    switch (action.type) {
        case 'RESET_GAME':
            lib.chess.resetGame();
            return Object.assign({}, defaultState);

        case 'INVERT_BOARD':
            state.board.inverted = !state.board.inverted;
            return Object.assign({}, state);

        case 'PROMOTE':
            const promotionPiece = action.payload.piece;

            if (!state.move.promotionSquare) return state;

            state = performMove(state, state.move.from, state.move.promotionSquare, promotionPiece.type);

            return Object.assign({}, state);

        case 'SELECT_SQUARE':
            const toSquare = _.get(action, 'payload.square');
            const isTarget = Boolean(_.includes(state.move.targetSquares, toSquare));
            const fromPiece = lib.chess.game.get(state.move.from);
            const toPiece = lib.chess.game.get(toSquare);

            // There is no move in progress or during the move in progress an invalid "to" square is selected
            if (!state.move.from || !isTarget) {
                const targetSquares = lib.chess.game.moves({square: toSquare, verbose: true}).map(move => move.to);
                const from = (!isTarget && !toPiece) ? null : toSquare; // reset the move in progress when invalid square selected
                return Object.assign({}, state, {move: {from, targetSquares}});
            }

            // End the move in progress or delay it in case it is a promotion
            if (!lib.chess.isPromotionMove(fromPiece, toSquare)) {
                state = performMove(state, state.move.from, toSquare);
            } else {
                state.move.promotionSquare = toSquare;
            }

            return Object.assign({}, state);
        default:
            state.board.turn = lib.chess.game.turn();
            return state;
    }
};

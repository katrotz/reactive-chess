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
        promotion : null
    }
};

export default (state = Object.assign({}, defaultState), action) => {
    const square = _.get(action, 'payload.square');

    switch (action.type) {
        case 'RESET_GAME':
            lib.chess.resetGame();

            return Object.assign({}, defaultState);

        case 'INVERT_BOARD':
            state.board.inverted = !state.board.inverted;
            return Object.assign({}, state);

        case 'PROMOTE':
            const piece = action.payload.piece;

            if (!state.move.promotion) return state;

            const success = lib.chess.game.move({
                from: state.move.from,
                to: state.move.promotion,
                promotion: piece.type
            });

            if (success) {
                state.move.promotion = null;
                state.board.turn = lib.chess.game.turn();
                state.board.squares = lib.chess.getBoardSquares();
                state.move.from = null;
                state.move.targetSquares = [];
                return Object.assign({}, state);
            }

            return state;

        case 'SELECT_SQUARE':
            const moveInProgress = Boolean(state.move.from);
            const isTarget = Boolean(_.includes(state.move.targetSquares, square));
            const hasPiece = lib.chess.game.get(square);

            if (!moveInProgress) {
                const targetSquares = lib.chess.game.moves({square, verbose: true}).map(move => move.to);
                return Object.assign({}, state, {move: {from: square, targetSquares}});
            } else if (!isTarget) {
                if (hasPiece) {
                    const targetSquares = lib.chess.game.moves({square, verbose: true}).map(move => move.to);
                    return Object.assign({}, state, {move: {from: square, targetSquares}});
                } else {
                    return Object.assign({}, state, {move: {from: null, targetSquares: []}});
                }
            } else {
                const piece = lib.chess.game.get(state.move.from);
                if (lib.chess.isPromotionMove(piece, square)) {
                    state.move.promotion = square;

                    return Object.assign({}, state);
                }

                const success = lib.chess.game.move({
                    from: state.move.from,
                    to: square
                });

                if (success) {
                    if (_.includes(success.flags, lib.chess.flags.CAPTURE)) {
                        const capturedColor = success.color === 'w' ? 'b' : 'w';

                        const piece = {
                            color: capturedColor,
                            type: success.captured
                        };
                        const player = (piece.color === 'w') ? 'b' : 'w';
                        state.board.captured[player].push(piece);
                    }

                    state.board.turn = lib.chess.game.turn();
                    state.board.squares = lib.chess.getBoardSquares();
                    state.move.from = null;
                    state.move.targetSquares = [];
                    return Object.assign({}, state);
                }

                return state;
            }
        default:
            return state;
    }
};

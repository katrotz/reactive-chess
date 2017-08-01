import { createSelector } from 'reselect'

export const isBoardInverted = (state) => {
    return Boolean(state.board.inverted);
};

export const getBoardSquares = (state) => {
    return state.board.squares;
};

export const getCapturedPieces = (state) => {
    return state.board.captured;
};

export const getMoveTargets = (state) => {
    return state.move.targetSquares;
};

export const getActiveTurn = (state) => {
    return state.board.turn;
};

export const getPromotionSquare = (state) => {
    return state.move.promotionSquare;
};

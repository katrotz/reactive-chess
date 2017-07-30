export const resetGame = () => ({type: 'RESET_GAME', payload: {}});
export const invertBoard = () => ({type: 'INVERT_BOARD', payload: {}});
export const selectSquare = (square) => ({type: 'SELECT_SQUARE', payload: {square}});
export const promote = (piece) => ({type: 'PROMOTE', payload: {piece}});
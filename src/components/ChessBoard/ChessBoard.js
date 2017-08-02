import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import _ from 'lodash-es';

import lib from './../../lib';
import actions from './../../redux/actions';
import selectors from './../../redux/selectors';
import ChessSquare from './../ChessSquare';
import ChessCemetery from './../ChessCemetery';
import ChessCoordinates from './../ChessCoordinates';
import { BoardView, BoardColumnarView, RowView } from './styledComponents';

class ChessBoard extends Component {
    static defaultProps = {
        size: 300
    };

    static propTypes = {
        size: PropTypes.number
    };

    constructor() {
        super(...arguments);

        this.state = {
            activePosition: null,
            legalMoves: [],
            fen: null
        };
    }

    render() {
        const squareSize = Math.round(this.props.size / 8);
        const rowIndexes = [8, 7, 6, 5, 4, 3, 2, 1];
        const colIndexes = [1, 2, 3, 4, 5, 6, 7, 8];

        // The rows index list depends on whether the current player plays with white or black pieces
        if (this.props.inverted) rowIndexes.reverse();

        return (
            <View>
                <ChessCemetery pieces={this.props.captured[this.props.inverted ? 'w' : 'b']}></ChessCemetery>

                <BoardView boardSize={this.props.size}>
                    <ChessCoordinates displayRanks={false} size={squareSize}></ChessCoordinates>

                    <BoardColumnarView>
                        <ChessCoordinates displayRanks={true} size={squareSize}></ChessCoordinates>

                        <View>
                            {rowIndexes.map((row) =>
                                <RowView key={row.toString()}>
                                    {colIndexes.map((col) => {
                                        const position = lib.chess.getSquarePosition(row, col);

                                        const piece = this.props.squares[position].piece;
                                        const color = this.props.squares[position].color;
                                        const isTarget = _.includes(this.props.targets, position);
                                        const isPromotion = (position === this.props.promotionSquare);

                                        return <ChessSquare key={position}
                                                            position={position}
                                                            color={color}
                                                            isTarget={isTarget}
                                                            isPromotion={isPromotion}
                                                            piece={piece}
                                                            size={squareSize}
                                                            onSelect={this.handleSquareSelect_}>
                                        </ChessSquare>
                                    })}
                                </RowView>
                            )}
                        </View>

                        <ChessCoordinates displayRanks={true} size={squareSize}></ChessCoordinates>
                    </BoardColumnarView>

                    <ChessCoordinates displayRanks={false} size={squareSize}></ChessCoordinates>
                </BoardView>

                <ChessCemetery pieces={this.props.captured[this.props.inverted ? 'b' : 'w']}></ChessCemetery>

                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Button onPress={() => {this.props.dispatch(actions.invertBoard())}} title="Flip Board" color="#4CD964"/>
                    <Button onPress={() => {this.props.dispatch(actions.resetGame())}} title="Reset" color="#FF3B30"/>
                </View>
            </View>
        );
    }

    handleSquareSelect_ = (square) => {
        if (!_.isString(square)) return this;

        this.props.dispatch(
            actions.selectSquare(square)
        );

        return this;
    }
}

function mapStateToProps(state) {
    return {
        inverted: selectors.isBoardInverted(state.chess),
        squares: selectors.getBoardSquares(state.chess),
        captured: selectors.getCapturedPieces(state.chess),
        targets: selectors.getMoveTargets(state.chess),
        promotionSquare : selectors.getPromotionSquare(state.chess),
        turn: selectors.getActiveTurn(state.chess)
    }
}

export default connect(mapStateToProps)(ChessBoard);

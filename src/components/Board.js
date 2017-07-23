import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import styled from 'styled-components/native';
import _ from 'lodash-es';
import { Chess } from 'chess.js';

import Square from './Square';

const BoardView = styled.View`
    width: ${props => props.boardSize};
    height: ${props => props.boardSize};
    border: solid black 2px;
    justifyContent: center;
    alignItems: center;
`;

const RowView = styled.View`
    flexDirection: row;
`;

export default class Board extends Component {
    static defaultProps = {
        size: 300
    };

    static COLUMNS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    constructor() {
        super(...arguments);

        this.chess = new Chess();

        this.state = {
            inverted: false,
            activePosition: null,
            legalMoves: [],
            fen: this.chess.fen()
        };
    }

    /**
     * Retrieves the square position in algebraic notation
     * @param {number} row The row index
     * @param {number} col The column index
     * @returns {string}
     */
    getSquarePosition(row, col) {
        return `${Board.COLUMNS[col - 1]}${row}`;
    }

    /**
     * Retrieves the color for the given square. The square can be identified by its coordinates (row and column indexes)
     * or by its position in algebraic notation
     * @param {number|string} row The row index or the square position
     * @param {number} col The column index
     * @returns {string|null} Possible return values 'light', 'dark' or null
     */
    getSquareColor(row, col) {
        return this.chess.square_color(
            _.size(arguments) === 2 ? this.getSquarePosition(row, col) : row
        );
    }

    render() {
        const squareSize = Math.round(this.props.size / 8);
        const rowIndexes = [8, 7, 6, 5, 4, 3, 2, 1];
        const colIndexes = [1, 2, 3, 4, 5, 6, 7, 8];

        // The rows index list depends on whether the current player plays with white or black pieces
        if (this.state.inverted) rowIndexes.reverse();

        return (
            <View>
                <BoardView boardSize={this.props.size}>
                    {rowIndexes.map((row) =>
                        <RowView key={row.toString()}>
                            {colIndexes.map((col) => {
                                const position = this.getSquarePosition(row, col);
                                const squareColor = this.getSquareColor(position);
                                const piece = this.chess.get(position);
                                const isLegalTarget = _.includes(this.state.legalMoves, position);

                                return <Square key={position}
                                               position={position}
                                               color={squareColor}
                                               isLegalTarget={isLegalTarget}
                                               piece={piece}
                                               size={squareSize}
                                               onSelect={this.handleSquareSelect_.bind(this)}>
                                </Square>
                            })}
                        </RowView>
                    )}
                </BoardView>

                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Button onPress={() => {this.setState({inverted: !this.state.inverted})}} title="Invert"/>
                    <Button onPress={() => {this.chess.reset(); this.setState({fen: this.chess.fen()})}} title="Reset"/>
                </View>
            </View>
        );
    }

    handleSquareSelect_(position) {
        if (!_.isString(position)) return this;

        const moveInProgress = Boolean(this.state.activePosition);
        const isLegalTarget = Boolean(_.includes(this.state.legalMoves, position));
        const hasPiece = this.chess.get(position);

        if (!moveInProgress) {
            this.setState({
                activePosition: position,
                legalMoves: this.chess.moves({square: position, verbose: true}).map(move => move.to)
            });
        } else if (!isLegalTarget) {
            if (hasPiece) {
                this.setState({
                    activePosition: position,
                    legalMoves: this.chess.moves({square: position, verbose: true}).map(move => move.to)
                });
            } else {
                this.setState({
                    activePosition: null,
                    legalMoves: []
                });
            }
        } else {
            const success = this.chess.move({
                from: this.state.activePosition,
                to: position
            });

            if (success) {
                this.setState({
                    activePosition: null,
                    legalMoves: [],
                    fen: this.chess.fen(),
                    invert: !this.state.inverted
                });
            }
        }

        return this;
    }

    isValidMove_(newPosition) {
        const activePosition = this.state.activePosition;
        // Todo validate move
        return activePosition ? newPosition : true;
    }

    doHandleMove_(coordinates) {
        // Todo chess js
        this.setState({activePosition: null});

        return this;
    }
}

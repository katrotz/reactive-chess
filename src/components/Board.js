import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
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
        size: 300,
        inverted: false
    };

    static COLUMNS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    constructor() {
        super(...arguments);

        this.state = {
            coordinates: null
        };

        this.chess = new Chess(this.props.fen || undefined);
    }

    get inverted() {
        return this.props.inverted;
    }

    getSquareName(row, col) {
        return `${Board.COLUMNS[col - 1]}${row}`;
    }

    render() {
        const rowIndexes = [1, 2, 3, 4, 5, 6, 7, 8];
        const colIndexes = [1, 2, 3, 4, 5, 6, 7, 8];

        // The rows index list depends on whether the current player plays with white or black pieces
        if (this.inverted) rowIndexes.reverse();

        return (
            <BoardView boardSize={this.props.size}>
                {rowIndexes.map((row) =>
                    <RowView key={row.toString()}>
                        {colIndexes.map((col) => {
                            const squareName = this.getSquareName(row, col);
                            const piece = this.chess.get(squareName);
                            return <Square key={row.toString() + col.toString()}
                                           row={row}
                                           col={col}
                                           piece={piece}
                                           activeCoordinates={this.state.coordinates}
                                           onSelect={this.handleSquareSelect_.bind(this)}>
                            </Square>
                        })}
                    </RowView>
                )}
            </BoardView>
        );
    }

    handleSquareSelect_(coordinates) {
        if (!_.isArray(coordinates)) return this;

        if (!this.state.coordinates) {
            this.setState({coordinates});
        } else if (this.isValidMove_(coordinates)) {
            this.doHandleMove_(coordinates);
        } else {
            this.setState({coordinates: null});
        }

        return this;
    }

    isValidMove_(coordinates) {
        const currentCoordinates = this.state.coordinates;
        const newCoordinates = coordinates;
        // Todo validate move
        return currentCoordinates ? currentCoordinates[0] === newCoordinates[0] : true;
    }

    doHandleMove_(coordinates) {
        // Todo chess js
        this.setState({coordinates: null});

        return this;
    }
}

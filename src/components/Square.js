import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, PropTypes, Image } from 'react-native';
import styled from 'styled-components/native';
import _ from 'lodash-es';

import Piece from './Piece';

const TouchableSquare = styled.TouchableOpacity`
    background: ${props => props.isDark ? 'gray' : 'white'};
    aspectRatio: 1;
    justifyContent: center;
    alignItems: center;
    width: 12.5%;
    height: 12.5%;
`;

TouchableSquare.defaultProps = {};

export default class Square extends Component {
    static COLUMNS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    constructor(props) {
        super(...arguments);

        /**
         * The reference to the element
         * @type {null|TouchableOpacity}
         */
        this.element = null;

        /**
         * Is the current square a dark one
         * @type {boolean}
         */
        this.isDark = !((this.props.col + this.props.row) % 2);
    }

    /**
     * The column letter corresponding to the column index according to the standard algebraic notation
     * @returns {string}
     */
    get file() {
        return Square.COLUMNS[this.props.col - 1];
    }

    /**
     * The row number according to the standard algebraic notation
     * @returns {number}
     */
    get rank() {
        return this.props.row;
    }

    /**
     * The coordinates of the square according to the standard algebraic notation
     * @returns {[string, number]}
     */
    get coordinates() {
        return [this.file, this.rank];
    }

    get isActive() {
        return _.isEqual(this.coordinates, this.props.activeCoordinates)
    }

    get isValidTarget() {
        if (!this.props.activeCoordinates) return false;
        return (this.coordinates[0] === this.props.activeCoordinates[0])
            || this.coordinates[1] === this.props.activeCoordinates[1];
    }

    render() {
        return (
            <TouchableSquare isDark={this.isDark} isActive={this.isActive} onPress={() => this.onPress_()} activeOpacity={0.7} innerRef={(ref) => (this.element = ref)}>
                <View>
                    {this.props.piece
                        ? <Piece piece={this.props.piece} size={30}></Piece>
                        : <Text></Text>
                    }
                </View>
            </TouchableSquare>
        );
    }

    onPress_() {
        this.props.onSelect(this.coordinates);
        return this;
    }
}

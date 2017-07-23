import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, PropTypes, Image } from 'react-native';
import styled from 'styled-components/native';

import Piece from './Piece';

const COLORS = {
    light: '#D08B46',
    dark: '#FFCF9D'
};

const TouchableSquare = styled.TouchableOpacity`
    background: ${props => COLORS[props.color]};
    aspectRatio: 1;
    justifyContent: center;
    alignItems: center;
    width: 12.5%;
    height: 12.5%;
`;

TargetSquare = styled.View`
    backgroundColor: ${props => props.isLegalTarget ? 'rgba(255, 249, 158,0.5)' : 'rgba(155,199,0,0)'};
    width: 100%;
    height: 100%;
    justifyContent: center;
    alignItems: center;
`;

export default class Square extends Component {
    static defaultProps = {
        position: 'a1',
        color: 'dark',
        size: 30,
        piece: null,
        isLegalTarget: false,
        onSelect: () => {}
    };

    constructor(props) {
        super(...arguments);

        /**
         * The reference to the element
         * @type {null|TouchableOpacity}
         */
        this.element = null;
    }

    render() {
        return (
            <TouchableSquare color={this.props.color} isLegalTarget={this.props.isLegalTarget} onPress={() => this.onPress_()} activeOpacity={1} innerRef={(ref) => (this.element = ref)}>
                <TargetSquare isLegalTarget={this.props.isLegalTarget}>
                    {this.props.piece
                        // ? <Text>{this.props.piece.color + this.props.piece.type}</Text>
                        ? <Piece piece={this.props.piece} size={this.props.size}></Piece>
                        : <Text style={{fontSize: 9, color: '#d9ac7d'}}>{this.props.position}</Text>
                    }
                </TargetSquare>
            </TouchableSquare>
        );
    }

    onPress_() {
        this.props.onSelect(this.props.position);
    }
}

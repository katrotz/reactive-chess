import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import _ from 'lodash-es';

import Piece from './Piece';

const PromotionView = styled.View`
    position: absolute;
    zIndex: 110;
    width: ${props => props.width};
    backgroundColor: #FFCF9D;
    border: solid black 1px;
`;

export default class Promotion extends Component {
    static defaultProps = {
        size: 100,
        color: 'w',
        position: 'a1'
    };

    render() {
        const color = this.props.color;
        const types = ['q', 'b', 'n', 'r'];

        if (color === 'b') types.reverse();

        return (
            <PromotionView width={this.props.size}>
                {types.map(type => <Piece size={this.props.size} piece={{color, type}}></Piece>)}
            </PromotionView>
        );
    }
}

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import _ from 'lodash-es';

import Piece from './Piece';

const CemeteryView = styled.View`
    flexDirection: row;
    height: 30px;
    alignItems: center;
    justifyContent: center;
`;

const FallbackText = styled.Text`
    color: #cccccc;
    textAlign: center;
`;

export default class Cemetery extends Component {
    static defaultProps = {
        color: 'w',
        pieces: []
    };

    constructor(props) {
        super(...arguments);
    }

    render() {
        const color = this.props.color;

        return (
            <CemeteryView>
                {_.size(this.props.pieces)
                    ? this.props.pieces.map((type) => <Piece piece={{type, color}} size={20}></Piece>)
                    : <FallbackText>Empty</FallbackText>
                }
            </CemeteryView>
        );
    }
}

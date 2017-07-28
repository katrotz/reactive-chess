import React, { Component } from 'react';
import _ from 'lodash-es';

import ChessPiece from './../ChessPiece';
import { CemeteryView, FallbackText } from './styledComponents';

export default class ChessCemetery extends Component {
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
                    ? this.props.pieces.map((type, index) => <ChessPiece key={type + index} piece={{type, color}} size={20}></ChessPiece>)
                    : <FallbackText>None</FallbackText>
                }
            </CemeteryView>
        );
    }
}

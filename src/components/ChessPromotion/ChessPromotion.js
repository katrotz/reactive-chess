import React, { Component } from 'react';

import ChessPiece from './../ChessPiece';
import { PromotionView } from './styledComponents';

export default class ChessPromotion extends Component {
    static defaultProps = {
        size: 100,
        piece: {color: 'w', type: 'p'},
        position: 'a1'
    };

    render() {
        const color = this.props.piece.color;
        const types = ['q', 'b', 'n', 'r'];

        if (color === 'b') types.reverse();

        return (
            <PromotionView width={this.props.size}>
                {types.map(type => <ChessPiece key={type} size={this.props.size} piece={{color, type}}></ChessPiece>)}
            </PromotionView>
        );
    }
}

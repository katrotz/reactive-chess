import React, { Component } from 'react';

import ChessPiece from './../ChessPiece';
import ChessPromotion from './../ChessPromotion';
import { TargetSquare, TouchableSquare, PositionText } from './styledComponents';

export default class ChessSquare extends Component {
    static defaultProps = {
        position: 'a1',
        color: 'dark',
        size: 30,
        piece: null,
        isTarget: false,
        isPromotion: false,
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
        const showPromotion = this.props.isPromotion;
        const piece = this.props.piece;

        return (
            <TouchableSquare color={this.props.color}
                             isTarget={this.props.isTarget}
                             onPress={() => this.onPress_()}
                             activeOpacity={1}
                             innerRef={(ref) => (this.element = ref)}>
                {showPromotion
                    ? <ChessPromotion size={this.props.size}/>
                    : <TargetSquare isTarget={this.props.isTarget}>
                        {piece
                            ? <ChessPiece piece={piece} size={this.props.size}></ChessPiece>
                            : <PositionText>{this.props.position}</PositionText>
                        }
                    </TargetSquare>}
            </TouchableSquare>
        );
    }

    onPress_() {
        this.props.onSelect(this.props.position);
    }
}

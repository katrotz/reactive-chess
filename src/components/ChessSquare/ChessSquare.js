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
        const showPromotion = false;

        return (
            <TouchableSquare color={this.props.color}
                             isLegalTarget={this.props.isLegalTarget}
                             onPress={() => this.onPress_()}
                             activeOpacity={1}
                             innerRef={(ref) => (this.element = ref)}>
                {showPromotion
                    ? <ChessPromotion piece={this.props.piece} size={this.props.size}/>
                    : <TargetSquare isLegalTarget={this.props.isLegalTarget}>
                        {this.props.piece
                            ? <ChessPiece piece={this.props.piece} size={this.props.size}></ChessPiece>
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

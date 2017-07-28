import React, { Component } from 'react';

import images from './../../config/images';
import { PieceWrap, PieceImage } from './styledComponents';

export default class ChessPiece extends Component {
    static defaultProps = {
        size: 100,
        piece: { type: 'k', color: 'w' }
    };

    constructor(props) {
        super(...arguments);
    }

    render() {
        return (
            <PieceWrap size={this.props.size}>
                <PieceImage source={images.sprites.chess.pieces}
                            size={this.props.size}
                            piece={this.props.piece}>
                </PieceImage>
            </PieceWrap>
        );
    }
}

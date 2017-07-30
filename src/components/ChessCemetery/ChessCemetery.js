import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash-es';

import ChessPiece from './../ChessPiece';
import { CemeteryView, FallbackText } from './styledComponents';

export default class ChessCemetery extends Component {
    static defaultProps = {
        pieces: []
    };

    constructor(props) {
        super(...arguments);
    }

    render() {
        return (
            <CemeteryView>
                {_.size(this.props.pieces)
                    ? this.props.pieces.map((piece, index) => <ChessPiece key={piece.type + index} piece={piece} size={20}></ChessPiece>)
                    : <FallbackText>None</FallbackText>
                }
            </CemeteryView>
        );
    }
}

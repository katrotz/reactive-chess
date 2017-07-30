import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'

import selectors from './../../redux/selectors';
import actions from './../../redux/actions';
import ChessPiece from './../ChessPiece';
import { PromotionView } from './styledComponents';

class ChessPromotion extends Component {
    static defaultProps = {
        size: 100,
        turn: 'w'
    };

    render() {
        const color = this.props.turn;
        const types = ['q', 'b', 'n', 'r'];

        if (color === 'b') types.reverse();

        return (
            <PromotionView width={this.props.size}>
                {types.map(type => <TouchableOpacity key={type} onPress={() => this.onPress_(type)}>
                    <ChessPiece size={this.props.size} piece={{color, type}}></ChessPiece>
                </TouchableOpacity>)}
            </PromotionView>
        );
    }

    onPress_(type) {
        this.props.dispatch(
            actions.promote({
                type: type,
                color: this.props.turn
            })
        );
    }
}

function mapStateToProps(state) {
    return {
        turn: selectors.getActiveTurn(state.chess)
    }
}

export default connect(mapStateToProps)(ChessPromotion);

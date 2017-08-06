import React, { Component } from 'react';

import { CoordinatesView, CoordinateView, CoordinatesText } from './styledComponents';

export default class ChessCoordinates extends Component {
    static defaultProps = {
        displayRanks: true,
        size: 30
    };

    constructor(props) {
        super(...arguments);
    }

    render() {
        const ranks = [1, 2, 3, 4, 5, 6, 7, 8];
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const coordinates = this.props.displayRanks ? ranks : files;
        return (
            <CoordinatesView displayRanks={this.props.displayRanks}>
                {coordinates.map((text) => {
                    return <CoordinateView key={text} displayRanks={this.props.displayRanks}>
                        <CoordinatesText key={text}>{text}</CoordinatesText>
                    </CoordinateView>
                })}
            </CoordinatesView>
        );
    }
}

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
        return (
            <CoordinatesView displayRanks={this.props.displayRanks}>
                {this.props.displayRanks
                    ? ranks.map((text) => <CoordinateView displayRanks={this.props.displayRanks}><CoordinatesText key={text}>{text}</CoordinatesText></CoordinateView>)
                    : files.map((text) => <CoordinateView displayRanks={this.props.displayRanks}><CoordinatesText key={text}>{text}</CoordinatesText></CoordinateView>)
                }
            </CoordinatesView>
        );
    }
}

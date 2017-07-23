import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import styled from 'styled-components/native';

import Board from './components/Board';

const Container = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
    backgroundColor: #F5FCFF;
`;

export default class App extends Component {
    constructor() {
        super(...arguments);

        this.state = {
            game: {
                fen: null
            },
            board: {
                inverted: false
            }
        };
    }

    invert() {
        this.setState({
            board: {
                inverted: !this.state.board.inverted
            }
        });
    }

    render() {
        const fen = this.state.game.fen;
        const inverted = this.state.board.inverted;
        return (
            <Container>
                <Text>{inverted ? 'White' : 'Black'}</Text>
                <Board size="300" inverted={inverted} fen={fen}></Board>
                <Text>{inverted ? 'Black' : 'White'}</Text>

                <Button onPress={() => {this.invert()}} title="Invert"/>
            </Container>
        );
    }
}

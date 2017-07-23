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

        this.state = {};
    }

    render() {
        return (
            <Container>
                <Board size="300"></Board>
            </Container>
        );
    }
}

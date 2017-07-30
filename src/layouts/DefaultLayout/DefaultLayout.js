import React, { Component } from 'react';

import ChessBoard from './../../components/ChessBoard';
import { ContainerView } from './styledComponents';

export default class DefaultLayout extends Component {
    render() {
        return (
            <ContainerView>
                <ChessBoard size={300}></ChessBoard>
            </ContainerView>
        );
    }
};

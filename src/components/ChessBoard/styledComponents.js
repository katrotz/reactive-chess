import styled from 'styled-components/native';

export const BoardView = styled.View`
    width: ${props => props.boardSize};
    height: ${props => props.boardSize};
    border: solid black 0px;
    justifyContent: center;
    alignItems: center;
`;

export const RowView = styled.View`
    flexDirection: row;
    zIndex: 100;
`;

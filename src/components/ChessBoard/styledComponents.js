import styled from 'styled-components/native';

export const BoardWrapView = styled.View`
    flex: 1;
    border: solid black 1px;
    justifyContent: center;
    alignItems: center;
`;

export const BoardView = styled.View`
    width: ${props => props.boardSize};
    height: ${props => props.boardSize};
    border: solid red 1px;
    justifyContent: center;
    alignItems: center;
`;

export const BoardColumnarView = styled.View`
    width: 100%;
    height: 100%;
    flexDirection: row;
`;

export const RowView = styled.View`
    flexDirection: row;
    zIndex: 100;
`;

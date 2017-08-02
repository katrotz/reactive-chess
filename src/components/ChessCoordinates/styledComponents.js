import styled from 'styled-components/native';

import { PositionText } from './../ChessSquare/styledComponents';

export const CoordinatesView = styled.View`
    flexDirection: ${(props) => props.displayRanks ? 'column' : 'row'};
    width: ${(props) => props.displayRanks ? 'auto' : '100%'};
    marginLeft: ${(props) => props.displayRanks ? '0' : '34px'}
    alignItems: center;
    justifyContent: center;
    border: solid black 0px;
`;

export const CoordinateView = styled.View`
    width: ${(props) => props.displayRanks ? '15px' : '12.5%'};
    height: ${(props) => props.displayRanks ? '12.5%' : '15px'};
    alignItems: center;
    justifyContent: center;
`;

export const CoordinatesText = PositionText.extend``;
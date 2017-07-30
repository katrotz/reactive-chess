import styled from 'styled-components/native';

export const COLORS = {
    light: '#D08B46',
    dark: '#FFCF9D'
};

export const TouchableSquare = styled.TouchableOpacity`
    background: ${props => COLORS[props.color]};
    aspectRatio: 1;
    justifyContent: center;
    alignItems: center;
    width: 12.5%;
    height: 12.5%;
`;

export const TargetSquare = styled.View`
    backgroundColor: ${props => props.isTarget ? 'rgba(255, 249, 158, 0.5)' : 'rgba(155, 199, 0, 0)'};
    width: 100%;
    height: 100%;
    justifyContent: center;
    alignItems: center;
`;

export const PositionText = styled.Text`
    fontSize: 9;
    color: #d9ac7d;
`;

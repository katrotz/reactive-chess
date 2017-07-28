import styled from 'styled-components/native';

export const PieceWrap = styled.View`
    width: ${props => props.size};
    height: ${props => props.size};
    borderWidth: 0;
    overflow: hidden;
`;

export const PieceImage = styled.Image`
    height: ${props => props.size * 2};
    aspectRatio: 3;
    top: ${props => spritePositions[props.piece.color][props.piece.type][0] * props.size - 1};
    left: ${props => spritePositions[props.piece.color][props.piece.type][1] * props.size - 1};
`;

const spritePositions = {
    w: {
        k: [0, 0],
        q: [0, -1],
        b: [0, -2],
        n: [0, -3],
        r: [0, -4],
        p: [0, -5]

    },
    b: {
        k: [-1, 0],
        q: [-1, -1],
        b: [-1, -2],
        n: [-1, -3],
        r: [-1, -4],
        p: [-1, -5]
    }
};
import { Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';

import RTCHome from './../components/RTCHome';
import ChessBoard from './../components/ChessBoard';

export const AppNavigator = StackNavigator({
    Home: {
        screen: RTCHome,
    },
    Chess: {
        screen: ChessBoard,
    },
}, {
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
});

export default {};

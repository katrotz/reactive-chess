import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import RTCHome from './../components/RTCHome';
import ChessBoard from './../components/ChessBoard';

export const AppNavigator = createStackNavigator({
    Home: {
        screen: ChessBoard,
    },
    Chess: {
        screen: ChessBoard,
    },
}, {
    initialRouteName: 'Home',
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
});

export default {};

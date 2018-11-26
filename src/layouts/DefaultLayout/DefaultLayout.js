import React, { Component } from 'react';
import { Button } from 'react-native';
import { createAppContainer, NavigationActions } from 'react-navigation';

import { AppNavigator } from './../../routes';
import { ContainerView } from './styledComponents';

const AppContainer = createAppContainer(AppNavigator);

class DefaultLayout extends Component {
    render() {
        return (
            <ContainerView>
                <AppContainer/>
                <Button onPress={() => NavigationActions.navigate({ routeName: 'Home' })} title="Home"/>
                <Button onPress={() => NavigationActions.navigate({ routeName: 'Chess' })} title="Chess"/>
            </ContainerView>
        );
    }
}

export default DefaultLayout;

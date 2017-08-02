import React, { Component } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux'
import { addNavigationHelpers, NavigationActions } from 'react-navigation';

import { AppNavigator } from './../../routes';
import { ContainerView } from './styledComponents';

class DefaultLayout extends Component {
    render() {
        return (
            <ContainerView>
                <AppNavigator navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav,
                })}>
                </AppNavigator>
                <Button onPress={() => this.props.dispatch(NavigationActions.navigate({ routeName: 'Home' }))} title="Home"/>
                <Button onPress={() => this.props.dispatch(NavigationActions.navigate({ routeName: 'Chess' }))} title="Chess"/>
            </ContainerView>
        );
    }
}

const mapStateToProps = (state) => ({
    nav: state.nav
});

export default connect(mapStateToProps)(DefaultLayout);

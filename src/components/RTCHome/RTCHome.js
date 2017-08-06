import React, { Component } from 'react';
import { Text, Button } from 'react-native';
import { connect } from 'react-redux'
import { SubscriptionClient } from 'subscriptions-transport-ws/dist/client';

import { RTCView } from './styledComponents';

const client = new SubscriptionClient('ws://127.0.0.1:8080/graphql/subscriptions', {
    reconnect: true
});

class RTCHome extends Component {
    render() {
        return (
            <RTCView>
                <Text>Hello RTC</Text>
                <Button onPress={this.onPress} title="Query"></Button>
            </RTCView>
        );
    }

    onPress = () => {
        client.query({
            query: '{ staticName }'
        })
            .then((v) => {
                debugger;
                console.log(v)
            }, (e) => {
                debugger;
                console.log(e)
            });
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(RTCHome);

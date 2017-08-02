import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux'

import { RTCView } from './styledComponents';

class RTCHome extends Component {
    render() {
        return (
            <RTCView>
                <Text>Hello RTC</Text>
            </RTCView>
        );
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(RTCHome);

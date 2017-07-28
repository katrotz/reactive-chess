import React, { Component } from 'react';

import DefaultLayout from './layouts/DefaultLayout';

export default class App extends Component {
    constructor() {
        super(...arguments);

        this.state = {};
    }

    render() {
        return (<DefaultLayout></DefaultLayout>);
    }
}

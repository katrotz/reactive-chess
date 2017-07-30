import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './redux/configureStore';
import DefaultLayout from './layouts/DefaultLayout';

const store = configureStore();

export default class App extends Component {
    constructor() {
        super(...arguments);
    }

    render() {
        const layout = <DefaultLayout></DefaultLayout>;

        return (
            <Provider store={store}>
                {layout}
            </Provider>
        );
    }
}

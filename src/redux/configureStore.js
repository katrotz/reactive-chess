import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';

export default (state) => {
    const store = createStore(reducers, state, applyMiddleware(/* provide middleware if applicable */));

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept(() => {
            store.replaceReducer(require('./reducers').default);
        });
    }

    return store;
}

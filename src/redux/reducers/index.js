import { combineReducers } from 'redux';

import chess from './chess';
import rtc from './rtc';
import nav from './nav';

const reducers = combineReducers({chess, rtc, nav});

export default reducers;
import { combineReducers } from 'redux';

import chess from './chess';
import rtc from './rtc';

const reducers = combineReducers({chess, rtc});

export default reducers;
import { combineReducers } from 'redux';
import leads from './leads';
import locale from './Lang';

export default combineReducers({
    locale,
    leads
})
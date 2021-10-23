import { combineReducers } from 'redux';
import leads from './leads';
import locale from './Lang';
import Auth from "./auth";

export default combineReducers({
    locale,
    leads,
    Auth
})
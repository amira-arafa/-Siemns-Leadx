import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import thunk from "redux-thunk"
// import { watchAll } from '../sagas';
// ======== Compose redux dev tool with applyMiddleware ========

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);
const store = createStore(reducers, enhancer);

// saga.run(watchAll);

export default store;
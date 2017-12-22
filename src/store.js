import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';

import reducers from './reducers';

const middleware = applyMiddleware(promise());

export default createStore(reducers, middleware);

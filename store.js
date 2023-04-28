import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { sudokuReducer } from './reducers/sudokuReducer';

const initialState = {};

const reducer = combineReducers({ sudokuReducer });

const middleware = [thunk];

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


export default store;
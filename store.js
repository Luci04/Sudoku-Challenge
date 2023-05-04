import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { sudokuReducer, boardReducer, remainReducer, solidReducer, errorRowReducer, errorColReducer, timerReducer, hasWonReducer } from './reducers/sudokuReducer';
import { } from './reducers/sudokuReducer';
const initialState = {};

const reducer = combineReducers({ sudokuReducer, boardReducer, remainReducer, solidReducer, errorRowReducer, errorColReducer, timerReducer, hasWonReducer });

const middleware = [thunk];

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


export default store;
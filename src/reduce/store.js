import {createStore, combineReducers, applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';
import {userDataReducer, ourDataReducer} from './userDataReducer';

const rootReducer = combineReducers({
	userDataReducer,
	ourDataReducer
})

const store = createStore(rootReducer)

export default store;
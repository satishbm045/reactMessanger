import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {userDataReducer, ourDataReducer, allUserDataReducer} from './userDataReducer';

const rootReducer = combineReducers({
	userDataReducer,
	ourDataReducer,
	allUserDataReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;
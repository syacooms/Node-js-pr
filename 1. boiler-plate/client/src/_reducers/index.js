// combineReducers
// root Reducer에서 하나로 합쳐준다.
import { combineReducers } from 'redux';
import user from './user_reducer';

const rootReducer = combineReducers({
    user
})

export default rootReducer;
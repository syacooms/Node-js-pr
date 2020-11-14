import {
    LOGIN_USER
} from '../_actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            //...스프레드 오퍼레이터 똑같이 state를 가져온다.
            return {...state, loginSuccess: action.payload }
            break;
    
        default:
            return state;
            break;
    }
}
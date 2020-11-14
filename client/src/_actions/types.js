export const LOGIN_USER = "login_user";
export const REGISTER_USER = "register_user";
export const AUTH_USER = "auth_user";

// 1. 파일을 찾아가는건 결국은 TYPE을 통해서 인데, 
// 우선 dispatch를 통해서 action으로 오면 action에서 할일을 한 후에   
// 저희가 combineReducers로  설정해 준 부분으로 가서  type에 따라서  
// case 조건문에서 걸러져서 return 값을 내는 형태입니다. 


// 2. LOGIN_USER='loginlogin_user' 이런식으로 해주셔도 상관이 없습니다.  
// 변수가 되는  LOGIN_USER만 action 부분과 reducer 부분에서 똑같이 LOGIN_USER로 이용을 해주시면 됩니다.  
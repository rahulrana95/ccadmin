
export default function loginReducer(state={user:1,login:0, payload:[]}, action) {

  switch (action.type) {
    case 'loginData' :
    console.log('login Reducer Called ');
    console.log(action.login)
      return Object.assign({user:1,login:action.login, payload:action.payload});
    default:
        return state;
  }


}

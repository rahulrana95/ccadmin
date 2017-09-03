
export default function userReducer(state={dataReceived:0, payload:[]}, action) {

  switch (action.type) {
    case 'userData' :
    console.log('User Reducer Called ');
      return Object.assign({dataReceived:1, payload:action.payload});
    default:
        return state;
  }


}

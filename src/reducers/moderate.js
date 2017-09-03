
export default function moderatorReducer(state={offset:0,dataReceived:0, payload:[]}, action) {

  switch (action.type) {
    case 'moderateData' :
    console.log('Moderator Reducer Called ');
      return Object.assign({offset:action.offset,dataReceived:1, payload:action.payload});
    default:
        return state;
  }


}

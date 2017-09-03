
export default function tableReducer(state={offset:0, dataReceived:0, payload:[]}, action) {

  switch (action.type) {
    case 'fetchReadOnlyComplaints' :
    console.log('REducer Called Tabke');
      return Object.assign({offset:action.offset, dataReceived:1, payload:action.payload});
    default:
        return state;
  }


}

import React from 'react';
import { Card } from 'antd';
import store from '../store/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

 class user extends React.Component {
  constructor(props){
    super(props);


    fetch(`http://ec2-18-220-252-161.us-east-2.compute.amazonaws.com:3000/user?${props.params.id}`, { method : 'GET' } )
    .then(response => response.json())
    .then(json => {
      console.log(json);
      store.dispatch({
        type:'userData',
        payload:json.result,
        offset:0
      });
    });

  }

  displayData = () => {

    if(this.props.userReducer.dataReceived !== 0){
      console.log(this.props.userReducer.payload[0].city);
      let h=(    <Card title={this.props.userReducer.payload[0].firstName} bordered={false} style={{ width: 300 }}>
            <div><img src={this.props.userReducer.payload[0].photo} style={{ width:'100%',marginBottom:'10px', marginLeft:'auto',marginRight:'auto' }}  /></div>
            <p>Name : {this.props.userReducer.payload[0].firstName} {this.props.userReducer.payload[0].lastName} </p>
            <p>City : {this.props.userReducer.payload[0].city} </p>
            <p>State : {this.props.userReducer.payload[0].state} </p>
            <p>Country : {this.props.userReducer.payload[0].country}</p>
            <p>Description : {this.props.userReducer.payload[0].description}</p>
            <p>Details : {this.props.userReducer.payload[0].details}</p>
          </Card>);
          return h;


    }

  }

  render(){
    return (

      <div style={{ background: '#ECECEC', padding: '30px' }}>
      {this.displayData()}

  </div>

    );
  }


}

function mapStateToProps(state){
	return {
		userReducer:state.userReducer
	};


	}

function matchDispatchToProps(dispatch){
	return bindActionCreators({},dispatch);


}

export default connect(mapStateToProps,matchDispatchToProps)(user);

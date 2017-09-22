import React from 'react';
import { Table, Button, message } from 'antd';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import store from '../store/index';

const columns = [{
  title: 'NAME',
  dataIndex: 'firstName',
}, {
  title: 'Gender',
  dataIndex: 'gender',
},{
  title: 'ADDRESS',
  dataIndex: 'address',
}, {
  title: 'COMPLAINT',
  dataIndex: 'description',
}, {
  title: 'PHOTO',
  dataIndex: 'photo',
},{
  title: 'LOCATION',
  dataIndex: 'mapURL',
},{
  title : 'PROFILE',
  dataIndex: 'show'
}];

let data = [];


class moderate extends React.Component {
  constructor(props){
    super(props);
    fetch(`http://ec2-52-15-116-95.us-east-2.compute.amazonaws.com:3000/complaint1?offset=0`, { method : 'GET' } )
    .then(response => response.json())
    .then(json => {
      console.log('getNExt');
      console.log(json);
      store.dispatch({
        type:'moderateData',
        payload:json.result,
        offset:0,
        dataReceived:1,
      });
    });


  }
  state = {
    selectedRowKeys: [],  // Check here to configure the default column
  };
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  deactivate = () => {

    let data={
      id:this.state.selectedRowKeys
    };

    axios.post('http://ec2-52-15-116-95.us-east-2.compute.amazonaws.com:3000/deactivate', {
    id: this.state.selectedRowKeys
  })
  .then(function (response) {
    if(response.data.status ==200){
      message.success('Complaints Deactivated Successfully');
    }
  })
  .catch(function (error) {
    message.error('Deactivation Successfully');
  });
  //
  //   fetch(`http://ec2-18-220-252-161.us-east-2.compute.amazonaws.com:3000/deactivate`, {
  //   method : 'POST',
  //   mode: "cors",
  //
  //   body: data
  // }).then(response => response.json())
  //   .then(json => {
  //     console.log(json);
  //   });


  }

  getNext = () => {

    const off=this.props.moderateReducer.offset+1;
    console.log('getNExt --------------------');
    if (this.props.moderateReducer.payload.length == 0 ){
      return ;
    }
    fetch(`http://ec2-52-15-116-95.us-east-2.compute.amazonaws.com:3000/complaint1?offset=${off}`, { method : 'GET' } )
    .then(response => response.json())
    .then(json => {
      console.log('getNExt');
      console.log(json);
      store.dispatch({
        type:'moderateData',
        payload:json.result,
        offset:off
      });
    });

  }
  getPrev = () => {

    let off=this.props.moderateReducer.offset-1;
    if ( off < 0 ){
      off = 0;
    }
    fetch(`http://ec2-52-15-116-95.us-east-2.compute.amazonaws.com:3000/complaint1?offset=${off}`, { method : 'GET' } )
    .then(response => response.json())
    .then(json => {
      console.log('Previous');
      console.log(json);
      store.dispatch({
        type:'moderateData',
        payload:json.result,
        offset:off
      });
    });

  }

  setData = () => {
    if(this.props.moderateReducer.dataReceived==1){
      console.log('SetData called');
      data=[];
      for (let i = 0; i < this.props.moderateReducer.payload.length; i++) {
        const url='user/id='+this.props.moderateReducer.payload[i].id;
        data.push({
          key: this.props.moderateReducer.payload[i].id,
          firstName: this.props.moderateReducer.payload[i].firstName + ' ' + this.props.moderateReducer.payload[i].lastName ,
          gender: this.props.moderateReducer.payload[i].gender,
          address: this.props.moderateReducer.payload[i].address,
          description: this.props.moderateReducer.payload[i].description,
          photo: <a href={this.props.moderateReducer.payload[i].photo} target="_blank" >Photo</a>,
          mapURL:  <a href={this.props.moderateReducer.payload[i].mapURL} target="_blank" >Photo</a>,
          show :   <Link to={url} >Click to Show</Link>
        });
      }

    }
  }

  myContent = () => {
    return ;
  }


  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [{
        key: 'all-data',
        text: 'Select All Data',
        onSelect: () => {
          this.setState({
            selectedRowKeys: [...Array(46).keys()],  // 0...45
          });
        },
      }, {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }, {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }],
      onSelection: this.onSelection,
    };

    return (
      <div>
      { !this.props.loginReducer.user && this.props.loginReducer.login  ? <div>
      {this.setData()}
      <div className="tableButton">
      <Button type="primary" style={{ marginLeft: '5px', marginRight: '5px', width: '80px'  }} onClick={this.getNext}>Next</Button>
      <Button type="primary" style={{ marginLeft: '5px', marginRight: '5px', width: '80px' }} onClick={this.getPrev}>Previous</Button>
      <Button type="primary" style={{ marginLeft: '5px', marginRight: '5px', width: '80px'  }} onClick={this.deactivate}>Deactivate</Button>

      <Button type="primary" style={{ marginLeft: '5px', marginRight: '5px', width: '80px'  }} >{this.props.moderateReducer.offset + 1}</Button>

      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} >

      </Table>
      </div> : <div><h1>You are not authorize to access it.</h1></div> }
      </div>
    );
  }
}

function mapStateToProps(state){
	return {
		moderateReducer:state.moderateReducer,
    loginReducer:state.loginReducer
	};


	}

function matchDispatchToProps(dispatch){
	return bindActionCreators({},dispatch);


}

export default connect(mapStateToProps,matchDispatchToProps)(moderate);

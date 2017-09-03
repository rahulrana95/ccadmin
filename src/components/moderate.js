import React from 'react';
import { Table, Button, message } from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import store from '../store/index';

const columns = [{
  title: 'First Name',
  dataIndex: 'firstName',
}, {
  title: 'Last Name',
  dataIndex: 'lastName',
}, {
  title: 'Details',
  dataIndex: 'details',
}, {
  title: 'Photo',
  dataIndex: 'photo',
}, {
  title: 'Desc',
  dataIndex: 'description',
},{
  title : 'Show',
  dataIndex: 'show'
}];

let data = [];


class moderate extends React.Component {
  constructor(props){
    super(props);
    fetch(`http://ec2-18-220-252-161.us-east-2.compute.amazonaws.com:3000/complaint1?offset=0`, { method : 'GET' } )
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

    axios.post('http://ec2-18-220-252-161.us-east-2.compute.amazonaws.com:3000/deactivate', {
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
    fetch(`http://ec2-18-220-252-161.us-east-2.compute.amazonaws.com:3000/complaint1?offset=${off}`, { method : 'GET' } )
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
    fetch(`http://ec2-18-220-252-161.us-east-2.compute.amazonaws.com:3000/complaint1?offset=${off}`, { method : 'GET' } )
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
          firstName: this.props.moderateReducer.payload[i].firstName ,
          lastName: this.props.moderateReducer.payload[i].lastName,
          details: this.props.moderateReducer.payload[i].details,
          photo: <a href={this.props.moderateReducer.payload[i].photo} target="_blank" >Photo</a>,
          description: this.props.moderateReducer.payload[i].description,
          show :   <a href={url} target="_blank">Click to Show</a>
        });
      }

    }
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
      {this.setData()}
      <div className="tableButton">
      <Button type="primary" style={{ marginLeft: '5px', marginRight: '5px', width: '80px'  }} onClick={this.getNext}>Next</Button>
      <Button type="primary" style={{ marginLeft: '5px', marginRight: '5px', width: '80px' }} onClick={this.getPrev}>Previous</Button>
      <Button type="primary" style={{ marginLeft: '5px', marginRight: '5px', width: '80px'  }} onClick={this.deactivate}>{this.props.moderateReducer.offset + 1}</Button>

      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} >

      </Table>
      </div>
    );
  }
}

function mapStateToProps(state){
	return {
		moderateReducer:state.moderateReducer
	};


	}

function matchDispatchToProps(dispatch){
	return bindActionCreators({},dispatch);


}

export default connect(mapStateToProps,matchDispatchToProps)(moderate);

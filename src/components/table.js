import React from 'react';
import { Table, Button, Modal } from 'antd';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import store from '../store/index';

let data = [];

class table extends React.Component {
  constructor(props){
    super(props);
    fetch('http://ec2-52-15-116-95.us-east-2.compute.amazonaws.com:3000/complaint?offset=0', { method : 'GET' } )
    .then(response => response.json())
    .then(json => {
      store.dispatch({
        type:'fetchReadOnlyComplaints',
        payload:json.result,
        offset:0
      });
    });


  }
  state = {
    filteredInfo: null,
    sortedInfo: null,
    page:0,
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }


  getNext = () => {

    const off=this.props.tableReducer.offset+1;
    console.log('getNExt --------------------');
    if(this.props.tableReducer.payload.length == 0){
      return ;
    }
    fetch(`http://ec2-52-15-116-95.us-east-2.compute.amazonaws.com:3000/complaint?offset=${off}`, { method : 'GET' } )
    .then(response => response.json())
    .then(json => {
      console.log('getNExt');
      console.log(json);
      store.dispatch({
        type:'fetchReadOnlyComplaints',
        payload:json.result,
        offset:off
      });
    });

  }
  getPrev = () => {

    let off=this.props.tableReducer.offset-1;
    if ( off < 0 ){
      off = 0;
    }
    fetch(`http://ec2-52-15-116-95.us-east-2.compute.amazonaws.com:3000/complaint?offset=${off}`, { method : 'GET' } )
    .then(response => response.json())
    .then(json => {
      console.log('Previous');
      console.log(json);
      store.dispatch({
        type:'fetchReadOnlyComplaints',
        payload:json.result,
        offset:off
      });
    });

  }

  setData = () => {
    console.log(this.props.tableReducer);
    console.log('setData --------------------');
    console.log(this.state.visible);
    if(this.props.tableReducer.dataReceived==1){
      data=[];
      for(let i=0;i<this.props.tableReducer.payload.length;i++){

        data.push(this.props.tableReducer.payload[i]);
        console.log('==========================');
        var ur=data[data.length -1].photo;
        var d=<a href={ur} target="_blank">Pic</a>
        data[data.length -1].photo=d;
        data[data.length -1].firstName = data[data.length -1].firstName + ' ' + data[data.length -1].lastName;
        let userURL=`user/id=${data[data.length -1].id}`;
        let show = (
          <Link to={userURL}>Click to Show</Link>
        );
        let url = (
          <a href={data[data.length-1].mapURL} target="_blank" >Location</a>
        );
        data[data.length-1].show=show;
        data[data.length-1].mapURL=url;

      }
    }

  }
  handleChange = (filters, sorter) => {
    console.log('Various parameters', filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }
  clearFilters = () => {
    this.setState({ filteredInfo: null });
  }
  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  }
  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  }
  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [{
      title: 'NAME',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'GENDER',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'ADDRESS',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'COMPLAINT',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'DETAILS',
      dataIndex: 'details',
      key: 'details',
    },
    {
      title: 'PHOTO',
      dataIndex: 'photo',
      key: 'photo',
    },
    {
      title : 'LOCATION',
      dataIndex : 'mapURL',
      key : 'mapURL'
    },
    {
      title: 'PROFILE',
      dataIndex: 'show',
      key: 'show',
    }
  ];
    return (
      <div>
        <div className="table-operations">
        {this.setData()}
        </div>
        <Table columns={columns}  dataSource={data} onChange={this.handleChange} />
        <div className="tableButton">
        <Button type="primary" style={{ marginLeft: '5px', marginRight: '5px', width: '80px'  }} onClick={this.getNext}>Next</Button>
        <Button type="primary" style={{ marginLeft: '5px', marginRight: '5px', width: '80px' }} onClick={this.getPrev}>Previous</Button>
        <Button type="primary" style={{ marginLeft: '5px', marginRight: '5px', width: '80px' }} >{this.props.tableReducer.offset+1}</Button>

        </div>
      </div>
    );
  }
}



function mapStateToProps(state){
	return {
		tableReducer:state.tableReducer
	};


	}

function matchDispatchToProps(dispatch){
	return bindActionCreators({},dispatch);


}

export default connect(mapStateToProps,matchDispatchToProps)(table);

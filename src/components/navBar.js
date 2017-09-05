import React from 'react';
import { Menu, Icon, Button } from 'antd';
import { Link } from 'react-router';
import Login from './login.js';
import {connect} from 'react-redux';
import store from '../store/index';

import {bindActionCreators} from 'redux';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class navBar extends React.Component {
  state = {
    current: 'mail',
  }
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }
  logout = () => {
    if(this.props.loginReducer.login == 1){
      console.log('Logout Called');
      store.dispatch({
        type:'loginData',
        payload:[],
        login:0
      });
    }

  }
  render() {
    return (
      <div className="body">
        <div className="headNavBar">
          <h1>Welcome CivilCops Admin</h1>
        </div>
      <div className="navBar">
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="mail">
          <Link to="/"><Icon type="mail" />All Data</Link>
        </Menu.Item>
        <Menu.Item key="app" >
          <Link to="/moderate"><Icon type="appstore" />Moderate</Link>
        </Menu.Item>


      </Menu></div>
      <div className="contentArea">
      <div>
        <Button onClick={this.logout}>{this.props.loginReducer.login ? <p>Logout</p> :  <p>Login Please</p> }</Button>
      </div>
      { this.props.loginReducer.login ?  this.props.children : <Login /> }
      </div>


      </div>
    );
  }
}


function mapStateToProps(state){
  return {
    loginReducer:state.loginReducer
  };


  }

function matchDispatchToProps(dispatch){
  return bindActionCreators({},dispatch);


}

export default connect(mapStateToProps,matchDispatchToProps)(navBar);

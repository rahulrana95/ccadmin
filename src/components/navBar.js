import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class navBar extends React.Component {
  state = {
    current: 'mail',
  }
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
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
      {this.props.children}
      </div>


      </div>
    );
  }
}

import React from 'react';
import { Card, message } from 'antd';
import store from '../store/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios';
const FormItem = Form.Item;

 class Login1 extends React.Component {
  constructor(props){
    super(props);

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        axios.post('http://ec2-52-15-116-95.us-east-2.compute.amazonaws.com:3000/login', {
        username:values.userName,
        password:values.password
      })
      .then(function (response) {
        console.log(response.data);
        if(response.data.status ==200 && response.data.verifyStatus==true){
          message.success('login Successfully');
          store.dispatch({
            type:'loginData',
            payload:[],
            login:1,
            user: response.data.user
          });

        }
        else {
          message.error('Cant Login.');
        }
      })
      .catch(function (error) {
        message.error('Cant Login.');
      });
      }
    });
  }




  render() {
    const { getFieldDecorator } = this.props.form;
      return (
        <div id="loginForm" >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>

            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </FormItem>
        </Form>
        </div>
      );
    }
  }

  const Login= Form.create()(Login1);


  function mapStateToProps(state){
  	return {
  		loginReducer:state.loginReducer
  	};



  	}

  function matchDispatchToProps(dispatch){
  	return bindActionCreators({},dispatch);


  }

  export default connect(mapStateToProps,matchDispatchToProps)(Login);

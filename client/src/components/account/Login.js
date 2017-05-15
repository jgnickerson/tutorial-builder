/*
 * Handle all the styling and rendering concerns here
 */

import React from 'react';
import styled from 'styled-components';

const Loginbox = styled.div`
padding: 30px 20px 20px 50px;
margin-left: 10px;
margin-top: 25px;
background-color: #F5F5F5;
border-radius: 15px;
width: 250px;
height: 150px;
`;
const Button = styled.button`
margin-right: 5px;
margin-top: 5px;
border-radius: 15px;
`;
const Buttontwo = styled.button`
margin-top: 5px;
border-radius: 15px;
`;
const Input = styled.input`
margin-bottom: 5px;
`;




function Login(props) {
  return (
    <Loginbox>
      <Input placeholder="username" value={props.username} onChange={props.setUsername}/>
      <br/>
      <input placeholder="password" type="password" value={props.password} onChange={props.setPassword}/>
      <br/>
      <Button onClick={props.attemptLogin}>Log in</Button>
      <Buttontwo onClick={props.switchToRegister}>Sign up</Buttontwo>
      <br/>
      <label>{props.errorMessage}</label>
    </Loginbox>)
}

Login.propTypes = {
  username: React.PropTypes.string.isRequired,
  password: React.PropTypes.string.isRequired,
  setUsername: React.PropTypes.func.isRequired,
  setPassword: React.PropTypes.func.isRequired,
  attemptLogin: React.PropTypes.func.isRequired,
  errorMessage: React.PropTypes.string,
  switchToRegister: React.PropTypes.func.isRequired
}

export default Login;

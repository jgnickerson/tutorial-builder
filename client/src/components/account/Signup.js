/*
 * Handle all the styling and rendering concerns here
 */

import React from 'react';
import styled from 'styled-components';

const Signupbox = styled.div`
margin-left: 10px;
padding-left: 20px;
padding-right: 20px;
padding-top: 10px;
padding-bottom: 20px;
background-color: #F5F5F5;
border-radius: 15px;
width: 250px;
height: 250px;
`;
const Header = styled.h1`
color: black;
margin-left:5px;
`;
const Button = styled.button`
margin-right: 5px;
margin-top: 5px;
border-radius: 15px;
margin-left: 10px;

`;
const Buttontwo = styled.button`
margin-top: 5px;
border-radius: 15px;
margin-left: 10px;

`;
const Input = styled.input`
margin-left: 10px;
margin-bottom: 5px;
`;




function Signup(props) {
  return (
    <Signupbox>
      <Header>Registration</Header>
      <Input placeholder="Enter a username" value={props.username} onChange={props.setUsername}/>
      <br/>
      <Input placeholder="Enter a password" type="password" value={props.password} onChange={props.setPassword}/>
      <br/>
      <Input placeholder="Re-enter your password" type="password" value={props.passCheck} onChange={props.setPassCheck}/>
      <br/>
      <Button onClick={props.attemptRegister}>Register</Button>
      <Buttontwo onClick={props.backToLogin}>Go back</Buttontwo>
      <br/>
      <label>{props.errorMessage}</label>
    </Signupbox>)
}

Signup.propTypes = {
  username: React.PropTypes.string.isRequired,
  password: React.PropTypes.string.isRequired,
  setUsername: React.PropTypes.func.isRequired,
  setPassword: React.PropTypes.func.isRequired,
  errorMessage: React.PropTypes.string,
  passCheck: React.PropTypes.string,
  setPassCheck: React.PropTypes.func.isRequired,
  backToLogin: React.PropTypes.func.isRequired,
  attemptRegister: React.PropTypes.func.isRequired
}

export default Signup;

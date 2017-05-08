/*
 * Handle all the styling and rendering concerns here
 */

import React from 'react';

function Login(props) {
  return (
    <div>
      <input placeholder="username" value={props.username} onChange={props.setUsername}/>
      <br/>
      <input placeholder="password" type="password" value={props.password} onChange={props.setPassword}/>
      <br/>
      <button onClick={props.attemptLogin}>Log in</button>
      <button onClick={props.switchToRegister}>Sign up</button>
      <br/>
      <label>{props.errorMessage}</label>
    </div>)
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

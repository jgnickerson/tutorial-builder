/*
 * Handle all the styling and rendering concerns here
 */

import React from 'react';

function Signup(props) {
  return (
    <div>
      <h1>Registration</h1>
      <input placeholder="Enter a username" value={props.username} onChange={props.setUsername}/>
      <br/>
      <input placeholder="Enter a password" type="password" value={props.password} onChange={props.setPassword}/>
      <br/>
      <input placeholder="Re-enter your password" type="password" value={props.passCheck} onChange={props.setPassCheck}/>
      <br/>
      <button onClick={props.attemptRegister}>Register</button>
      <button onClick={props.backToLogin}>Go back</button>
      <br/>
      <label>{props.errorMessage}</label>
    </div>)
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

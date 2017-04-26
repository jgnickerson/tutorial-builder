/*
 * Handle all the styling and rendering concerns here
 */

import React from 'react';

function Login(props) {
  return (
    <div>
      <input placeholder="username" value={props.username} onChange={props.setUsername}/>
      <br/>
      <input placeholder="password" value={props.password} onChange={props.setPassword}/>
      <br/>
      <button onClick={props.attemptLogin}>Log in</button>
      <button onClick={props.switchToRegister}>Sign up</button>
      <br/>
      <label>{props.errorMessage}</label>
    </div>)
}

// Login.propTypes = {
//   onExit: React.PropTypes.func.isRequired,
//   onCodeChange: React.PropTypes.func.isRequired,
//   instructions: React.PropTypes.array,
//   code: React.PropTypes.string
// }

export default Login;

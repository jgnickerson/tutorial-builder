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
      <input placeholder="Enter a password" value={props.password} onChange={props.setPassword}/>
      <br/>
      <input placeholder="Re-enter your password" value={props.passCheck} onChange={props.setPassCheck}/>
      <br/>
      <button onClick={props.attemptRegister}>Register</button>
      <button onClick={props.backToLogin}>Go back</button>
      <br/>
      <label>{props.errorMessage}</label>
    </div>)
}

// Signup.propTypes = {
//   onExit: React.PropTypes.func.isRequired,
//   onCodeChange: React.PropTypes.func.isRequired,
//   instructions: React.PropTypes.array,
//   code: React.PropTypes.string
// }

export default Signup;

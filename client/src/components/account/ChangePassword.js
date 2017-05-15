/*
 * Handle all the styling and rendering concerns here
 */

 import React from 'react';
 import {Col, PageHeader, ControlLabel, Form, FormGroup, FormControl, Button} from 'react-bootstrap';
  import 'bootstrap/dist/css/bootstrap.css';

function ChangePassword(props) {
  return (
    <div>
      <br/>
      <Col xs={6} xsOffset={4}><PageHeader>Change Password</PageHeader></Col>
      <Form horizontal>
      <FormGroup validationState={props.errorMessage ? "error" : null}>
        <Col componentClass={ControlLabel} xs={2} xsOffset={2}>
          Username
        </Col>
        <Col xs={6} >
          <FormControl type="username" placeholder="Username" value={props.username} onChange={props.setUsername}/>
        </Col>
      </FormGroup>

      <FormGroup validationState={props.errorMessage ? "error" : null}>
        <Col componentClass={ControlLabel} xs={2} xsOffset={2}>
          Password
        </Col>
        <Col xs={6} >
          <FormControl type="password" placeholder="Password" value={props.password} onChange={props.setPassword}/>
        </Col>
      </FormGroup>

      <FormGroup validationState={props.errorMessage ? "error" : null}>
        <Col componentClass={ControlLabel} xs={2} xsOffset={2}>
          New Password
        </Col>
        <Col xs={6} >
          <FormControl type="password" placeholder="New Password" value={props.newPass} onChange={props.setNewPass}/>
        </Col>
      </FormGroup>

      <FormGroup validationState={props.errorMessage ? "error" : null}>
        <Col componentClass={ControlLabel} xs={2} xsOffset={2}>
          Re-enter Password
        </Col>
        <Col xs={6} >
          <FormControl type="password" placeholder="Re-Enter New Password" value={props.newPassCheck} onChange={props.setNewPassCheck}/>
        </Col>
      </FormGroup>

      <FormGroup>
        <Col xsOffset={4} xs={6}>
          {props.errorMessage ? <ControlLabel type="error">{props.errorMessage}</ControlLabel> : null}
        </Col>
      </FormGroup>

      <FormGroup>
        <Col xsOffset={4} xs={6}>
          <Button type="submit" onClick={props.attemptPassChange}>
            Change Password
          </Button>
        </Col>
      </FormGroup>
    </Form>
    </div>)
}

ChangePassword.propTypes = {
  username: React.PropTypes.string.isRequired,
  password: React.PropTypes.string.isRequired,
  newPass: React.PropTypes.string.isRequired,
  newPassCheck: React.PropTypes.string,
  setUsername: React.PropTypes.func.isRequired,
  setPassword: React.PropTypes.func.isRequired,
  setNewPass: React.PropTypes.func.isRequired,
  setNewPassCheck: React.PropTypes.func.isRequired,
  errorMessage: React.PropTypes.string,
  attemptPassChange: React.PropTypes.func.isRequired
}

export default ChangePassword;

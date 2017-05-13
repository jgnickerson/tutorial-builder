/*
 * Handle all the styling and rendering concerns here
 */

import React from 'react';
import style from 'bootstrap/dist/css/bootstrap.css';
import {Grid, Row, Col, PageHeader, ControlLabel, Form, FormGroup, FormControl, ButtonToolbar, Button} from 'react-bootstrap';

function Login(props) {
  return (
    <div>
      <br/>
      <Col xs={6} xsOffset={4}><PageHeader>Sign In</PageHeader></Col>
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

      <FormGroup>
        <Col xsOffset={4} xs={6}>
          {props.errorMessage ? <ControlLabel type="error">{props.errorMessage}</ControlLabel> : null}
        </Col>
      </FormGroup>

      <FormGroup>
        <Col xsOffset={4} xs={6}>
          <Button type="submit" onClick={props.attemptLogin}>
            Sign in
          </Button>
        </Col>
      </FormGroup>
    </Form>
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

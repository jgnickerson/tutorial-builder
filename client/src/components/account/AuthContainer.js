import React, { Component } from 'react';
import Login from './Login.js';
import Signup from './Signup.js';
import ChangePassword from './ChangePassword.js';
import {Col, PageHeader, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class AuthContainer extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      passwordCheck: '',
      newPass: '',
      newPassCheck: '',
      errorMessage: ''
    }

    this.attemptLogin = this.attemptLogin.bind(this);
    this.attemptRegister = this.attemptRegister.bind(this);
    this.attemptPassChange = this.attemptPassChange.bind(this);
  }

  attemptPassChange(e) {
    e.preventDefault()
    const jwt = window.localStorage.getItem('jwt');
    if(jwt) {
      if (this.state.password && this.state.newPass && this.state.newPassCheck) {
        if (this.state.newPass === this.state.newPassCheck) {
          fetch('/changepass/', {
            method: 'PUT',
            body: JSON.stringify({password: this.state.password, newPass: this.state.newPass}),
            headers: new Headers({ 'Content-type': 'application/json', 'Authorization': 'Bearer ' + jwt})
          })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              //TODO handle error messages here
              console.log(response);
            }
          })
          .then((data) => {
            console.log(data);
            console.log("token");
            console.log(data.token);
            if (data.token) {
              localStorage.setItem('jwt', data.token);
              localStorage.setItem('user', data.username);
              this.props.handlePassChange(data.username);
            } else {
              let err;
              if (data.isBoom && (data.output.payload.message === "invalid username" || data.output.payload.message === "invalid password"))
                  err = "Invalid Username or Password";

              if (!err)
                err = "Something went wrong. Please Try Again.";

              this.setState({errorMessage: err})
            }
          });
        }
      } else {
        this.setState({errorMessage: "Please enter your credentials."})
      }
    }
  }

  attemptLogin(e) {
    //TODO check for empty password
    e.preventDefault()
    if (this.state.username) {
      fetch('/login/', {
        method: 'POST',
        body: JSON.stringify({ username: this.state.username, password: this.state.password }),
        headers: new Headers({ 'Content-type': 'application/json' })
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          //TODO handle error messages here
          console.log(response);
        }
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('user', data.username);
          this.props.handleLogin(data.username);
        } else {
          let err;
          if (data.isBoom && (data.output.payload.message === "invalid username" || data.output.payload.message === "invalid password"))
              err = "Invalid Username or Password";

          if (!err)
            err = "Something went wrong. Please Try Again.";

          this.setState({errorMessage: err})
        }
      });
    } else {
      this.setState({errorMessage: "Please enter your credentials."})
    }
  }

  attemptRegister(e) {
    e.preventDefault();
    let error;
    if (this.state.password && this.state.username) {
      if (this.state.password === this.state.passwordCheck) {
        fetch("/users/",
        {
          method:'POST',
          body: JSON.stringify({ username: this.state.username, password: this.state.password }),
          headers: new Headers({'Content-type': 'application/json'})
        })
        .then((response)=>{
          if (response.ok){
            return response.json();
          }
        })
        .then((data) => {
          if (data.token) {
            localStorage.setItem('jwt', data.token);
            localStorage.setItem('user', data.username);
            this.props.handleRegister(data.username);
          } else {
              let err;
              if (data.isBoom && data.output.payload.message === "username already exists")
                  err = "That username is already taken. Please try another one.";

              if (!err)
                  err = "Something went wrong. Please Try Again.";

              this.setState({errorMessage: err})
          }
        });
      } else {
        error = "The passwords do not match."
      }
    } else {
      if (!this.state.password && !this.state.username && !this.state.passwordCheck) {
        error = "Please enter a username and password."
      }
      else if (!this.state.password) {
        error = "Please enter a password."
      }
      else if (!this.state.username) {
        error = "Please enter a username."
      }
      this.setState({
        errorMessage: error
      });
    }
  }

  onUsernameChange(username) {
    this.setState({username})
  }

  onPasswordChange(password) {
    this.setState({password})
  }

  onPasswordCheckChange(password) {
    this.setState({passwordCheck: password})
  }

  render() {
    let active;

    switch (this.props.mode) {
      case 'changePassword':
        active = (
          <ChangePassword username={this.state.username}
                  password={this.state.password}
                  newPass={this.state.newPass}
                  newPassCheck={this.state.newPassCheck}
                  setUsername={(e) => this.setState({username: e.target.value})}
                  setPassword={(e) => this.setState({password: e.target.value})}
                  setNewPass={(e) => this.setState({newPass: e.target.value})}
                  setNewPassCheck={(e) => this.setState({newPassCheck: e.target.value})}
                  attemptPassChange={this.attemptPassChange}
                  errorMessage={this.state.errorMessage} />
        );
        break;

      case 'login':
        active = (
          <Login username={this.state.username}
                 password={this.state.password}
                 setUsername={(e) => this.setState({username: e.target.value})}
                 setPassword={(e) => this.setState({password: e.target.value})}
                 attemptLogin={this.attemptLogin}
                 errorMessage={this.state.errorMessage} />
        );
        break;

      case 'signupSuccess':
        active = (
          <div>
            <Col xs={6} xsOffset={3}><PageHeader>You have successfully registered!</PageHeader></Col>
            <Col xs={1} xsOffset={3}><Button onClick={() => this.props.switchMode('browser')}>Browse Tutorials!</Button></Col>
          </div>
        );
        break;

      case 'changePassSuccess':
        active = (
          <div>
            <Col xs={6} xsOffset={3}><PageHeader>You have successfully changed your password!</PageHeader></Col>
            <Col xs={1} xsOffset={3}><Button onClick={() => this.props.switchMode('browser')}>Browse Tutorials!</Button></Col>
          </div>
        );
        break;

      case 'signup':
      default:
        active = (
          <Signup username={this.state.username}
                  password={this.state.password}
                  passwordCheck={this.state.passwordCheck}
                  setUsername={(e) => this.setState({username: e.target.value})}
                  setPassword={(e) => this.setState({password: e.target.value})}
                  setPassCheck={(e) => this.setState({passwordCheck: e.target.value})}
                  attemptRegister={this.attemptRegister}
                  errorMessage={this.state.errorMessage}/>
        );
    }

    return (
      <div>
        <br /> <br /> <br />
        {active}
      </div>
    );
  }
}

export default AuthContainer;

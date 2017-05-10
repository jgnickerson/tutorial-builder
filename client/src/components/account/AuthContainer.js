import React, { Component } from 'react';
import styled from 'styled-components';
import Login from './Login.js';
import Signup from './Signup.js';

const CenteredTitle=styled.h1`
  text-align: center;
`;

class AuthContainer extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      passwordCheck: '',
      errorMessage: ''
    }

    this.attemptLogin = this.attemptLogin.bind(this);
    this.attemptRegister = this.attemptRegister.bind(this);
  }

  attemptLogin() {
    //TODO check for empty password
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
          this.props.handleLogin(data.username);
        } else {
          //TODO handle error messages
          console.log(data);
        }
      });
    } else {
      this.setState({errorMessage: "Please enter your credentials."})
    }
  }

  attemptRegister() {
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
          } else {
            console.log(response);
            //TODO handle various server errors here
          }
        })
        .then((data) => {
          localStorage.setItem('jwt', data.token);
          this.props.handleRegister(data.username);
        });
      } else {
        error = "The passwords do not match."
      }
    } else {
      if (!this.state.activeUser.password) {
        error = "Please enter a password."
      }
      if (!this.state.activeUser.username) {
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
      case 'login':
        active = (
          <Login username={this.state.username}
                 password={this.state.password}
                 setUsername={(e) => this.setState({username: e.target.value})}
                 setPassword={(e) => this.setState({password: e.target.value})}
                 attemptLogin={this.attemptLogin}
                 errorMessage={this.state.errorMessage}
                 switchToRegister={() => this.props.switchMode('signup')}/>
        );
        break;

      case 'signup':
        active = (
          <Signup username={this.state.username}
                  password={this.state.password}
                  passwordCheck={this.state.passwordCheck}
                  setUsername={(e) => this.setState({username: e.target.value})}
                  setPassword={(e) => this.setState({password: e.target.value})}
                  setPassCheck={(e) => this.setState({passwordCheck: e.target.value})}
                  attemptRegister={this.attemptRegister}
                  errorMessage={this.state.errorMessage}
                  backToLogin={() => this.props.switchMode('login')}/>
        );
        break;

      case 'signupSuccess':
        active = (
          <div>
            <h2>You have successfully registered!</h2>
            <br/>
            <button onClick={() => this.props.switchMode('browser')}>Browse Tutorials!</button>
          </div>
        );
      default:
    }

    return (
      <div>
        <CenteredTitle>Tutorial Builder</CenteredTitle>
        {active}
      </div>
    );
  }
}

export default AuthContainer;

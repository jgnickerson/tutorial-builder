import React, { Component } from 'react';
import styled from 'styled-components';

import Login from './components/account/Login.js';
import Signup from './components/account/Signup.js';
import TutorialBrowser from './components/browser/TutorialBrowser.js';
import TutorialContainer from './components/tutorial/TutorialContainer.js';
import MenuBar from './components/MenuBar.js';
import CreateContainer from './components/tutorial/CreateContainer.js'

const SERVER = 'http://localhost:4200';

const CenteredTitle=styled.h1`
  text-align: center;
`;

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      mode: 'login',
      activeTutorial: null,
      activeUser: {
        username: "",
        password: "",
      },
      errorMessage: ""
    };

    //ES6 Class/React thing we have to do to make sure this is bound properly...
    this.handleTutorialSelect = this.handleTutorialSelect.bind(this);
    this.handleTutorialExit = this.handleTutorialExit.bind(this);
    this.handleCreateNew = this.handleCreateNew.bind(this);
    this.attemptLogin = this.attemptLogin.bind(this);
    this.switchToRegister = this.switchToRegister.bind(this);
    this.attemptRegister = this.attemptRegister.bind(this);
    this.changeAccount = this.changeAccount.bind(this);
  }

  handleTutorialSelect(tutorialId) {
    this.setState({
      mode: 'tutorial',
      activeTutorial: tutorialId
    });
  }

  handleTutorialExit() {
    this.setState({
      mode: 'browser',
      activeTutorial: null
    })
  }

  handleCreateNew() {
    // only allow non-empty passwords and non-empty usernames
      // if the passwords match
        // put the user's info from the state into an object
        const newTutorial = {
          title: "Untitled",
          author: this.state.activeUser,
          lastUpdate: Date(),
          jsCode: "",
          htmlCode: "",
          cssCode: "",
          currentStage: null,
          instructions: "",
          published: false
        };

        // stringify the object
        const tutorial = JSON.stringify(newTutorial);

        // define the POST request
        const postRequest = new Request(
          SERVER + "/tutorials/",
          {
            method:'POST',
            body: tutorial,
            headers: new Headers({'Content-type': 'application/json'})
          }
        );

        // attempt adding the new tutorial to the db
        fetch(postRequest)
        .then((response)=>{
          if (response.ok){
            return response.json();
          } else {
            console.log("something went wrong with the new tutorial");
          }
        })
        .then((serverTutorial) => {
          if (serverTutorial) {
            this.setState({
              mode: "createNew",
              activeTutorial: serverTutorial[0]._id
            });
          }
        });
  }

  attemptLogin() {
    if (this.state.activeUser.username) {
      fetch(SERVER + '/users/'+this.state.activeUser.username)
      .then((response) => {
        //usernames matched successfully
        if (response.ok) {
          return response.json();
        } else {
          this.setState({errorMessage: "This username does not exist."});
        }
      }).then((serverUser) => {
        if (serverUser) {
          //passwords matched
          if (serverUser.password === this.state.activeUser.password) {
            this.setState({
              mode: 'browser',
              activeUser: serverUser,
              errorMessage: ""
            });
          } else {
            this.setState({errorMessage: "The password is incorrect."});
          }
        }
      });
    } else {
      this.setState({errorMessage: "Please enter your credentials."})
    }
  }

  switchToRegister() {
    this.setState({
      mode: 'signup',
      activeUser: {
        username: "",
        password: "",
      },
      errorMessage: ""
    });
  }

  attemptRegister() {
    // only allow non-empty passwords and non-empty usernames
    if (this.state.activeUser.password && this.state.activeUser.username) {
      // if the passwords match
      if (this.state.activeUser.password === this.state.passCheck) {
        // put the user's info from the state into an object
        const newUser = {
          username: this.state.activeUser.username,
          password: this.state.activeUser.password,
          tutorialsUsed: [],
          tutorialsOwned: []
        };

        // stringify the object
        const userStr = JSON.stringify(newUser);

        // define the POST request
        const postRequest = new Request(
          SERVER + "/users/",
          {
            method:'POST',
            body: userStr,
            headers: new Headers({'Content-type': 'application/json'})
          }
        );

        // attempt adding the new user to the db
        fetch(postRequest)
        .then((response)=>{
          if (response.ok){
            return response.json();
          } else {
            // the given username already exists
            this.setState({
              errorMessage: "The provided username already exists."
            });
          }
        })
        .then((serverUser) => {
          if (serverUser) {
            this.setState({
              mode: "successfulRegistration"
            });
          }
        });

      } else {
        this.setState({
          errorMessage: "The passwords do not match."
        });
      }

    } else {
      // handle error messages for empty usernames and passwords
      let errorMessage;

      if (!this.state.activeUser.password) {
        errorMessage = "Please enter a password."
      }

      if (!this.state.activeUser.username) {
        errorMessage = "Please enter a username."
      }

      this.setState({
        errorMessage: errorMessage
      });
    }
  }

  changeAccount() {
    this.setState({
      mode: 'login',
      activeTutorial: null,
      activeUser: {
        username: "",
        password: "",
      },
      errorMessage: ""
    });
  }

  autoSave(modifiedCode, currentStage) {

    //put the new code in user's tutorialsUsed
    let updatedUser = Object.assign({}, this.state.activeUser);
    updatedUser.tutorialsUsed.map((item) => {
      if (item._id == this.state.activeTutorial) {
        item.js = modifiedCode.js;
        item.css = modifiedCode.css;
        item.html = modifiedCode.html;
        item.currentStage = currentStage;
      }

      return item;
    });

    // stringify the object
    const userStr = JSON.stringify(updatedUser);

    // define the PUT request
    const putRequest = new Request(
      SERVER + "/users/" + updatedUser._id,
      {
        method:'PUT',
        body: userStr,
        headers: new Headers({'Content-type': 'application/json'})
      }
    );

    // send the obj to the server
    fetch(putRequest)
    .then((response)=>{
      if (response.ok){
        return response.json();
      }
    })
    .then((serverUser) => {

      // then set the state
      this.setState({
        user: serverUser
      });

    });
  }

  render() {
    let activeComponent;

    if (this.state.mode === 'login') {
      activeComponent = (
        <div>
          <CenteredTitle>Tutorial Builder</CenteredTitle>
          <Login username={this.state.activeUser.username}
                 password={this.state.activeUser.password}
                 setUsername={(event) => this.setState({activeUser: {username: event.target.value, password: this.state.activeUser.password }})}
                 setPassword={(event) => this.setState({activeUser: {username: this.state.activeUser.username, password: event.target.value }})}
                 attemptLogin={this.attemptLogin}
                 errorMessage={this.state.errorMessage}
                 switchToRegister={this.switchToRegister}/>
        </div>
      );

    } else if (this.state.mode === 'signup') {
      activeComponent = (
        <div>
          <CenteredTitle>Tutorial Builder</CenteredTitle>
          <Signup username={this.state.activeUser.username}
                  password={this.state.activeUser.password}
                  setUsername={(event) => this.setState({activeUser: {username: event.target.value, password: this.state.activeUser.password }})}
                  setPassword={(event) => this.setState({activeUser: {username: this.state.activeUser.username, password: event.target.value }})}
                  errorMessage={this.state.errorMessage}
                  passCheck={this.state.passCheck}
                  setPassCheck={(event) => this.setState({passCheck: event.target.value})}
                  backToLogin={this.changeAccount}
                  attemptRegister={this.attemptRegister}/>
        </div>
      );

    } else if (this.state.mode === 'successfulRegistration') {
      activeComponent = (
        <div>
          <CenteredTitle>Tutorial Builder</CenteredTitle>
          <div>
            <h2>You have successfully registered!</h2>
            <br/>
            <button onClick={this.changeAccount}>Go back to Log In</button>
          </div>
        </div>
      );

    } else if (this.state.mode === 'browser') {
      activeComponent = (
        <div>
          <MenuBar createNew={this.handleCreateNew} logout={this.changeAccount} browse={this.handleTutorialExit}/>
          <TutorialBrowser onSelect={this.handleTutorialSelect}/>
        </div>
      );
    } else if (this.state.mode === 'createNew') {
      activeComponent = (
        <div>
        <MenuBar createNew={this.handleCreateNew} logout={this.changeAccount} browse={this.handleTutorialExit}/>
        <CreateContainer onExit={this.handleTutorialExit}
                           activeTutorial={this.state.activeTutorial}
                           username={this.state.activeUser.username}/>;
      </div>
    );
    }
    else {
      // if the user selected a tutorial, show it to them
      activeComponent = (
        <div>
          <MenuBar createNew={this.handleCreateNew} logout={this.changeAccount} browse={this.handleTutorialExit}/>
          <TutorialContainer onExit={this.handleTutorialExit}
                             activeTutorial={this.state.activeTutorial}
                             username={this.state.activeUser.username}
                             autoSave={(modifiedCode, currentStage) => this.autoSave(modifiedCode, currentStage)}/>;
        </div>
      );
    }

    return (
      <div className="App">
        {activeComponent}
      </div>
    )
  }
}

export default App;

import React, { Component } from 'react';
import styled from 'styled-components';

import AuthContainer from './components/account/AuthContainer.js';
import TutorialBrowser from './components/browser/TutorialBrowser.js';
import TutorialContainer from './components/tutorial/TutorialContainer.js';
import MenuBar from './components/MenuBar.js';

const SERVER = 'http://localhost:4200';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      mode: 'login',
      activeTutorial: null,
      errorMessage: ""
    };

    //ES6 Class/React thing we have to do to make sure this is bound properly...
    this.handleTutorialSelect = this.handleTutorialSelect.bind(this);
    this.handleTutorialExit = this.handleTutorialExit.bind(this);
    this.switchMode = this.switchMode.bind(this);
  }

  handleTutorialSelect(tutorialId) {
    this.setState({ mode: 'tutorial', activeTutorial: tutorialId });
  }

  handleTutorialExit() {
    this.setState({ mode: 'browser', activeTutorial: null, errorMessage: "" })
  }

  switchMode(mode) {
    this.setState({ mode: mode, errorMessage: "" });
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

    switch (this.state.mode) {
      case 'login':
      case 'signup':
      case 'signupSuccess':
        activeComponent = (
          <div>
            <AuthContainer mode={this.state.mode} switchMode={this.switchMode}/>
          </div>
        );
        break;

      case 'browser':
        activeComponent = (
          <div>
            <MenuBar logout={() => this.switchMode('login')} browse={this.handleTutorialExit}/>
            <TutorialBrowser onSelect={this.handleTutorialSelect}/>
          </div>
        );
        break;

      //mode === 'tutorial'
      default:
        activeComponent = (
          <div>
            <MenuBar logout={() => this.switchMode('login')} browse={this.handleTutorialExit}/>
            <TutorialContainer onExit={this.handleTutorialExit}
                               activeTutorial={this.state.activeTutorial}
                               autoSave={(modifiedCode, currentStage) => this.autoSave(modifiedCode, currentStage)}/>;
          </div>
        );
    }

    return (
      <div className="App">
        { activeComponent }
      </div>
    )
  }
}

export default App;

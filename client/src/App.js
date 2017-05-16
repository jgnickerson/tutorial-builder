import React, { Component } from 'react';

import AuthContainer from './components/account/AuthContainer.js';
import TutorialBrowser from './components/browser/TutorialBrowser.js';
import TutorialContainer from './components/tutorial/TutorialContainer.js';
import MenuBar from './components/MenuBar.js';
import CreateContainer from './components/tutorial/CreateContainer.js'

class App extends Component {
  constructor(props){
    super(props);

    let username = window.localStorage.getItem('user');
    this.state = {
      mode: 'browser',
      browse: 'all',
      activeTutorial: null,
      username: username
    };

    //ES6 Class/React thing we have to do to make sure this is bound properly...
    this.handleTutorialSelect = this.handleTutorialSelect.bind(this);
    this.handleTutorialEdit = this.handleTutorialEdit.bind(this);
    this.handleTutorialExit = this.handleTutorialExit.bind(this);
    this.switchMode = this.switchMode.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }


  handleTutorialSelect(tutorialId) {
    this.setState({ mode: 'tutorial', activeTutorial: tutorialId });
  }

  handleTutorialEdit(tutorialId) {
    this.setState({ mode: 'createNew', activeTutorial: tutorialId});
  }

  handleTutorialExit(browserMode) {
    this.setState({
      mode: 'browser',
      activeTutorial: null,
      browse: browserMode ? browserMode : this.state.browse
    });
  }

  switchMode(mode) {
    this.setState({ mode: mode });
  }

  handleLogout() {
    window.localStorage.removeItem('jwt');
    window.localStorage.removeItem('user');
    this.setState({ mode: 'login', activeTutorial: null, username: '' })
  }

  render() {
    let activeComponent;

    switch (this.state.mode) {
      case 'login':
      case 'signup':
      case 'changePassword':
      case 'signupSuccess':
      case 'changePassSuccess':
        activeComponent = (
          <div>
            <MenuBar name={this.state.username} switchMode={this.switchMode} logout={this.handleLogout} browse={this.handleTutorialExit}/>
            <AuthContainer
                mode={this.state.mode}
                switchMode={this.switchMode}
                handleLogin={(username)=>this.setState({username: username, mode: 'browser'})}
                handleRegister={(username)=>this.setState({username: username, mode: 'signupSuccess'})}
                handlePassChange={(username)=>this.setState({username: username, mode : 'changePassSuccess'})} />
          </div>
        );
        break;

      case 'browser':
        activeComponent = (
          <div>
            <MenuBar name={this.state.username} switchMode={this.switchMode} logout={this.handleLogout} browse={this.handleTutorialExit}/>
            <TutorialBrowser mode={this.state.browse} onSelect={this.handleTutorialSelect} onEdit={this.handleTutorialEdit}/>
          </div>
        );
        break;

      case 'createNew':
        activeComponent = (
          <div>
          <MenuBar name={this.state.username} switchMode={this.switchMode} logout={this.handleLogout} browse={this.handleTutorialExit}/>
          <CreateContainer
            tutorialID={this.state.activeTutorial}
            onExit={this.handleTutorialExit}
          />
        </div>
        );
        break;

      //mode === 'tutorial'
      default:
        activeComponent = (
          <div>
            <MenuBar name={this.state.username} switchMode={this.switchMode} logout={this.handleLogout} browse={this.handleTutorialExit}/>
            <TutorialContainer onExit={this.handleTutorialExit} activeTutorial={this.state.activeTutorial}/>
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

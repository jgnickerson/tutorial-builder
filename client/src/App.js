import React, { Component } from 'react';

import AuthContainer from './components/account/AuthContainer.js';
import TutorialBrowser from './components/browser/TutorialBrowser.js';
import TutorialContainer from './components/tutorial/TutorialContainer.js';
import MenuBar from './components/MenuBar.js';
import CreateContainer from './components/tutorial/CreateContainer.js'

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
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleTutorialSelect(tutorialId) {
    this.setState({ mode: 'tutorial', activeTutorial: tutorialId });
  }

  handleTutorialExit(browserMode) {
    if (!(browserMode === 'used' || browserMode === 'owned')) {
      browserMode = null;
    }

    this.setState({
      mode: 'browser',
      activeTutorial: null,
      browserMode: browserMode
    });
  }

  // handleCreateNew() {
  //   this.setState({
  //     mode: 'createNew',
  //     activeTutorial: null
  //   });
  // }


  switchMode(mode) {
    this.setState({ mode: mode, errorMessage: "" });
  }

  handleLogout() {
    window.sessionStorage.removeItem('jwt');
    this.setState({ mode: 'login', activeTutorial: null })
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
            <MenuBar createNew={() => this.switchMode('createNew')} logout={this.handleLogout} browse={this.handleTutorialExit}/>
            <TutorialBrowser onSelect={this.handleTutorialSelect}/>
          </div>
        );
        break;

      case 'createNew':
        activeComponent = (
          <div>
          <MenuBar createNew={() => this.switchMode('createNew')} logout={this.changeAccount} browse={this.handleTutorialExit}/>
          <CreateContainer
            onExit={this.handleTutorialExit}
          />;
        </div>
        );
        break;

      //mode === 'tutorial'
      default:
        activeComponent = (
          <div>
            <MenuBar createNew={() => this.switchMode('createNew')} logout={this.handleLogout} browse={this.handleTutorialExit}/>
            <TutorialContainer onExit={this.handleTutorialExit} activeTutorial={this.state.activeTutorial}/>;
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

import React, { Component } from 'react';
import styled from 'styled-components';

import TutorialBrowser from './components/browser/TutorialBrowser.js';
import TutorialContainer from './components/tutorial/TutorialContainer.js';

const CenteredTitle=styled.h1`
  text-align: center;
`;

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      mode: 'browser',
      activeTutorial: null
    };

    //ES6 Class/React thing we have to do to make sure this is bound properly...
    this.handleTutorialSelect = this.handleTutorialSelect.bind(this);
    this.handleTutorialExit = this.handleTutorialExit.bind(this);
  }

  handleTutorialSelect(tutorialId) {
    this.setState({
      mode: 'tutorial',
      activeTutorial: tutorialId
    })
  }

  handleTutorialExit() {
    this.setState({
      mode: 'browser',
      activeTutorial: null
    })
  }

  render() {

    //display either the browser or a specific tutorial
    const activeComponent = this.state.mode === 'browser' ?
      <TutorialBrowser onSelect={this.handleTutorialSelect}/> :
      <TutorialContainer tutorialId={this.state.tutorialId} onExit={this.handleTutorialExit}/>;

    return (
      <div className="App">
        <CenteredTitle>Tutorial Builder</CenteredTitle>
        {activeComponent}
      </div>
    )
  }
}

export default App;

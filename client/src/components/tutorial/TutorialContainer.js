/*
  Container component for Tutorial
  Will handle fetching of tutorial and manage state of Tutorial (e.g. current step)
*/

import React, { Component } from 'react';
import Tutorial from './Tutorial.js';

class TutorialContainer extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return <Tutorial onExit={this.props.onExit}/>
  }
}

TutorialContainer.propTypes = {
  onExit: React.PropTypes.func.isRequired
}

export default TutorialContainer;

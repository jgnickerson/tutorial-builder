/*
  Container component for Tutorial
  Will handle fetching of tutorial and manage state of Tutorial (e.g. current step)
*/

import React, { Component } from 'react';
import Tutorial from './Tutorial.js';

class TutorialContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
    	tutorial: null
    }

    fetch('/tutorials/'+ props.tutorialId)
    .then(response=>{
    	if(response.ok){
    		return response.json();
    	}
    })
    .then(data=>{
    	this.setState({tutorial:data, code:data.stages[0].code})
    })

    this.handleCodeChange = this.handleCodeChange.bind(this);
  }

  handleCodeChange(code) {
    this.setState({code: code});
  }

  render() {
    return <Tutorial
      instructions={this.state.tutorial ? this.state.tutorial.stages[0].instructions : null}
      code={this.state.code}
      onExit={this.props.onExit}
      onCodeChange={this.handleCodeChange}
    />
  }
}

TutorialContainer.propTypes = {
  onExit: React.PropTypes.func.isRequired
}

export default TutorialContainer;

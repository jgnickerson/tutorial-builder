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
    	tutorial:null
    }

    fetch('/tutorials/'+ props.tutorialId)
    .then(response=>{
    	if(response.ok){
    		return response.json();
    	}
    })
    .then(data=>{
    	this.setState({tutorial:data})
    })

  }

  render() {
    return <Tutorial tutorial={this.state.tutorial} onExit={this.props.onExit}/>
  }
}

TutorialContainer.propTypes = {
  onExit: React.PropTypes.func.isRequired
}

export default TutorialContainer;

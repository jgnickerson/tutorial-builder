/*
  Container component for TutorialList.
  Handles fetching of tutorials from the browser
*/

import React, { Component } from 'react';
import TutorialList from './TutorialList.js';

class TutorialBrowser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tutorials:[]
    };

    fetch('/tutorials/')
    .then((response)=>{
      if (response.ok) {
        return response.json();
      }
    })
    .then((data)=>{
      this.setState({tutorials:data})
    })
    //would fetch tutorials from browser, and keep track of state like expanded tutorials here

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(tutorialId) {
    this.props.onSelect(tutorialId);
  }

  setRating(tutorialId, rating){
    console.log("should update rating");
    //update rating -- I need to be able to work with the server in order to update the rating.
    //Right now I only access the temporary data and so there is no way to store a new rating
  }

  render() {
    return <TutorialList tutorials={this.state.tutorials} onSelect={this.onSelect}/>
  }
}

TutorialBrowser.propTypes = {
  onSelect: React.PropTypes.func.isRequired
}

export default TutorialBrowser;

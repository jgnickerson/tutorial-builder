/*
  Container component for TutorialList.
  Handles fetching of tutorials from the browser
*/

import React, { Component } from 'react';
import TutorialList from './TutorialList.js';

import data from '../../../../test_data/tutorials.json';

class TutorialBrowser extends Component {
  constructor(props) {
    super(props);

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
    return <TutorialList tutorials={data} onSelect={this.onSelect}/>
  }
}

TutorialBrowser.propTypes = {
  onSelect: React.PropTypes.func.isRequired
}

export default TutorialBrowser;

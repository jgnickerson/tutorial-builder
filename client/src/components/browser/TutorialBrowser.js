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

    this.onSelect = this.onSelect.bind(this);
    this.fetchTutorials = this.fetchTutorials.bind(this);

    this.fetchTutorials(props);
  }

  fetchTutorials(props) {
    fetch('/tutorials/')
    .then((response)=>{
      if (response.ok) {
        return response.json();
      }
    })
    .then(data=>{
      this.setState({tutorials:data})
    })
    // // if browser mode is specified
    // if (props.browserMode) {
    //   // fetch user-specific data
    //   fetch('/users/'+props.username)
    //   .then((response)=>{
    //     if (response.ok) {
    //       return response.json();
    //     }
    //   })
    //   .then((userData)=>{
    //     let tutorials;
    //     if (props.browserMode === 'used') {
    //       // only the tutorials used by the user
    //       tutorials = userData.tutorialsUsed;
    //     } else {
    //       // browserMode === 'owned'
    //       // only the tutorials owned by the user
    //       tutorials = userData.tutorialsOwned;
    //     }
    //     this.setState({tutorials: tutorials});
    //
    //   });
    //
    // // otherwise fetch all tutorials
    // } else {
    //
    // }
  }

  componentWillReceiveProps(nextProps){
    this.fetchTutorials(nextProps);
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
    return (
      <div>
        <TutorialList tutorials={this.state.tutorials} onSelect={this.onSelect}/>
      </div>
    )
  }
}

TutorialBrowser.propTypes = {
  onSelect: React.PropTypes.func.isRequired
}

export default TutorialBrowser;

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

    this.fetchTutorials(props.mode);
  }

  fetchTutorials(mode) {
    const jwt = window.localStorage.getItem('jwt');
    let request;
    switch (mode) {
      case 'used':
        request = new Request('/users/tutorials', {
          method: 'GET',
          headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt}
        });
        break;

      case 'owned':
        request = new Request('/users/owner', {
          method: 'GET',
          headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt}
        });
        break;

      case 'all':
      default:
        request = new Request('/tutorials', {
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        });
    }
    fetch(request)
    .then(response=>{ if (response.ok) return response.json() })
    .then(data=>{
      if (data && !data.isBoom) {
        this.setState({tutorials:data})
      } else {
        //TODO handle errs
        console.log(data);
      }
    })
  }

  componentWillReceiveProps(nextProps){
    this.fetchTutorials(nextProps.mode);
  }

  setRating(tutorialId, rating){
    console.log("should update rating");
    //update rating -- I need to be able to work with the server in order to update the rating.
    //Right now I only access the temporary data and so there is no way to store a new rating
  }

  render() {
    return (
      <div>
        <TutorialList mode={this.props.mode} tutorials={this.state.tutorials} onSelect={this.props.onSelect} onEdit={this.props.onEdit}/>
      </div>
    )
  }
}

TutorialBrowser.propTypes = {
  onSelect: React.PropTypes.func.isRequired
}

export default TutorialBrowser;

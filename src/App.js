/*
  App.js

  App is the top-level component of our application. It is responsible for managing the data collection.

  It displays the title of the application. All of the real work is handled by the ContentArea component.
  */

import React, { Component } from 'react';
import styled from 'styled-components';

import Editor from './components/Editor.js';
import TutorialList from './components/TutorialList.js';

import data from '../test_data/tutorials.json';

const CenteredTitle=styled.h1`
  text-align: center;
`;


class App extends Component {
  constructor(props){
    super(props);


    this.state = {
      mode: 'browser' //I added this in just so we could toggle to a browser mode
    };
  }
  setRating(tutorialId, rating){  
    console.log("should update rating");
    //update rating -- I need to be able to work with the server in order to update the rating.
    //Right now I only access the temporary data and so there is no way to store a new rating
  }

  render() {
    //display either the tutorial browser or the editor
    if (this.state.mode !== 'browser'){
      return (
        <div className="App">
          <CenteredTitle>Tutorial Builder</CenteredTitle>
          <Editor />
        </div>
        );
    }
    else{
      return(<TutorialList tutorials={data} onClick={()=>this.setState({mode:'singleTutorial'})}/>);
    }

  }
}

export default App;

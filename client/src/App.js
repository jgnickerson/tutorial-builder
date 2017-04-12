import React, { Component } from 'react';
import styled from 'styled-components';

import Editor from './components/Editor.js';
import TutorialList from './components/TutorialList.js';
import Instructions from './components/Instructions.js';

import data from '../../test_data/tutorials.json';

const CenteredTitle=styled.h1`
  text-align: center;
`;


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      mode: 'browser'
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
          <ul>
            <Instructions />
            <Editor />
          </ul>
        </div>
      )
    }else{
      return(<TutorialList tutorials={data} onClick={()=>this.setState({mode:'singleTutorial'})}/>);
    }
  }
}

export default App;

/*
  App.js

  App is the top-level component of our application. It is responsible for managing the data collection.

  It displays the title of the application. All of the real work is handled by the ContentArea component.
  */

import React, { Component } from 'react';
import styled from 'styled-components';
import ExecutionEditContainer from './components/ExecutionEditContainer.js';
import Editor from './components/Editor.js';


const CenteredTitle=styled.h1`
  text-align: center;
`;


class App extends Component {
  render() {

    return (
      <div className="App">
        <CenteredTitle>Tutorial Builder</CenteredTitle>
        <ExecutionEditContainer />
      </div>
    );
  }
}

export default App;

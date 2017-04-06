/*
  Editor.js

  imports and formats CodeMirror component to allow for editing of code and updating state.code
*/

import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import styled from 'styled-components';

const CodeContainer = styled.div`
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  max-width: 720px;
  border: 1px solid #eee;
`;

class Editor extends Component{
  constructor(props){
    super(props);
    this.state = {
      code: '// Code',
      mode: 'javascript'
    };

    // dynamically load intial Code and highlighting mode

  }

  render(){

    // create CodeMirror props
    const updateCode = ((newCode) => {
      this.setState({code: newCode});
    });
    const options = {
      mode: this.state.mode,
      tabSize: 2,
      lineNumbers: true,
      lineWrapping: true
    };

    return (
      <CodeContainer>
        <CodeMirror ref="editor" value={this.state.code} onChange={updateCode} options={options} />
      </CodeContainer>
    );


  }
}


export default Editor;

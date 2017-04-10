/*
  Editor.js

  imports and formats CodeMirror component to allow for editing of code and updating state.code
*/

import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import styled from 'styled-components';

const HorizontalLI = styled.li`
  width: 45%;
  display: inline-block;
  padding: 5px;
  vertical-align: top;
`;

const CodeContainer = styled.div`
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
      <HorizontalLI>
          <CodeContainer>
            <CodeMirror ref="editor" value={this.state.code} onChange={updateCode} options={options} />
          </CodeContainer>
      </HorizontalLI>
    );


  }
}


export default Editor;

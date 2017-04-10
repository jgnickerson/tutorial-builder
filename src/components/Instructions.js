/*
  Instructions.js

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

const InstructionContainer = styled.div`
  border: 1px solid #eee;
`;

class Instructions extends Component{

  render(){

    // create CodeMirror props
    const options = {
      tabSize: 2,
      readOnly: true,
      lineWrapping: true,
      viewportMargin: Infinity
    };

    // placeholder for instruction data read from server
    const rawInstructions = [
      { type: 'text', data: 'First do this'},
      { type: 'code', data: '//This is a code snippet'},
      { type: 'text', data: 'Now do this'}
    ];

    const instructions = rawInstructions.map((item) => {
      if (item.type === 'text') {
        return (<p>{item.data}</p>);
      } else if (item.type === 'code') {
        return (<CodeMirror ref="editor" value={item.data} options={options}/>);
      } else {
        return;
      }
    });

    return (
      <HorizontalLI>
        <InstructionContainer>{instructions}</InstructionContainer>
      </HorizontalLI>
    );


  }
}


export default Instructions;

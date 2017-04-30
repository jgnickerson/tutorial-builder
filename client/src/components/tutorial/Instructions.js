/*
  Instructions.js

  imports and formats CodeMirror component to allow for editing of code and updating state.code
*/

import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import styled from 'styled-components';

const InstructionContainer = styled.li`
  width: 100%;
  height: 100%;
  display: inline-block;
  padding: 5px;
  vertical-align: top;
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
    // const rawInstructions = [
    //   { type: 'text', data: 'First do this'},
    //   { type: 'code', data: '//This is a code snippet'},
    //   { type: 'text', data: 'Now do this'}
    // ];

    const instructions = this.props.instructions
    .map((item, index) => {
      return item.type === 'text' ?
        <p key={index}>{item.data}</p> :
        <CodeMirror key={index} ref="editor" value={item.data} options={options}/>
    });

    return (
      <InstructionContainer>{instructions}</InstructionContainer>
    );


  }
}


export default Instructions;

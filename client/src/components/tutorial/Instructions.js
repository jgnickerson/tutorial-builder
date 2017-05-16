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
  overflow: scroll;
`;

const StyledH4 = styled.h4`
  display: inline-block;
  width: 87%;
  padding-right: 5%;
  word-break: break-all;
  font-weight: bold;
`;


class Instructions extends Component{

  render(){

    // create CodeMirror props
    const options = {
      tabSize: 2,
      readOnly: true,
      lineWrapping: true,
      viewportMargin: Infinity,
    };

    var instructions = this.props.instructions;
    if (instructions) {

     instructions = instructions.map((item, index) => {
       if (item.type === "Text") {
         return (<p key={index}>{item.data}</p>);
       } else if (item.type === "Header") {
         return (<StyledH4 key={index}>{item.data}</StyledH4>);
       } else if (item.type === "CSS") {
         return (<CodeMirror type="instructions" key={index} ref="editor" value={item.data} options={Object.assign({mode: "css"})}/>);
       } else if (item.type === "HTML") {
         return (<CodeMirror type="instructions" key={index} ref="editor" value={item.data} options={Object.assign({mode: "html"})}/>);
       } else {
         return (<CodeMirror type="instructions" key={index} ref="editor" value={item.data} options={Object.assign({mode: "javascript"})}/>);
       }
    });
    } else{
      instructions = <CodeMirror ref="editor" value={null} options={options}/>

  }

    return (
      <InstructionContainer>{instructions}</InstructionContainer>
    );

  }
}


export default Instructions;

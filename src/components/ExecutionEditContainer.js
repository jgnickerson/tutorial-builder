/*
    Container for the editor and exector
*/


import React, { Component } from 'react';
import styled from 'styled-components';
import Editor from './Editor.js';
import Execute from './Execute.js';


class ExecutionEditContainer extends Component{
    constructor(){
      super();
      this.state = {
        code: '// Code'
      };
}
      render(){
          return (
              <div>
                <Editor code={this.state.code} func={(newCode)=>this.setState({code:newCode})}/>
                <Execute code={this.state.code}/>
                </div>
                );
      }



}

export default ExecutionEditContainer;

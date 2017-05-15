/*
  Editor.js

  imports and formats CodeMirror component to allow for editing of code and updating state.code
*/

import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import styled from 'styled-components';

const CodeContainer = styled.li`
  width: 100%;
  height: 490px;
  display: inline-block;
  vertical-align: top;
  padding-top: 20px;
`;

class SolutionDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: props.mode,
      solution: props.solution,
      isShown: false
    }
  }

  getCodeToDisplay() {
    if (this.state.mode === 'javascript') {
      return this.props.solution.js;
    } else if (this.state.mode === 'html') {
      return this.props.solution.html;
    } else if (this.state.mode === 'css') {
      return this.props.solution.css;
    } else {
      return "Unknown mode";
    }
  }

  render(){
    const onShow = (() => {
      this.setState({isShown: !this.state.isShown});
    });
    const showBtnText = this.state.isShown ? "Hide Solution Code" : "Show Solution Code";
    const onModeChange = ((element) => {
      const mode = element.target.value;
      this.setState({mode: mode});
    });
    const options = {
      mode: this.state.mode,
      tabSize: 2,
      lineNumbers: true,
      lineWrapping: true,
      readOnly: true
    };
    const display = this.state.isShown ? (
      <div>
      <p />
        <select onChange={onModeChange} defaultValue={this.state.mode}>
          <option value="javascript">JavaScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
        <p />
        <CodeMirror value={this.getCodeToDisplay()} options={options} />
      </div>
    ):(<div></div>);

    return (
    <div>
      <CodeContainer>
        <button onClick={onShow}>{showBtnText}</button>
        {display}
      </CodeContainer>
    </div>
  );
  }

}

export default SolutionDisplay;

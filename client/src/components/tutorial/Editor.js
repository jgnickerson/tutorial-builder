/*
  Editor.js

  imports and formats CodeMirror component to allow for editing of code and updating state.code
*/

import React from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import styled from 'styled-components';

const CodeContainer = styled.li`
  width: 100%;
  height: 490px;
  display: inline-block;
  vertical-align: top;
`;

function Editor(props){
  const options = {
    mode: props.mode,
    tabSize: 2,
    lineNumbers: true,
    lineWrapping: true
  };

  return (
    <div>
      <CodeContainer>
        <select onChange={props.onModeChange} defaultValue={props.mode}>
          <option value="javascript">JavaScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
        <p />
        <CodeMirror value={props.code} onChange={props.onCodeChange} options={options} />
      </CodeContainer>
    </div>
  );
}

export default Editor;

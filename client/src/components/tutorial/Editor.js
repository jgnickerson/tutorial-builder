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
  width: 45%;
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
    <CodeContainer>
      <CodeMirror value={props.code} onChange={props.onChange} options={options} />
    </CodeContainer>
  );
}

export default Editor;

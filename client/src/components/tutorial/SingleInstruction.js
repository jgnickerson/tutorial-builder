import React from 'react';
import styled from 'styled-components';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import DeleteButton from './DeleteButton.js'


const Control=styled.p`
  text-align: right;
`;

function SingleInstruction(props){

  // create CodeMirror props
  const options = {
    tabSize: 2,
    readOnly: true,
    lineWrapping: nocursor,
    viewportMargin: Infinity
  };
  if(props.numberOfInstructions === 1){
    return (props.item.type === 'text' ?
      <div>
        <p>{props.item.data}</p>
        <Control onClick={()=>{props.deleteInstruction(props.index)}}>X</Control>
        </div> :
      <div>
        <CodeMirror key={props.index} value={props.item.data} options={options}/>
        <Control onClick={()=>{props.deleteInstruction(props.index)}}>X</Control>
      </div>
    );
  }
  else if(props.numberOfInstructions > props.index + 1 && props.index !== 0){
  return (props.item.type === 'text' ?
    <div>
      <p>{props.item.data}</p>
      <Control onClick={()=>{props.moveInstructionUp(props.index)}}>^</Control>
      <Control onClick={()=>{props.moveInstructionDown(props.index)}}>d</Control>
      <Control onClick={()=>{props.deleteInstruction(props.index)}}>X</Control>
      </div> :
    <div>
      <CodeMirror key={props.index} value={props.item.data} options={options}/>
      <Control onClick={()=>{props.moveInstructionUp(props.index)}}>^</Control>
      <Control onClick={()=>{props.moveInstructionDown(props.index)}}>d</Control>
      <Control onClick={()=>{props.deleteInstruction(props.index)}}>X</Control>
    </div>
  );
}
else if(props.index === 0){
return (props.item.type === 'text' ?
  <div>
    <p>{props.item.data}</p>
    <Control onClick={()=>{props.moveInstructionDown(props.index)}}>d</Control>
    <Control onClick={()=>{props.deleteInstruction(props.index)}}>X</Control>
    </div> :
  <div>
    <CodeMirror key={props.index} value={props.item.data} options={options}/>
    <Control onClick={()=>{props.moveInstructionDown(props.index)}}>d</Control>
    <Control onClick={()=>{props.deleteInstruction(props.index)}}>X</Control>
  </div>
);
}
else{
  return (props.item.type === 'text' ?
  <div>
    <p>{props.item.data}</p>
    <Control onClick={()=>{props.moveInstructionUp(props.index)}}>^</Control>
    <Control onClick={()=>{props.deleteInstruction(props.index)}}>X</Control>
  </div> :
  <div>
    <CodeMirror key={props.index} value={props.item.data} options={options}/>
    <Control onClick={()=>{props.moveInstructionUp(props.index)}}>^</Control>
    <Control onClick={()=>{props.deleteInstruction(props.index)}}>X</Control>
  </div>
);
}
}
export default SingleInstruction;

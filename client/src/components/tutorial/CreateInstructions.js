import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import styled from 'styled-components';
import style from 'bootstrap/dist/css/bootstrap.css';

import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

import MenuItem from 'react-bootstrap/lib/MenuItem';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';

import Switch from 'react-bootstrap-switch';


import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const DraggableDiv = styled.div`
`;

const SortableItem = SortableElement(({value}) => {

  // create CodeMirror props
  const options = {
    tabSize: 2,
    readOnly: "nocursor",
    lineWrapping: true,
    viewportMargin: Infinity
  };

  if (value.type === 'text') {
    return <DraggableDiv><p>{value.data}</p></DraggableDiv>
  } else {
    return (
      <DraggableDiv>
        <CodeMirror value={value.data} options={options}/>
      </DraggableDiv>
    )
  }
});

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <ListGroupItem>
          <SortableItem key={`item-${index}`} index={index} value={value} />
        </ListGroupItem>
      ))}
    </ul>
  );
});


function CreateInstructions(props) {

  // create CodeMirror props
  const options = {
    tabSize: 2,
    readOnly: true,
    lineWrapping: true,
    viewportMargin: Infinity
  };



  return(
    <div>
    <ListGroup>
      <SortableList items={props.instructions} onSortEnd={props.onSortEnd}/>
    <FormGroup>
      <InputGroup.Button>
        <FormControl type="text" value={props.newInstructionText} onChange={props.onNewInstructionChange}/>
        <Button onClick={props.addInstruction}>Add</Button>
      </InputGroup.Button>
    </FormGroup>
    </ListGroup>
    <Switch onText={"text"} offText={"code"} animate={true} onColor={"primary"} onChange={props.changeType} name='test'/>
    </div>
  );
}


export default CreateInstructions;

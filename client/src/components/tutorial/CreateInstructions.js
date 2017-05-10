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
import DropdownButton from 'react-bootstrap/lib/DropdownButton';

import {Grid, Row, Col} from 'react-bootstrap';

//import Switch from 'react-bootstrap-switch';


import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const StyledP = styled.p`
  display: inline-block;
  width: 80%;
  padding-right: 5%;
  word-break: break-all;
`;

const StyledDiv = styled.div`
  display: inline-block;
  width: 80%;
  padding-right: 5%;
`;

const StyledUL = styled.ul`
  padding: 0;
  list-style-type: none;
`;

const SortableItem = SortableElement((props) => {
  let value = props.value;
  let index = props.i;

  // create CodeMirror props
  const options = {
    tabSize: 2,
    readOnly: "nocursor",
    lineWrapping: true,
    viewportMargin: Infinity
  };

  let item;
  let deleteButton = <Button style={{float: "right"}} onClick={() => props.removeInstruction(index)}>delete</Button>;

  if (value.type === 'text') {
    item = (
      <ListGroupItem>
          <StyledP>{value.data}</StyledP>
          {deleteButton}
      </ListGroupItem>
    );
  } else {
    item = (
      <ListGroupItem>
        <StyledDiv>
          <CodeMirror value={value.data} options={options}/>
        </StyledDiv>
        {deleteButton}
      </ListGroupItem>
    );
  }

  return item;
});

const SortableList = SortableContainer((props) => {
  let items = props.items;
  return (
    <StyledUL>
      {items.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={value} i={index} removeInstruction={props.removeInstruction}/>
      ))}
    </StyledUL>
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
      <h4>Instructions:</h4>
      <SortableList items={props.instructions} onSortEnd={props.onSortEnd} removeInstruction={props.removeInstruction}/>
      <FormGroup>
        <InputGroup>
          <InputGroup.Button>
            <DropdownButton id="input-dropdown-addon"
                            title={props.newInstructionType}
                            onSelect={(type) => props.changeType(type)}>
              <MenuItem eventKey="text">text</MenuItem>
              <MenuItem eventKey="code">code</MenuItem>
            </DropdownButton>
          </InputGroup.Button>
          <FormControl type="text" value={props.newInstructionText} onChange={props.onNewInstructionChange}/>
          <InputGroup.Button>
            <Button onClick={props.addInstruction}>add</Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    </div>
  );
}


export default CreateInstructions;

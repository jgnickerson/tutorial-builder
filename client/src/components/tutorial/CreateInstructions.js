import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import styled from 'styled-components';

import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const DraggableDiv = styled.div`
  display: inline-block;
`;

const SortableItem = SortableElement(({value}) => {

  // create CodeMirror props
  const options = {
    tabSize: 2,
    readOnly: true,
    lineWrapping: true,
    viewportMargin: Infinity
  };

  if (value.type === 'text') {
    return <p>{value.data}</p>
  } else {
    return (
      <DraggableDiv>
        <label>+</label>
        <CodeMirror value={value.data} options={options}/>
      </DraggableDiv>
    )
  }
});

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
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
    <SortableList items={props.instructions} onSortEnd={props.onSortEnd}/>
  );
}


export default CreateInstructions;

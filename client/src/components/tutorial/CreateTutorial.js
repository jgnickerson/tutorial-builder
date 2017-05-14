import React, { Component } from 'react';
import style from 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';
import {Grid, Row, Col} from 'react-bootstrap';
import CreateInstructions from './CreateInstructions.js';
import CreateCode from './CreateCode.js';
import CreateExecute from './CreateExecute.js';

const EqualHeightDiv = styled.div`
  display: flex;
`;

function CreateTutorial(props) {
  return(
    <div>
      <Grid>
        <Row className="show-grid">
        <EqualHeightDiv>
          <Col md={4}>
            <h4>Instructions:</h4>
            <CreateInstructions addInstruction={props.addInstruction} newInstructionText={props.newInstructionText} newInstructionType={props.newInstructionType} changeType={props.changeType}
            onNewInstructionChange={props.onNewInstructionChange} instructions={props.instructions} onSortEnd={props.onSortEnd} removeInstruction={props.removeInstruction}/>
          </Col>
          <Col md={4}>
            <h4>Code:</h4>
            <CreateCode starterCode={props.starterCode}
                        solutionCode={props.solutionCode}
                        onCodeChange={props.onCodeChange}></CreateCode>
          </Col>
          <Col md={4}>
            <h4>Output:</h4>
            <CreateExecute starterCode={props.starterCode} solutionCode={props.solutionCode}/>
          </Col>
        </EqualHeightDiv>
        </Row>
      </Grid>
    </div>
  );
}

// CreateTutorial.propTypes = {
//
// }

export default CreateTutorial;

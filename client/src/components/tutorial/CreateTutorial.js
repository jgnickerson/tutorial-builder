import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';
import {Grid, Row, Col, Button, ButtonGroup} from 'react-bootstrap';
import CreateInstructions from './CreateInstructions.js';
import CreateCode from './CreateCode.js';
import CreateExecute from './CreateExecute.js';

const EqualHeightDiv = styled.div`
  height: 605px;
  display: flex;
`;

function CreateTutorial(props) {
  return(
    <div>
      <Grid>
        <Row className="show-grid">
        <EqualHeightDiv>
          <Col md={4}>
            <CreateInstructions addInstruction={props.addInstruction} newInstructionText={props.newInstructionText} newInstructionType={props.newInstructionType} changeType={props.changeType}
            onNewInstructionChange={props.onNewInstructionChange} instructions={props.instructions} onSortEnd={props.onSortEnd} removeInstruction={props.removeInstruction}/>
            <p />
            <ButtonGroup>
              <Button onClick={props.goBack}>Go Back</Button>
              <Button onClick={props.onHelp}>Help</Button>
              <Button onClick={props.publish}>Publish</Button>
            </ButtonGroup>
          </Col>
          <Col md={4}>
            <CreateCode starterCode={props.starterCode}
                        solutionCode={props.solutionCode}
                        onCodeChange={props.onCodeChange}></CreateCode>
          </Col>
          <Col md={4}>
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

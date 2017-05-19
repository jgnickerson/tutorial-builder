/*
 * Handle all the styling and rendering concerns here
 */

import React from 'react';
import Instructions from './Instructions.js';
import Editor from './Editor.js';
import Execute from './Execute.js';
import {Grid, Row, Col, PageHeader, Button, ButtonGroup} from 'react-bootstrap';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';

const EqualHeightDiv = styled.div`
  height: 605px;
  display: flex;
`;

function Tutorial(props) {
    if (props.mode){
      return (
        <div>
        <br />
        <br />
            <Grid display="flex">
              <Row>
                <PageHeader>{props.title}</PageHeader>
              </Row>
              <Row className="show-grid">
              <EqualHeightDiv>
                <Col md={4}><Instructions instructions={props.instructions}/>
                <p />
                <ButtonGroup>
                  <Button onClick={()=> props.onExit('')}>Exit</Button>
                  <Button onClick={props.onFinish}>Finish</Button>
                </ButtonGroup>
                </Col>
                <Col md={4}>
                  <Editor starterCode={props.userCode}
                              solutionCode={props.solutionCode}
                              onCodeChange={props.onCodeChange}></Editor>
                </Col>
                <Col md={4}><Execute userCode={props.userCode} solutionCode={props.solutionCode}/></Col>
                </EqualHeightDiv>
              </Row>
            </Grid>
        </div>
      )
    }else{
      return(
      <p>
       Loading...
      </p>
    )}
}

Tutorial.propTypes = {
  onExit: React.PropTypes.func.isRequired,
  onCodeChange: React.PropTypes.func.isRequired,
  instructions: React.PropTypes.array,
  code: React.PropTypes.string
}

export default Tutorial;

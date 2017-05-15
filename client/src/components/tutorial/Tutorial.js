/*
 * Handle all the styling and rendering concerns here
 */

import React from 'react';
import Instructions from './Instructions.js';
import Editor from './Editor.js';
import SolutionDisplay from './SolutionDisplay.js';
import Execute from './Execute.js';
import CreateCode from './CreateCode.js';
import {Grid, Row, Col, PageHeader, ControlLabel, FormControl, ButtonToolbar, Button, PanelGroup, Panel, BPanel} from 'react-bootstrap';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';

const EqualHeightDiv = styled.div`
  height: 605px;
  display: flex;
`;

const PanelStyle = styled.div`
  background: #f5f5f5;
`;

function Tutorial(props) {
    if (props.mode){
      return (
        <div>
        <br />
        <br />
        <br />
            <Grid display= "flex">
              <Row className="show-grid">
              <EqualHeightDiv>
                <Col md={4}><Instructions instructions={props.instructions}/>
                <p />
                <Button onClick={()=> props.onExit('')}>Exit</Button>
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

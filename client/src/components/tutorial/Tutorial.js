/*
 * Handle all the styling and rendering concerns here
 */

import React from 'react';
import Instructions from './Instructions.js';
import Editor from './Editor.js';
import SolutionDisplay from './SolutionDisplay.js';
import Execute from './Execute.js';
import style from 'bootstrap/dist/css/bootstrap.css';
import {Grid, Row, Col, PageHeader, ControlLabel, FormControl, ButtonToolbar, Button, PanelGroup, Panel, BPanel} from 'react-bootstrap';import styled from 'styled-components';

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
          <button onClick={()=> props.onExit('')}>Exit</button>
            <Grid display= "flex">
              <Row className="show-grid">
              <EqualHeightDiv>
                <Col md={4}><Instructions instructions={props.instructions}/></Col>
                <Col md={4}>
                <PanelGroup defaultActiveKey="1" accordion>
                  <Panel header="My Code" eventKey="1">
                    <Editor code={props.code} onCodeChange={props.onCodeChange} mode={props.mode} onModeChange={props.onModeChange}/>
                  </Panel>
                  <Panel header="Solution Code" eventKey="2">
                  <SolutionDisplay mode={"javascript"} solution={props.solution}/>
                  </Panel>
                </PanelGroup>
                </Col>
                <Col md={4}><Execute code={props.code} js={props.js} html={props.html} css={props.css} solution={props.solution}/></Col>
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

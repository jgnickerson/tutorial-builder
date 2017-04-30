/*
 * Handle all the styling and rendering concerns here
 */

import React from 'react';
import Instructions from './Instructions.js';
import Editor from './Editor.js';
import Execute from './Execute.js';
import style from 'bootstrap/dist/css/bootstrap.css';
import {Grid, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';

const EqualHeightDiv = styled.div`
  display: flex;
`;

function Tutorial(props) {
    if (props.instructions){
      return (
        <div>
          <button onClick={props.onExit}>Exit</button>
            <Grid>
              <Row className="show-grid">
              <EqualHeightDiv>
                <Col md={4}><Instructions instructions={props.instructions}/></Col>
                <Col md={4}><Editor code={props.code} onCodeChange={props.onCodeChange} mode={props.mode} onModeChange={props.onModeChange}/></Col>
                <Col md={4}><Execute code={props.code} js={props.js} html={props.html} css={props.css}/></Col>
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

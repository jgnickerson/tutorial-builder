import React, { Component } from 'react';
import style from 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';
import {Grid, Row, Col} from 'react-bootstrap';
import CreateInstructions from './CreateInstructions.js'

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
            <CreateInstructions instructions={props.instructions} onSortEnd={props.onSortEnd}/>
          </Col>
          <Col md={4}>
            <label>"HELLO SAM2"</label>
          </Col>
          <Col md={4}>
            <label>"HELLO SAM3"</label>
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

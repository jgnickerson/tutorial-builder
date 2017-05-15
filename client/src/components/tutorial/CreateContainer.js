/*
Container component for Tutorial
Will handle fetching of tutorial and manage state of Tutorial (e.g. current step)
*/

import React, { Component } from 'react';
import Tutorial from './Tutorial.js';
import CreateTutorial from './CreateTutorial.js';
import InstructionWriter from './InstructionWriter.js';
import HelpModals from './HelpModals.js';
import arrayMove from 'react-sortable-hoc';
import styled from 'styled-components';

import { ListGroup, ListGroupItem, Button, PageHeader, Form, Col, ControlLabel, FormControl, FormGroup, ButtonGroup } from 'react-bootstrap';

const InitialDiv = styled.div`
  margin-left: 20%;
  margin-right: 20%;
`;

class CreateContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tutorialID: props.tutorialID ? props.tutorialID : null,
      title: "",
      description: "",
      starterCode: {
        js: "",
        html: "",
        css: ""
      },
      solutionCode: {
        js: "",
        html: "",
        css: ""
      },
      instructions: [],
      showHelpModals: false,
      mode: 'titlePage',
      newInstructionText:"",
      newInstructionType:"text",
      errorMessage:"",
    }

    //if someone is editing this tutorial
    if (props.tutorialID) {
      this.persistInterval = setInterval(()=> this.persistTutorial(), 1000);

      //someone is creating a completely new tutorial
    } else {
      const jwt = window.localStorage.getItem('jwt');
      if (jwt) {
        fetch('/users/owner', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt},
          body: JSON.stringify({title: this.state.title, description: this.state.description, js: this.state.starterCode.js, html: this.state.starterCode.html, css: this.state.starterCode.css, solution: this.state.solutionCode, instructions: this.state.instructions, lastUpdate: new Date().toISOString(), published: false})
        }).then(response=> { if (response.ok) return response.json()
        }).then(data=>{
          if (!data.isBoom) {
            this.setState({tutorialID: data._id});
            this.persistInterval = setInterval(() => this.persistTutorial(), 1000);
          } else {
            //TODO handle error
            console.log(data);
          }
        });
      }
    }

    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleInstructionAdd = this.handleInstructionAdd.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
    this.handleNewInstructionChange = this.handleNewInstructionChange.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.removeInstruction = this.removeInstruction.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  persistTutorial() {
    const jwt = window.localStorage.getItem('jwt');
    if (jwt) {
      fetch('/users/owner/' + this.state.tutorialID, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt},
        body: JSON.stringify({title: this.state.title, description: this.state.description, js: this.state.starterCode.js, html: this.state.starterCode.html, css: this.state.starterCode.css, solution: this.state.solutionCode, instructions: this.state.instructions, published: false, lastUpdate: new Date().toISOString()})
      }).then(response=> { if (!response.ok) console.log(response) }) //TODO handle error
    }
  }

  // clear the interval when we don't need the component
  componentWillUnmount() {
    clearInterval(this.persistInterval);
  }

  handleCodeChange(code, which, type) {
    if (which === 'starter') {
      let starterCode = this.state.starterCode;
      starterCode[type] = code;
      this.setState({starterCode : starterCode});

    } else {
      let solutionCode = this.state.solutionCode;
      solutionCode[type] = code;
      this.setState({solutionCode : solutionCode});
    }
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  handleDescriptionChange(e) {
    this.setState({description: e.target.value});
  }

  handleInstructionAdd() {

    const newInstruction = {type: this.state.newInstructionType, data: this.state.newInstructionText}
    const newInstructions = this.state.instructions.slice();
    newInstructions.push(newInstruction);

    this.setState({
      instructions: newInstructions,
      newInstructionText:""
    });
  }
  handleNewInstructionChange(e){
    this.setState({newInstructionText: e.target.value});
  }
  handleChangeType(type){
    this.setState({newInstructionType: type});
  }
  handlePublish() {
    /*
    TODO when this called, it should hit a route on the server that flips tutorial.published
    in the tutorials db, and updates that tutorial with the latest from users.tutoraialsOwnder.
    This route hasn't been written yet.
    Right now, when you create a new tutorial, it's automatically added to db.tutorials.
    This is so we can get an _id on the tutorial before putting it in db.users.tutorialsOwned.
    */
    console.log("add a new tutorial");
  }

  removeInstruction(index) {
    const instructions = this.state.instructions;
    instructions.splice(index, 1);
    this.setState({instructions: instructions});
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    // thank you Github: https://github.com/clauderic/react-sortable-hoc/blob/master/src/utils.js
    const instructions = this.state.instructions;
    if (newIndex >= instructions.length) {
      let k = newIndex - instructions.length;
      while (k-- + 1) {
        instructions.push(undefined);
      }
    }
    instructions.splice(newIndex, 0, instructions.splice(oldIndex, 1)[0]);

    this.setState({
      instructions: instructions,
    });
  };

  handleNext(e) {
    e.preventDefault()
    if (!this.state.title) {
      this.setState({errorMessage: "Please enter a title."})
    } else if (!this.state.description) {
      this.setState({errorMessage: "Please type in a description."})
    } else {
      this.setState({errorMessage: null, mode: "detailsPage"});
    }
  }

  handleGoBack(e) {
    e.preventDefault();
    this.setState({mode: "titlePage"});
  }

  render() {
    let renderedElement;
    if (this.state.mode === 'titlePage') {
      renderedElement = (
        <div>
          <br/>
          <br/>
          <br/>
          <Col xs={6} xsOffset={4}><PageHeader>New Tutorial</PageHeader></Col>
          <Form horizontal>
          <FormGroup validationState={this.state.errorMessage === "Please enter a title." ? "error" : null}>
            <Col componentClass={ControlLabel} xs={2} xsOffset={2}>
              Title
            </Col>
            <Col xs={6} >
              <FormControl placeholder="Enter a title..." value={this.state.title} onChange={this.handleTitleChange}/>
            </Col>
          </FormGroup>

          <FormGroup validationState={this.state.errorMessage === "Please type in a description." ? "error" : null}>
            <Col componentClass={ControlLabel} xs={2} xsOffset={2}>
              Description
            </Col>
            <Col xs={6} >
              <FormControl componentClass="textarea"  placeholder="Enter a description..." value={this.state.description} onChange={this.handleDescriptionChange}/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col xsOffset={4} xs={6}>
              {this.state.errorMessage ? <ControlLabel type="error">{this.state.errorMessage}</ControlLabel> : null}
            </Col>
          </FormGroup>

          <FormGroup>
            <Col xsOffset={4} xs={6}>
              <ButtonGroup>
                  <Button type="submit" onClick={this.props.onExit}>Cancel</Button>
                  <Button type="submit" onClick={this.handleNext}>Next</Button>
              </ButtonGroup>
            </Col>
          </FormGroup>

        </Form>
        </div>
      );

    } else {

      let helpModal;
      if (this.state.showHelpModals) {
        helpModal = <HelpModals onClose={()=>this.setState({showHelpModals:false})}/>;  
      } 

      renderedElement = (
        <div>
          <br />
          <br />
          <br />
          {helpModal}
          <CreateTutorial changeType={this.handleChangeType}
                          newInstructionText={this.state.newInstructionText}
                          newInstructionType={this.state.newInstructionType}
                          onNewInstructionChange={this.handleNewInstructionChange}
                          addInstruction={this.handleInstructionAdd}
                          instructions={this.state.instructions}
                          onSortEnd={this.onSortEnd}
                          removeInstruction={this.removeInstruction}
                          solutionCode={this.state.solutionCode}
                          starterCode={this.state.starterCode}
                          onCodeChange={this.handleCodeChange}
                          goBack={this.handleGoBack}
                          onHelp={()=>this.setState({showHelpModals:true})}
                          />
       </div>
      );
    }

    return renderedElement;
  }
}

CreateContainer.propTypes = {
  onExit: React.PropTypes.func.isRequired
}

export default CreateContainer;

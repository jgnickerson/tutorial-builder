/*
Container component for Tutorial
Will handle fetching of tutorial and manage state of Tutorial (e.g. current step)
*/

import React, { Component } from 'react';
import Tutorial from './Tutorial.js';
import CreateTutorial from './CreateTutorial.js';
import InstructionWriter from './InstructionWriter.js';
import arrayMove from 'react-sortable-hoc';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import styled from 'styled-components';


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
        js: "\n\n\n\n\n\n\n\n",
        html: "\n\n\n\n\n\n\n\n",
        css: "\n\n\n\n\n\n\n\n"
      },
      solutionCode: {
        js: "",
        html: "",
        css: ""
      },
      instructions: [],
      mode: 'titlePage',
      newInstructionText:"",
      newInstructionType:"text",
      errorMessage:"",
    }

    //if someone is editing this tutorial
    //TODO AMIR, this prop doesn't exist yet.
    //you may want to do it this way, you may not
    // if (props.tutorialID) {
    //   this.persistInterval = setInterval(()=> this.persistTutorial(), 1000);
    //
    //   //someone is creating a completely new tutorial
    // } else {
    //   const jwt = window.localStorage.getItem('jwt');
    //   if (jwt) {
    //     fetch('/users/owner', {
    //       method: 'POST',
    //       headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt},
    //       body: JSON.stringify({title: this.state.title, description: this.state.description, js: this.state.jsCode, html: this.state.htmlCode, css: this.state.cssCode, instructions: this.state.instructions, published: false})
    //     }).then(response=> { if (response.ok) return response.json()
    //     }).then(data=>{
    //       if (!data.isBoom) {
    //         this.setState({tutorialID: data._id});
    //         this.persistInterval = setInterval(() => this.persistTutorial(), 1000);
    //       } else {
    //         //TODO handle error
    //         console.log(data);
    //       }
    //     });
    //   }
    // }

    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleInstructionAdd = this.handleInstructionAdd.bind(this);
    this.handleSaveNewTutorial = this.handleSaveNewTutorial.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
    this.handleNewInstructionChange = this.handleNewInstructionChange.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.removeInstruction = this.removeInstruction.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  persistTutorial() {
    const jwt = window.localStorage.getItem('jwt');
    if (jwt) {
      fetch('/users/owner/' + this.state.tutorialID, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt},
        body: JSON.stringify({title: this.state.title, description: this.state.description, js: this.state.jsCode, html: this.state.htmlCode, css: this.state.cssCode, instructions: this.state.instructions})
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
  handleSaveNewTutorial() {
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

  handleNext() {
    if (!this.state.title) {
      this.setState({errorMessage: "Please enter a title."})
    } else if (!this.state.description) {
      this.setState({errorMessage: "Please type in a description."})
    } else {
      this.setState({mode: "detailsPage"});
    }
  }

  render() {
    let renderedElement;
    if (this.state.mode === 'titlePage') {
      renderedElement = (
        <InitialDiv>
          <FormGroup>
            <FormControl placeholder="Enter a title..." value={this.state.title} onChange={this.handleTitleChange}/>
            <br/>
            <FormControl componentClass="textarea"  placeholder="Enter a description..." value={this.state.description} onChange={this.handleDescriptionChange}/>
            <br/>
            <ButtonGroup>
              <Button type="submit" onClick={this.props.onExit}>Cancel</Button>
              <Button type="submit" onClick={this.handleNext}>Next</Button>
            </ButtonGroup>
          </FormGroup>
          <p>{this.state.errorMessage}</p>
        </InitialDiv>
      );

    } else {
      renderedElement = (
        <div>
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

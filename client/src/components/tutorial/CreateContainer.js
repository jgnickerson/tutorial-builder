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



class CreateContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tutorialID: props.tutorialID ? props.tutorialID : null,
      title: "",
      description: "",
      jsCode: "",
      htmlCode: "",
      cssCode: "",
      instructions: [],
      mode: 'javascript',
      newInstructionText:"",
      newInstructionType:true
    }

    //if someone is editing this tutorial
    //TODO AMIR, this prop doesn't exist yet.
    //you may want to do it this way, you may not
    if (props.tutorialID) {
      this.persistInterval = setInterval(()=> this.persistTutorial(), 1000);

      //someone is creating a completely new tutorial
    } else {
      const jwt = window.localStorage.getItem('jwt');
      if (jwt) {
        fetch('/users/owner', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt},
          body: JSON.stringify({title: this.state.title, description: this.state.description, js: this.state.jsCode, html: this.state.htmlCode, css: this.state.cssCode, instructions: this.state.instructions, published: false})
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
    this.getCodeToDisplay = this.getCodeToDisplay.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleInstructionAdd = this.handleInstructionAdd.bind(this);
    this.handleSaveNewTutorial = this.handleSaveNewTutorial.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
    this.handleNewInstructionChange = this.handleNewInstructionChange.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);

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

  getCodeToDisplay() {
    if (this.state.mode === 'javascript') {
      return this.state.jsCode;
    } else if (this.state.mode === 'html') {
      return this.state.htmlCode;
    } else if (this.state.mode === 'css') {
      return this.state.cssCode;
    } else {
      return "Unknown mode";
    }
  }

  // clear the interval when we don't need the component
  componentWillUnmount() {
    clearInterval(this.persistInterval);
  }

  handleCodeChange(code) {
    if (this.state.mode === 'javascript') {
      this.setState({jsCode: code});
    } else if (this.state.mode === 'html') {
      this.setState({htmlCode: code});
    } else if (this.state.mode === 'css') {
      this.setState({cssCode: code});
    }
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  handleDescriptionChange(e) {
    this.setState({description: e.target.value});
  }

  handleInstructionAdd() {
    var type = "";
    if(this.state.newInstructionType === true){
      type = "text";
    }
    else{
      type = "code";
    }
    const newInstruction = {type: type, data: this.state.newInstructionText}
    const newInstructions = this.state.instructions.slice();
    newInstructions.push(newInstruction);

    console.log(type);
    this.setState({
      instructions: newInstructions,
      newInstructionText:""
    });
  }
  handleNewInstructionChange(e){
    this.setState({newInstructionText: e.target.value});
  }
  handleChangeType(){
    console.log("hit");
    if(this.state.newInstructionType === true){
      this.setState({newInstructionType: false})
    }
    else{
      this.setState({newInstructionType: true})
    }
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

  render() {
    return (
      <div>
        <label>Tutorial Title</label>
        <input onChange={this.handleTitleChange}></input>
        <br/>
        <label>Description</label>
        <input onChange={this.handleDescriptionChange}></input>
        <br/>
        <CreateTutorial changeType={this.handleChangeType} newInstructionText={this.state.newInstructionText} onNewInstructionChange={this.handleNewInstructionChange}
        addInstruction={this.handleInstructionAdd} instructions={this.state.instructions} onSortEnd={this.onSortEnd}/>
        <br/>
        <br/>
        <button onClick={this.handleSaveNewTutorial}>Save Tutorial</button>
      </div>
    )
  }
}

CreateContainer.propTypes = {
  onExit: React.PropTypes.func.isRequired
}

export default CreateContainer;

/*
Container component for Tutorial
Will handle fetching of tutorial and manage state of Tutorial (e.g. current step)
*/

import React, { Component } from 'react';
import HelpModals from './HelpModals.js';
import Tutorial from './Tutorial.js';
import InstructionWriter from './InstructionWriter.js';
import { Button } from 'react-bootstrap';

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
      showModal: false
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

  handleInstructionAdd(instruction) {
    const newInstructions = this.state.instructions.slice();
    newInstructions.push(instruction);

    this.setState({
      instructions: newInstructions
    });
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

  render() {

    const onModeChange = ((element) => {
      const mode = element.target.value;
      this.setState({mode: mode});
    });

    let helpModal;
    if (this.state.showModal) {
      helpModal = <HelpModals onClose={() => this.setState({showModal: false})}/>;  
    } 
    console.log(helpModal);

    return (
      <div>
      <Button
        bsStyle="primary"
        bsSize="large"
        onClick={() => this.setState({showModal: true})}
      >Help</Button>
      {helpModal} 
      <label>Tutorial Title</label>
      <input onChange={this.handleTitleChange}></input>
      <br/>
      <label>Description</label>
      <input onChange={this.handleDescriptionChange}></input>
      <br/>
      <Tutorial
        code={this.getCodeToDisplay()}
        js={this.state.jsCode}
        html={this.state.htmlCode}
        css={this.state.cssCode}
        instructions={this.state.instructions}
        onExit={this.props.onExit}
        onCodeChange={this.handleCodeChange}
        mode={this.state.mode}
        onModeChange={onModeChange}
      />
      <InstructionWriter addInstruction={this.handleInstructionAdd}/>
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

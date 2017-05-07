/*
Container component for Tutorial
Will handle fetching of tutorial and manage state of Tutorial (e.g. current step)
*/

import React, { Component } from 'react';
import Tutorial from './Tutorial.js';
import CreateTutorial from './CreateTutorial.js';
import InstructionWriter from './InstructionWriter.js';
import arrayMove from 'react-sortable-hoc';

const SERVER = 'http://localhost:4200';

class CreateContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      jsCode: "",
      htmlCode: "",
      cssCode: "",
      currentStage: 0,
      instructions: [],
      mode: 'javascript'
    }

    // console.log(props.activeTutorial);
    // fetch(SERVER + '/tutorials/' + props.activeTutorial)
    // .then((response) => {
    //   if(response.ok){
    //     return response.json();
    //   }
    //   else{
    //     console.log("something wrong");
    //   }
    // })
    // .then((serverTutorial) => {
    //   this.setState({
    //     jsCode: serverTutorial.js,
    //     htmlCode: serverTutorial.html,
    //     cssCode: serverTutorial.css
    //   })
    //
    //   if(serverTutorial.instructions === null){
    //     this.setState({
    //       currentStage: serverTutorial.currentStage,
    //       instructions: serverTutorial.stages[serverTutorial.currentStage].instructions
    //     });
    //   }
    // });
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.getCodeToDisplay = this.getCodeToDisplay.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleInstructionAdd = this.handleInstructionAdd.bind(this);
    this.handleSaveNewTutorial = this.handleSaveNewTutorial.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
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
    clearInterval(this.interval);
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
    const tutorial = {
      title: this.state.title,
      description: this.state.description,
      stages: [
        {
          instructions: this.state.instructions,
          code: {
            js: this.state.jsCode,
            css: this.state.cssCode,
            html: this.state.htmlCode
          }
        }
      ],
    }

    this.props.save(tutorial)
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

    const onModeChange = ((element) => {
      const mode = element.target.value;
      this.setState({mode: mode});
    });

    return (
      <div>
      <label>Tutorial Title</label>
      <input onChange={this.handleTitleChange}></input>
      <br/>
      <label>Description</label>
      <input onChange={this.handleDescriptionChange}></input>
      <br/>
      <CreateTutorial instructions={this.state.instructions} onSortEnd={this.onSortEnd}/>
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

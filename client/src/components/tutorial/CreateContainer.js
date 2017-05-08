/*
Container component for Tutorial
Will handle fetching of tutorial and manage state of Tutorial (e.g. current step)
*/

import React, { Component } from 'react';
import Tutorial from './Tutorial.js';
import InstructionWriter from './InstructionWriter.js';

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

    tutorial.creator = this.state.activeUser.username;

    // stringify the object
    const payload = JSON.stringify(tutorial);

    // define the POST request
    const postRequest = new Request(
      SERVER + "/tutorials/",
      {
        method:'POST',
        body: payload,
        headers: new Headers({'Content-type': 'application/json'})
      }
    );

    // attempt adding the new tutorial to the db
    fetch(postRequest)
    .then((response)=>{
      if (response.ok){
        return response.json();
      } else {
        console.log("something went wrong with the new tutorial");
      }
    })
    .then((serverTutorial) => {
      if (serverTutorial) {
        this.props.onExit();
      }
    });
  }

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

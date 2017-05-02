/*
  Container component for Tutorial
  Will handle fetching of tutorial and manage state of Tutorial (e.g. current step)
*/

import React, { Component } from 'react';
import Tutorial from './Tutorial.js';

const SERVER = 'http://localhost:4200';

class TutorialContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jsCode: "",
      htmlCode: "",
      cssCode: "",
      currentStage: null,
      instructions: null,
      mode: 'javascript'
    }

    fetch(SERVER + '/users/' + props.username + '/' + props.activeTutorial)
    .then((response) => {
      if(response.ok){
        return response.json();
      }
      else{
        console.log("something wrong");
      }
    })
    .then((serverTutorial) => {
      this.setState({
        jsCode: serverTutorial.js,
        htmlCode: serverTutorial.html,
        cssCode: serverTutorial.css,
        currentStage: serverTutorial.currentStage,
        instructions: serverTutorial.stages[serverTutorial.currentStage].instructions
      });

    });

    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.getCodeToDisplay = this.getCodeToDisplay.bind(this);
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

  // set up the interval for auto-saving
  componentDidMount() {

    this.interval = setInterval(() => {
      const modifiedCode = {
        js: this.state.jsCode,
        css: this.state.cssCode,
        html: this.state.htmlCode
      }
      this.props.autoSave(modifiedCode, this.state.currentStage);
    },
    1000);
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

  render() {

    const onModeChange = ((element) => {
      const mode = element.target.value;
      this.setState({mode: mode});
    });

    return (
      <div>
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
      </div>
    )
  }
}

TutorialContainer.propTypes = {
  onExit: React.PropTypes.func.isRequired
}

export default TutorialContainer;

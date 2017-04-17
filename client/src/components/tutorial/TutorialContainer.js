/*
  Container component for Tutorial
  Will handle fetching of tutorial and manage state of Tutorial (e.g. current step)
*/

import React, { Component } from 'react';
import Tutorial from './Tutorial.js';

class TutorialContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      codeJS: "",
      codeHTML: "",
      codeCSS: "",
      mode: 'javascript',
    	tutorial: null
    }

    fetch('/tutorials/'+ props.tutorialId)
    .then(response=>{
    	if(response.ok){
    		return response.json();
    	}
    })
    .then(data=>{
    	this.setState({tutorial:data, codeJS:data.stages[0].code.javascript, 
                                  codeHTML:data.stages[0].code.html, 
                                   codeCSS:data.stages[0].code.css})
    })

    this.handleCodeChange = this.handleCodeChange.bind(this);
  }

  getCodeToDisplay() {
    if (this.state.mode === 'javascript') {
      return this.state.codeJS;
    } else if (this.state.mode === 'html') {
      return this.state.codeHTML;
    } else if (this.state.mode === 'css') {
      return this.state.codeCSS;
    } else {
      return "Unknown mode";
    }
  }

  handleCodeChange(code) {
    if (this.state.mode === 'javascript') {
      this.setState({codeJS: code});
    } else if (this.state.mode === 'html') {
      this.setState({codeHTML: code});
    } else if (this.state.mode === 'css') {
      this.setState({codeCSS: code});
    }
  }

  render() {

    const onModeChange = ((element) => {
      const mode = element.target.value;
      this.setState({mode: mode});
    });

    return <Tutorial
      instructions={this.state.tutorial ? this.state.tutorial.stages[0].instructions : null}
      code={this.getCodeToDisplay()}
      onExit={this.props.onExit}
      onCodeChange={this.handleCodeChange}
      mode={this.state.mode}
      onModeChange={onModeChange}
    />
  }
}

TutorialContainer.propTypes = {
  onExit: React.PropTypes.func.isRequired
}

export default TutorialContainer;

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
      userCode: {
        js: "",
        html: "",
        css: ""
      },
      solutionCode: {
        js: "",
        html: "",
        css: ""
      },
      instructions: null,
      mode: 'javascript'
    }

    this.getTutorial();

    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.getCodeToDisplay = this.getCodeToDisplay.bind(this);
  }

  getTutorial() {
    const jwt = window.localStorage.getItem('jwt');
    const headers = jwt ? {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt} : {'Content-Type': 'application/json'};

    fetch('/tutorials/' + this.props.activeTutorial, {
      method: 'GET',
      headers: headers
    }).then(response => { if(response.ok) return response.json() })
    .then(data => {
      if (!data.isBoom) {
        let userCode = {js: data.js, html: data.html, css: data.css};
        this.setState({
          userCode: userCode,
          solutionCode: data.solution,
          instructions: data.instructions
        });

        this.persistInterval = setInterval(() => this.persistTutorial(), 1000);
      } else {
        //TODO handle error
        console.log(data)
      }
    });
  }

  persistTutorial() {
    const jwt = window.localStorage.getItem('jwt');
    //we only want to try to persist if the user has a jwt (i.e. authenticated)
    if (jwt) {
      fetch('/users/' + this.props.activeTutorial, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt},
        body: JSON.stringify({js: this.state.userCode.js, html: this.state.userCode.html, css: this.state.userCode.css})
      })
      .then(response=> {
        if (response.isBoom) {
          //TODO handle error
        }
       })
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

  handleCodeChange(code, which, type) {
    if (which === 'starter') {
      let userCode = this.state.userCode;
      userCode[type] = code;
      this.setState({userCode : userCode});

    } else {
      let solutionCode = this.state.solutionCode;
      solutionCode[type] = code;
      this.setState({solutionCode : solutionCode});
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
          userCode={this.state.userCode}
          solutionCode={this.state.solutionCode}
          instructions={this.state.instructions}
          onExit={this.props.onExit}
          onCodeChange={this.handleCodeChange}
          mode={this.state.mode}
        />
      </div>
    )
  }
}

TutorialContainer.propTypes = {
  onExit: React.PropTypes.func.isRequired
}

export default TutorialContainer;

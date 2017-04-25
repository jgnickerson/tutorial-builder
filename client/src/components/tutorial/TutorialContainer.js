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
      mode: 'javascript',
    	tutorial: null
    }

    // TODO: Rewrite this part to use the ID of the logged in user, as opposed
    // to the first user in the "users" collection (assuming the user exists in db).
    // UserID will be stored as a property once we figure out the accounts
    fetch(SERVER + '/users/')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    }).then((users) => {
      let currentUser = users[0],
        tutorialAlreadyUsed = false,
        tutorialIndex;

      //TODO Move this logic to the server
      // check if this is the first time the tutorial is used by the user
      currentUser.tutorialsUsed.forEach((item, index) => {
        if (item._id === props.tutorialId) {
          tutorialAlreadyUsed = true;
          tutorialIndex = index;
        }
      });

      let currentTutorial, userCode;

      if (tutorialAlreadyUsed) {
        // get the user's code and the current stage
        let currentTutorial = currentUser.tutorialsUsed[tutorialIndex];
        let jsCode = currentTutorial.js,
            htmlCode = currentTutorial.html,
            cssCode = currentTutorial.css,
            currentStage = currentTutorial.currentStage,
            successConds = currentTutorial.successConds;

        console.log(successConds);
        // set the state
        this.setState({
          user: currentUser,
          tutorial : currentTutorial,
          jsCode: jsCode,
          htmlCode: htmlCode,
          cssCode: cssCode,
          currentStage : currentStage,
          successConds : successConds
        });

      } else {
        // get the starting code and other info, and use it to
        // create a new object in tutorialsUsed

        fetch(SERVER + '/tutorials/'+ props.tutorialId)
        .then((response) => {
        	if(response.ok){
        		return response.json();
        	}
        })
        .then((originalTutorial) => {
          console.log(originalTutorial);

          // modify the original tutorial to include user code and current stage
          originalTutorial.js = originalTutorial.stages[0].code.js;
          originalTutorial.html = originalTutorial.stages[0].code.html;
          originalTutorial.css = originalTutorial.stages[0].code.css;
          originalTutorial.currentStage = 0;

          // push the tutorial to the list of user's tutorials
          currentUser.tutorialsUsed.push(originalTutorial);

          // stringify the object
          const userStr = JSON.stringify(currentUser);

          // define the PUT request
          const putRequest = new Request(
            SERVER + "/users/" + currentUser._id,
            {
              method:'PUT',
              body: userStr,
              headers: new Headers({'Content-type': 'application/json'})
            }
          );

          // add the tutorial to the user's list of used tutorials in the db
          fetch(putRequest)
          .then((response)=>{
            if (response.ok){
              return response.json();
            }
          })
          .then((serverUser) => {
            let serverTutorial = serverUser.tutorialsUsed.find((item) => {
              return item._id === props.tutorialId;
            });

            console.log(serverTutorial);
            // then set the state
            this.setState({
              user: serverUser,
              tutorial : serverTutorial,
              jsCode: serverTutorial.js,
              htmlCode: serverTutorial.html,
              cssCode: serverTutorial.css,
              currentStage : serverTutorial.currentStage,
              successConds : serverTutorial.successConds
            });

          });
        });
      }
    });

    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.updateCode = this.updateCode.bind(this);
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
    this.interval = setInterval(this.updateCode, 1000);
  }

  // clear the interval when we don't need the component
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // the function that auto-saves the code
  updateCode() {
    if (this.state.tutorial && this.state.user) {

      //put the new code in the tutorial
      let updatedTutorial = Object.assign({}, this.state.tutorial);
      updatedTutorial.js = this.state.jsCode;
      updatedTutorial.css = this.state.cssCode;
      updatedTutorial.html = this.state.htmlCode;

      // load the tutorial in the used tutorials array
      let updatedTutorialsUsed = this.state.user.tutorialsUsed.slice();
      updatedTutorialsUsed = updatedTutorialsUsed.map((item) => {
        if (item._id === updatedTutorial._id) {
          return updatedTutorial;
        } else {
          return item;
        }
      });

      // load the array in the user object
      let updatedUser = Object.assign({}, this.state.user);
      updatedUser.tutorialsUsed = updatedTutorialsUsed;

      // and send to user object to the server

      // stringify the object
      const userStr = JSON.stringify(updatedUser);

      // define the PUT request
      const putRequest = new Request(
        SERVER + "/users/" + updatedUser._id,
        {
          method:'PUT',
          body: userStr,
          headers: new Headers({'Content-type': 'application/json'})
        }
      );

      fetch(putRequest)
      .then((response)=>{
        if (response.ok){
          return response.json();
        }
      })
      .then((serverUser) => {
        let serverTutorial = serverUser.tutorialsUsed.find((item) => {
          return item._id === updatedTutorial._id;
        });
        // then set the state
        this.setState({
          user: serverUser,
          tutorial : serverTutorial,
          code : serverTutorial.userCode
        });
      });
    }
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

    return <Tutorial
      code={this.getCodeToDisplay()}
      js={this.state.jsCode}
      html={this.state.htmlCode}
      css={this.state.cssCode}
      instructions={this.state.tutorial ? this.state.tutorial.stages[this.state.tutorial.currentStage].instructions : null}
      onExit={this.props.onExit}
      onCodeChange={this.handleCodeChange}
      mode={this.state.mode}
      onModeChange={onModeChange}
      successConds={this.state.successConds}
    />
  }
}

TutorialContainer.propTypes = {
  onExit: React.PropTypes.func.isRequired
}

export default TutorialContainer;

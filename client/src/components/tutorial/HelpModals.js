/*
HelpModal component for Tutorial
Will show Modals to help user
*/

import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class HelpModals extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalID: 0,
			numModals: 3,
			onClose: props.onClose
		};
	}

  render() {

    let modalBody;
    switch (this.state.modalID) {
  		case 0: 
  			modalBody = (<div>
  				<img src="Instructions.png" height="400" width="520"/> 
        	<hr />
        	<p>Add instructions in the instruction text box. You can use the dropdown menu to switch between adding text and adding code snippets.</p>
          <p>If you're logged in, your progress will be continuously saved. Click the publish button when you're ready for other users to see your tutorial.</p>
      	</div>);
  			break;
  		case 1: 
  			modalBody = (<div>
  				<img src="StarterCode.png" height="600" width="350"/>  
        	<hr />
        	<p>In the Starter Code window, add the code that users of your tutorial will start with. Then put your finished tutorial code in the Solution Code window.</p>
          <p>You can click the window titles to switch between them and the tabs to switch between JavaScript, HTML, and CSS.</p>
  			</div>);
  			break;
  		case 2: 
  			modalBody = (<div>
  				<img src="IFrame.png" height="600" width="350"/>  
        	<hr />
        	<p>You can use the run buttons to test your tutorial as you go.</p> 
          <p>The top box displays tutorial results and the bottom box displays console.log() statements.</p>
  			</div>);
  			break;
  		default: modalBody = (<div></div>);
    };

    const onNext = ((evt) => {
    	let newID = this.state.modalID;
    	console.log(newID);
			if (newID < this.state.numModals - 1) {
				newID++;
				this.setState({modalID:newID});
				console.log(newID);
			}
    });

		const onPrevious = ((evt) => {
			let newID = this.state.modalID;
			if (newID !== 0) {
				newID--;
				this.setState({modalID:newID});
			}
    });

    return (
      <div>
        <Modal show={true} onHide={this.state.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Creating a Tutorial</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          	{modalBody}
          </Modal.Body>
          <Modal.Footer>
          	<Button onClick={onPrevious}>
          		Previous
          	</Button>
          	<Button onClick={onNext}>
          		Next
          	</Button>
            <Button onClick={this.state.onClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default HelpModals;
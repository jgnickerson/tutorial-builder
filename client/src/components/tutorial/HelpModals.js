/*
HelpModal component for Tutorial
Will show Modals to help user
*/

import React, { Component } from 'react';
import { Glyphicons, Modal, Button, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';

class HelpModals extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalID: 0,
			numModals: 4,
			onClose: props.onClose
		};
	}

	getInitialState() {
    return { showModal: false };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );

    let modalBody;
    switch (this.state.modalID) {
  		case 0: 
  			modalBody = (<div>
  				<img src="https://s3.amazonaws.com/codecademy-blog/assets/03-2013-new-experience.png" 
  							height="300" width="550"/> 
        	<hr />
        	<p>Help Text 0</p>
      	</div>);
  			break;
  		case 1: 
  			modalBody = (<div>
  				<img src="https://s3.amazonaws.com/codecademy-blog/assets/03-2013-new-experience.png"
  							height="300" width="550"/>  
        	<hr />
        	<p>Help Text 1</p>
  			</div>);
  			break;
  		case 2: 
  			modalBody = (<div>
  				<img src="https://s3.amazonaws.com/codecademy-blog/assets/03-2013-new-experience.png"
  							height="300" width="550"/>  
        	<hr />
        	<p>Help Text 2</p>
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
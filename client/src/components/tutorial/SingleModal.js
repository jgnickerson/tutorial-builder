/*
SingleModal component for 1-off popups
*/

import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

function SingleModal(props) {
  // props are header, body, onClose, onComplete, completeBtnName

  return (
    <div>
      <Modal show={true} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        	{props.body}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onComplete}>{props.completeBtnName}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SingleModal;
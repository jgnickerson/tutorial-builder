import React from 'react';
import style from 'bootstrap/dist/css/bootstrap.css';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import NavbarHeader from 'react-bootstrap/lib/NavbarHeader';

import MenuItem from 'react-bootstrap/lib/MenuItem';

function onSelectAlert(eventKey) {
  alert(`Alert from menu item.\neventKey: ${eventKey}`);
}

function MenuBar(props) {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand onSelect={()=>{props.browse()}}>
            <a href="#">Tutorial Builder</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem onSelect={() => {props.browse()}} href="#">All Tutorials</NavItem>
            <NavItem>Build a new tutorial</NavItem>
            <NavDropdown eventKey={1} title="Account" id="basic-nav-dropdown">
              <MenuItem eventKey={1.1} onSelect={() => props.browse('used')}>Tutorials used</MenuItem>
              <MenuItem eventKey={1.2} onSelect={() => props.browse('owned')}>Tutorials owned</MenuItem>
              <MenuItem eventKey={1.3}>Change account info</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem onSelect={() => {props.logout()}} href="#">Log out</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
}

// MenuBar.propTypes = {
//
// }

export default MenuBar;

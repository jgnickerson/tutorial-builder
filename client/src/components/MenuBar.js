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
        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav>
            <NavItem onSelect={() => {props.browse()}} href="#">CodePanthr</NavItem>
            <NavItem onSelect={props.createNew}>Build a new tutorial</NavItem>
          </Nav>
          <Nav pullRight>
              <NavDropdown eventKey={1} title={props.name} id="basic-nav-dropdown">
                <MenuItem eventKey={1.1} onSelect={() => props.browse('used')}>Tutorials used</MenuItem>
                <MenuItem eventKey={1.2} onSelect={() => props.browse('owned')}>Tutorials owned</MenuItem>
                <MenuItem onSelect={props.changePassword} eventKey={1.3}>Change account info</MenuItem>
                <MenuItem onSelect={() => {props.logout()}} href="#">Log out</MenuItem>
              </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
}

MenuBar.propTypes = {
    name: React.PropTypes.string,
    changePassword: React.PropTypes.func,
    createNew: React.PropTypes.func,
    logout: React.PropTypes.func,
    browse: React.PropTypes.func
}

export default MenuBar;

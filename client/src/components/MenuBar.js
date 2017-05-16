import React from 'react';
import {Nav, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function MenuBar(props) {
  let navbar;
  if (props.name) {
    navbar = (<Navbar inverse fixedTop>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a onClick={() => props.browse('all')}>CodePanther</a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav>
                    <NavItem onSelect={()=>props.switchMode('createNew')}>Build a new tutorial</NavItem>
                  </Nav>
                  <Nav pullRight>
                      <NavDropdown eventKey={1} title={props.name} id="basic-nav-dropdown">
                        <MenuItem eventKey={1.1} onSelect={() => props.browse('used')}>Tutorials used</MenuItem>
                        <MenuItem eventKey={1.2} onSelect={() => props.browse('owned')}>Tutorials owned</MenuItem>
                        <MenuItem onSelect={()=>props.switchMode('changePassword')} eventKey={1.3}>Change Password</MenuItem>
                        <MenuItem divider />
                        <MenuItem onSelect={() => props.logout()}>Log out</MenuItem>
                      </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>)
  } else {
    navbar = (<Navbar inverse fixedTop>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a onClick={() => props.browse('all')}>CodePanther</a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav pullRight>
                    <NavItem onSelect={() => props.switchMode('login')}>Sign In</NavItem>
                    <NavItem onSelect={() => props.switchMode('signup')}>Register</NavItem>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>)
  }
    return navbar
}

MenuBar.propTypes = {
    name: React.PropTypes.string,
    changePassword: React.PropTypes.func,
    createNew: React.PropTypes.func,
    logout: React.PropTypes.func,
    browse: React.PropTypes.func
}

export default MenuBar;

import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import logosm from "../../img/logosm.png";
import { withRouter } from "react-router-dom";

class Navigation extends Component {
  state = {
    menu: [
      { name: "Frontpage", path: "/", active: false },
      { name: "Schedule", path: "/timeline/", active: false }
    ]
  };

  getLinks = () => {
    return this.state.menu.map((item, index) => {
      return (
        <Nav.Link
          href={item.path}
          key={"link" + index}
          className={item.active ? "active" : "inactive"}
        >
          {item.name}
        </Nav.Link>
      );
    });
  };

  componentDidMount = () => {
    const newmenu = this.state.menu;
    newmenu.forEach((element, index) => {
      if (element.path === this.props.location.pathname) {
        newmenu[index].active = true;
      } else {
        newmenu[index].active = false;
      }
    });
    this.setState({ menu: newmenu });
  };
  render() {
    return (
      <Navbar bg="navbarbg" variant="dark" expand="lg">
        <Navbar.Brand href="/">
          <img src={logosm} alt="logo" className="logosm" />
          <span className="logotext">TV-APP</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">{this.getLinks()}</Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(Navigation);

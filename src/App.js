import React, { Component, Fragment } from "react";
import "./sass/index.scss";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import SearchTitle from "./components/searchtitle/title";
import FrontPage from "./components/frontpage/frontpage";
import ShowDetail from "./components/showdetail/showdetail";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import NotFound from "./api/notfound";
import logosm from "./img/logosm.png";
import ShowEpisode from "./components/showdetail/showEpisode";
import Timeline from "./components/timeline/today";
import Navigation from "./components/nav/navigation";

class App extends Component {
  state = {
    url: "http://api.tvmaze.com/",
    selectedShow: null
  };
  _SetShow = value => {
    this.setState({ selectedShow: value });
  };

  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <div className="content">
            <header>
              <Container className="mb-2 pt-2">
                <Row className="_top">
                  <Col lg={3}>
                    <div className="demo">It's just a laptop demo</div>
                  </Col>
                  <Col lg={6}>
                    <SearchTitle
                      handleSelectShow={this._SetShow}
                      className="SearchTitle"
                    />
                  </Col>
                  <Col lg={3}>
                    <div className="demo2 d-none d-lg-block">
                      It's just a laptop demo
                    </div>
                  </Col>
                </Row>
              </Container>
              <Navigation />
              <Navbar bg="navbarbg" variant="dark" expand="lg">
                <Navbar.Brand href="/">
                  <img src={logosm} alt="logo" className="logosm" />
                  <span className="logotext">TV-APP</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link href="/timeline/">Timeline</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </header>
            <section>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <FrontPage {...props} handleSelectShow={this._SetShow} />
                  )}
                />
                <Route path="/showdetail/:id" component={ShowDetail} />
                <Route
                  exact
                  path="/showepisode/:id"
                  render={props => (
                    <ShowEpisode {...props} episode={this.state.selectedShow} />
                  )}
                />
                <Route path="/timeline/" component={Timeline} />
                <Route component={NotFound} />
              </Switch>
            </section>
          </div>
        </BrowserRouter>
        <footer>
          <div className="footer">
            <Container fluid>
              <Row>
                <Col>
                  <Row className="mb-3">
                    <Col lg={2}>
                      <img src={logosm} alt="logo" />
                    </Col>

                    <Col>
                      <span className="logotext">TV-APP</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div>It's just a laptop demo</div>
                    </Col>
                  </Row>
                </Col>
                <Col>2</Col>
                <Col>3</Col>
              </Row>
            </Container>
          </div>
        </footer>
      </Fragment>
    );
  }
}

export default App;

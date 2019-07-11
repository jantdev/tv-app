import React, { Component, Fragment } from "react";
import "./sass/index.scss";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import SearchTitle from "./components/searchtitle/title";
import FrontPage from "./components/frontpage/frontpage";
import ShowDetail from "./components/showdetail/showdetail";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import NotFound from "./api/notfound";
import logosm from "./img/logosm.png";
import ShowEpisode from "./components/showdetail/showEpisode";

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
          <header>
            <Container className="mb-2 pt-2">
              <Row className="_top">
                <Col lg={3}>
                  <div className="demo">It's just a laptop demo</div>
                </Col>
                <Col lg={6}>
                  <SearchTitle
                    handleSelectShow={this._SetShow}
                    endpoint={this.state.url}
                    className="SearchTitle"
                  />
                </Col>
                <Col lg={3}>
                  <div className="demo2">It's just a laptop demo</div>
                </Col>
              </Row>
            </Container>
            <Container fluid>
              <Row className="_navbar">
                <Col>
                  <Navbar expand="lg" className="_navbarbg">
                    <Navbar.Brand href="#">
                      <img src={logosm} alt="logo" className="logosm" />
                      <span className="logotext">TV-APP</span>
                    </Navbar.Brand>
                  </Navbar>
                </Col>
              </Row>
            </Container>
          </header>
          <section>
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <FrontPage
                    {...props}
                    endpoint={this.state.url}
                    handleSelectShow={this._SetShow}
                  />
                )}
              />
              <Route exact path="/showdetail/:id" component={ShowDetail} />
              <Route
                exact
                path="/showepisode"
                render={props => (
                  <ShowEpisode {...props} episode={this.state.selectedShow} />
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </section>
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default App;

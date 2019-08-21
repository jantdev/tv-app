import React, { Component, Fragment } from "react";
import "./sass/index.scss";
import { Container, Row, Col } from "react-bootstrap";
import SearchTitle from "./components/searchtitle/title";
import FrontPage from "./components/frontpage/frontpage";
import ShowDetail from "./components/showdetail/showdetail";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import NotFound from "./api/notfound";
import ShowEpisode from "./components/showdetail/showEpisode";
import Timeline from "./components/timeline/today";
import Navigation from "./components/nav/navigation";
import Footer from "./components/footer/footer";
import Network from "./components/network/network";

class App extends Component {
  state = {
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

                <Route
                  exact
                  path="/network/:id"
                  render={props => (
                    <Network {...props} network={this.state.selectedNetwork} />
                  )}
                />

                <Route component={NotFound} />
              </Switch>
            </section>
          </div>
        </BrowserRouter>
        <footer>
          <Footer />
        </footer>
      </Fragment>
    );
  }
}

export default App;

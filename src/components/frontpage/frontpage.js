import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Scheudule from "./Schedule";

class Frontpage extends Component {
  state = {
    networks: null
  };
  frontpageSelectShow = o => {
    this.props.handleSelectShow(o);
  };
  frontpageNetworks = o => {
    this.setState({ networks: o });
  };
  setupNetworks = () => {
    return <p>networks</p>;
  };
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (this.state.networks !== prevState.networks) {
      this.setupNetworks();
    }
  };
  componentDidMount = () => {
    console.log(this.props);
  };
  render() {
    return (
      <Container className="mt-2" fluid>
        <Row>
          <Col>
            <Scheudule
              endpoint={this.props.endpoint}
              handleSelectShow={this.frontpageSelectShow}
              handleNetworks={this.frontpageNetworks}
            />
          </Col>
        </Row>
        <Row>
          <Col>{this.setupNetworks()}</Col>
        </Row>
      </Container>
    );
  }
}

export default Frontpage;

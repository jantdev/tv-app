import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Api from "../../api/api";

class ShowDetail extends Component {
  state = {
    show: null
  };

  setupDetails = () => {
    Api.getShow(this.props.match.params.id).then(item => {
      return <h4>{item.name}</h4>;
    });
  };

  render() {
    return (
      <Container fluid>
        <Row className="mt-4">
          <Col>{this.setupDetails()}</Col>
        </Row>
      </Container>
    );
  }
}

export default ShowDetail;

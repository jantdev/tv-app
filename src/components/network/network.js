import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const Network = props => {
  if (props.network) {
    return (
      <Container className="networkmain mt-2" fluid>
        <Row>
          <Col>
            <h4>{props.network.name}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Country: {props.network.country.name}</p>
            <p>Timezone: {props.network.country.timezone}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>More info: None</p>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return null;
  }
};

export default Network;

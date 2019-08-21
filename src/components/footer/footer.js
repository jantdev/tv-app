import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import logosm from "../../img/logosm.png";
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
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
            <Col>
              <a href="/timeline/" className="link">
                Timeline
              </a>
            </Col>
            <Col>3</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Footer;

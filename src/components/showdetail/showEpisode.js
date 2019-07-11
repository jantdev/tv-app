import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ShowInfo from "./showinfo";
import placeholderImg from "../../img/noposter.png";

class ShowEpisode extends Component {
  state = { episode: this.props.episode, summery: "No summery(yet)" };

  setupEpisode = () => {
    if (this.state.episode) {
      const ep = this.state.episode;
      return (
        <Container>
          <Row>
            <Col>
              <h2>{ep.name}</h2>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <img
                src={ep.image ? ep.image.medium : placeholderImg}
                alt={ep.name}
              />
            </Col>
            <Col lg={8}>{ep.summery ? ep.summery : this.state.summery}</Col>
          </Row>
        </Container>
      );
    }
  };
  render() {
    return (
      <Container fluid>
        <Row>
          <Col lg={8}>{this.setupEpisode()}</Col>
          <Col lg={4}>
            <ShowInfo showobj={this.state.episode} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ShowEpisode;

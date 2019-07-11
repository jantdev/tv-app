import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ShowNav from "./shownav";

class ShowDetail extends Component {
  state = {
    show: null,
    load: false
  };
  setupDetails = () => {
    if (this.state.load) {
      // console.log(this.state);
      const show = this.state.show;
      return <h4>{show.name}</h4>;
    }
  };
  componentDidMount = () => {
    fetch("http://api.tvmaze.com/shows/" + this.props.match.params.id)
      .then(response => response.json())
      .then(results => {
        // console.log(results);
        this.setState({
          load: true,
          show: results
        });
      })

      .catch(error => this.setState({ load: false }));
  };
  render() {
    return (
      <Container fluid>
        <Row>
          <Col>{this.setupDetails()}</Col>
        </Row>
        <Row>
          <Col>
            <ShowNav show={this.state.show} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ShowDetail;

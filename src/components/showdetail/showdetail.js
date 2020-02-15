import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Api from "../../api/api";
import placeholderImg from "../../img/noposter.png";
import ShowDetailInfo from "./showDetailInfo";
import ShowNav from "./shownav";
class ShowDetail extends Component {
  state = {
    show: null,
    cast: null,
    crew:null,
    allepisodes: null
  };

  setupDetails = () => {
    if (this.state.show) {
      const show = this.state.show;
      document.title = show.name;
      return (
        <Container fluid>
          <Row>
            <Col>
              <h2>{show.name}</h2>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col lg={4} md={12} sm={12} className="mb-4">
              <img
                src={show.image ? show.image.medium : placeholderImg}
                alt={show.name}
              />
            </Col>
            <Col
              lg={8}
              md={12}
              sm={12}
              dangerouslySetInnerHTML={{
                __html: show.summary ? show.summary : this.state.show.summary
              }}
            />
          </Row>
        </Container>
      );
    }
  };
  setupInfo = () => {
    if (this.state.show) {
      //  console.log(this.state.show);
      return [this.state.show];
    }
  };

  loadDate = () => {
    Api.getShow(this.props.match.params.id)
      .then(i => {
        this.setState({ show: i });
      })
      .then(() => {
        Api.getCast(this.props.match.params.id).then(cast => {
          this.setState({ cast: cast });
        });
      })
      .then(() => {
        Api.getCrew(this.props.match.params.id).then(crew => {
          this.setState({ crew: crew });
        });
      })
      .then(() => {
        Api.getEpisodes(this.props.match.params.id)
          .then(e => {
            this.setState({ allepisodes: e });
          })
          .then(() => {
            this.setupDetails();
          });
      });
  };
  componentDidUpdate = (preProps, preState, snapshot) => {
    if (preProps.match.params.id !== this.props.match.params.id) {
      this.loadDate();
    }
  };
  componentDidMount = () => {
    this.loadDate();
  };

  render() {
    return (
      <Container fluid>
        <Row className="mt-4">
          <Col lg={8} md={8} sm={12}>
            {this.setupDetails()}
          </Col>
          <Col lg={4} md={4} sm={12} className="mt-5">
            <ShowDetailInfo showobj={this.setupInfo()} />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <ShowNav
              show={this.state.show}
              cast={this.state.cast}
              
              allepisodes={this.state.allepisodes}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ShowDetail;

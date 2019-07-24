import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ShowInfo from "./showinfo";
import placeholderImg from "../../img/noposter.png";
import ShowNav from "./shownav";
import Api from "../../api/api";

class ShowEpisode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: null,
      episode: null,
      allepisodes: null,
      cast: null,
      summery: "<p>No summery(yet)</p>"
    };
  }

  componentDidMount = () => {
    const show = this.props.match.params.id.split("+");
    Api.getShow(show[0])
      .then(o => {
        this.setState({
          show: o
        });
        return o.id;
      })
      .then(id => {
        Api.getEpisodes(id).then(episodes => {
          this.setState({
            allepisodes: episodes
          });
          const episode = episodes.filter(item => {
            return item.id === Number(show[1]);
          });
          this.setState({
            episode: episode
          });
        });
      })
      .then(() => {
        Api.getCast(show[0]).then(cast => {
          this.setState({
            cast: cast
          });
        });
      });
  };
  setupEpisode = () => {
    if (this.state.episode) {
      console.log(this.state);
      const ep = this.state.episode[0];
      return (
        <Container>
          <Row>
            <Col>
              <h2>{ep.name}</h2>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col lg={3} md={4} sm={12} className="episodeimage">
              <img
                src={ep.image ? ep.image.medium : placeholderImg}
                alt={ep.name}
              />
            </Col>
            <Col
              lg={9}
              md={8}
              sm={12}
              dangerouslySetInnerHTML={{
                __html: ep.summary ? ep.summary : this.state.summary
              }}
            />
          </Row>
        </Container>
      );
    }
  };
  render() {
    return (
      <Container fluid>
        <Row className="mt-4">
          <Col lg={8} md={8} sm={12}>
            {this.setupEpisode()}
          </Col>
          <Col lg={4} md={4} sm={12} className="mt-5">
            <ShowInfo showobj={this.state.episode} />
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

export default ShowEpisode;

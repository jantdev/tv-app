import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Scheudule from "./Schedule";
import Api from "../../api/api";

class Frontpage extends Component {
  state = {
    load: false,
    shows: null
  };
  frontpageSelectShow = o => {
    this.props.handleSelectShow(o);
  };

  setPopShow = () => {
    return this.state.shows;
  };
  setCrimeShow = () => {
    if (this.state.load) {
      const t = this.state.shows;
      const r = [];
      t.filter(o => {
        o.show.genres.filter(f => {
          if (f === "Crime") {
            r.push(o);
          }
          return null;
        });
        return null;
      });

      return r;
    }
  };
  setDramaShow = () => {
    if (this.state.load) {
      const t = this.state.shows;
      const r = [];
      t.filter(o => {
        o.show.genres.filter(f => {
          if (f === "Drama") {
            r.push(o);
          }
          return null;
        });
        return null;
      });

      return r;
    }
  };

  setActionShow = () => {
    if (this.state.load) {
      const t = this.state.shows;
      const r = [];
      t.filter(o => {
        o.show.genres.filter(f => {
          if (f === "Action") {
            r.push(o);
          }
          return null;
        });
        return null;
      });

      return r;
    }
  };

  componentDidMount = () => {
    Api.ToDaysShow().then(o => {
      this.setState({
        load: true,
        shows: o
      });
    });
  };

  render() {
    return (
      <Container className="mt-2 frontpage" fluid>
        <Row>
          <Col>
            <h2>Popular shows airing today</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Scheudule
              shows={this.setPopShow()}
              handleSelectShow={this.frontpageSelectShow}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Todays Drama</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Scheudule
              shows={this.setDramaShow()}
              handleSelectShow={this.frontpageSelectShow}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Todays Action</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Scheudule
              shows={this.setActionShow()}
              handleSelectShow={this.frontpageSelectShow}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Frontpage;

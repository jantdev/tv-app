import React, { Component } from "react";
import Filter from "../../filter/index";
import placeholderImg from "../../img/noposter.png";
import { Container, Row, Col, Button } from "react-bootstrap";
class Cast extends Component {
  constructor(props) {
    super(props);
    this.state = { showhide: false, currentPerson: null };
  }
  setupCast = () => {
    if (this.props.cast) {
      let cast = this.props.cast;
      return cast.map(item => {
        return (
          <div
            className="person"
            key={Filter.setUId(item.person.id)}
            onClick={() => {
              if (item.person.image) {
                this.setState({ currentPerson: item });
                this.showPerson();
              }
            }}
          >
            <img
              src={
                item.person.image ? item.person.image.medium : placeholderImg
              }
              alt={item.person.name}
            />
            <p>
              {item.person.name}
              <br /> as {item.character.name}
            </p>
          </div>
        );
      });
    }
  };
  showPerson = () => {
    if (this.state.currentPerson) {
      let p = this.state.currentPerson;
      console.log(p);
      return (
        <div
          className="personholder"
          onClick={() => {
            this.closePerson();
          }}
        >
          <Container className="personinner">
            <Row>
              <Col>
                <img
                  src={p.person.image ? p.person.image.original : ""}
                  alt={p.person.name}
                />
              </Col>

              <Col>
                <Row>
                  <Col>
                    <h4>{p.person.name}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-4">
                    Born: {p.person.birthday}
                    <br />
                    Country: {p.person.country.name}
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-4">
                    <Button
                      variant="info"
                      onClick={() => {
                        this.closePerson();
                      }}
                    >
                      Close
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  };
  closePerson = () => {
    this.setState({ currentPerson: null });
  };

  render() {
    return (
      <div style={this.props.style}>
        <div className="personShow">{this.showPerson()}</div>
        <div className="cast">{this.setupCast()}</div>
      </div>
    );
  }
}

export default Cast;

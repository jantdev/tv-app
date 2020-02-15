import React, { Component } from "react";
import Filter from "../../filter/index";
import placeholderImg from "../../img/noposter.png";
import { Container, Row, Col, Button } from "react-bootstrap";
import Api from "../../api/api";

class Crew extends Component {
  constructor(props) {
    super(props);
    this.state = { crew:null,showhide: false, currentPerson: null };
  }
  setupCrew= () => {
   
    if (this.props.crew && this.props.crew.length>0) {
      let crew = this.props.crew;
      return crew.map(item => {
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
    }else{
      return (<div>No information</div>)
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
componentDidMount = () =>{

 
/*
   Api.getCrew(this.props.show.id).then(crew => {
          this.setState({
            crew: crew
          });
        });
*/
      }
  render() {
    return (
      <div style={this.props.style}>
        <div className="personShow">{this.showPerson()}</div>
        <div className="crew">{this.setupCrew()}</div>
      </div>
    );
  }
}

export default Crew;

import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Scheudule from "./Schedule";
import Api from "../../api/api";
import Category from "../searchtitle/category";
import Program from "./program";

class Frontpage extends Component {
  state = {
    load: false,
    shows: null,
    showsByCategory: null,
    displayShowsByCategory: "none",
    test:[-1, -2, -3, 4, 5, 6]    

  };
  frontpageSelectShow = o => {
    this.props.handleSelectShow(o);
  };

  frontpageShowByCategory = c => {
    this.setState({ showsByCategory: c, displayShowsByCategory: "block" });
  };

  frontpageSelectNetwork = network => {
    this.props.handleSelectedNetwork(network);
    this.props.history.push("/network/" + network.id);
  };
  setPopShow = () => {
    return this.state.shows;
  };
  setCatShow = () => {
    return this.state.showsByCategory;
  };

  setCurrenDate = () => {
    const d = new Date();

    let utc = d.getTime() + d.getTimezoneOffset() * 60000;
    let nd = new Date(utc + 3600000 * -7);

    return nd.toDateString().replace(" " + d.getFullYear(), "");
  };

  testno = (a)=>{
    const f = a.sort().filter(no => no>0)
    const s = [...new Set(f)]
   
    if(s.length===0){
      return 1
  }
    let lowno = Math.min(...s);
    for(let x = 0;x<s.length;x++){
      lowno++
      if(lowno >s[x] && lowno <s[x+1]){
        return lowno 
      }else if(s.length===x+1){
        return lowno
      }
    }
  }
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
          <Col lg={8}>
            <Row>
              <Col>
                <h2>Popular shows airing today</h2>
                <h3>{this.testno(this.state.test)}</h3>
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

            <Row className="mt-4 ">
              <Col>
                <h2>Select shows by Category</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <Category
                  shows={this.setPopShow()}
                  handleShowByCategory={this.frontpageShowByCategory}
                />
              </Col>
            </Row>
            <Row style={{ display: this.state.displayShowsByCategory }}>
              <Col>
                <Scheudule
                  shows={this.setCatShow()}
                  handleSelectShow={this.frontpageSelectShow}
                />
              </Col>
            </Row>
          </Col>
          <Col lg={4}>
            <Row>
              <Col>
                <h2>Schedule for {this.setCurrenDate()}</h2>
              </Col>
            </Row>
            <Program
              className="program"
              shows={this.setPopShow()}
              handleSelectNetwork={this.frontpageSelectNetwork}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Frontpage;

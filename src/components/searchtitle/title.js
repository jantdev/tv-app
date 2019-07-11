import { InputGroup, FormControl, ListGroup } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";

class SearchTitle extends Component {
  state = { result: [] };

  SearchTitleQuery = e => {
    if (e.target.value.length > 2) {
      fetch(this.props.endpoint + "/search/shows?q=:" + e.target.value)
        .then(response => response.json())
        .then(results => {
          this.setState({
            result: results
          });
        });
    } else {
      this.setState({
        result: []
      });
    }
  };
  handleSelectShow = e => {
    this.props.history.push("/showdetail/" + e.id);
    /*
    console.log(e);
    this.props.handleSelectShow(e);
    */
    this.refs.searchValue.value = "";
    this.setState({
      result: []
    });
  };
  ShowSearchResults = () => {
    if (this.state.result.length > 0) {
      return (
        <ListGroup className="SearchTitleOptions">
          {this.state.result.map((item, index) => (
            <ListGroup.Item
              action
              variant="light"
              key={index}
              onClick={() => {
                this.handleSelectShow(item.show);
              }}
            >
              {item.show.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      );
    }
  };

  render() {
    return (
      <div>
        <InputGroup>
          <FormControl
            placeholder="Search for title"
            aria-label="Search for title"
            aria-describedby="basic-addon2"
            onChange={this.SearchTitleQuery}
            size="lg"
            ref="searchValue"
          />
        </InputGroup>
        <div className="holder">{this.ShowSearchResults()}</div>
      </div>
    );
  }
}

export default withRouter(SearchTitle);

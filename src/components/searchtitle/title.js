import { InputGroup, FormControl, ListGroup } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import Api from "../../api/api";

class SearchTitle extends Component {
  state = { result: [] };

  SearchTitleQuery = e => {
    if (e.target.value.length > 2) {
      Api.searchTitle(e.target.value).then(results => {
        this.setState({
          result: results
        });
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
              {item.show.name}{" "}
              {item.show.premiered ? item.show.premiered.substring(0, 4) : ""}
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
        <div>{this.ShowSearchResults()}</div>
      </div>
    );
  }
}

export default withRouter(SearchTitle);

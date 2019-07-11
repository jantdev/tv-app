import React, { Component } from "react";
import TestData from "./testdata.json";

class SearchTitle extends Component {
  state = {
    testdata: TestData
  };

  componentDidMount() {
    const x = this.state.testdata.testdata;

    const y = x.sort(function(a, b) {
      console.log(b.show.name.substring(0, 1));
      return a.show.name - b.show.name;
    });

    console.log(y);
  }

  render() {
    return <div>test</div>;
  }
}

export default SearchTitle;
